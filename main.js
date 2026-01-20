/* ==========================================================================
   BAĞLANTILAR VE KURULUM
   ========================================================================== */
import { champions, traits as TRAIT_THRESHOLDS } from './data.js';
import { allItemsMap, renderCategory, initItems } from './items.js';
import { 
    generateTraitTooltipHTML, 
    generateChampionTooltipHTML, 
    generateItemTooltipHTML, 
    safeLowercase,
    applySmartPosition,
    initItemTooltips // tooltips.js'e taşıdığımızı varsayıyoruz
} from './tooltips.js';

document.addEventListener("DOMContentLoaded", () => {
    /* --- STATE & ELEMENTS --- */
    const selectedComp = []; 
    const traitListEl = document.getElementById("trait-list");
    const compListEl = document.getElementById("active-team-grid");
    const championListEl = document.getElementById("champions-grid");
    const searchInput = document.getElementById("champ-search");
    const resetBtn = document.getElementById("reset-team");
    const teamCountEl = document.getElementById("team-count");
    const globalTooltip = document.getElementById("global-trait-tooltip");

    // Tooltip verilerini saklamak için geçici bir depo (Global dinleyici için)
    let currentTraitsData = new Map();

    initItems(); 

    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);

/* ==========================================================================
   [SOL PANEL] - ÖZELLİKLER (TRAITS) SİSTEMİ
   ========================================================================== */
    function findTraitInfo(key) {
        const safeKey = safeLowercase(key);
        if (TRAIT_THRESHOLDS.specialTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: 'special' };
        if (TRAIT_THRESHOLDS.originTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: 'origin' };
        if (TRAIT_THRESHOLDS.classTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: 'class' };
        return null;
    }

    function renderTraits() {
        traitListEl.innerHTML = "";
        currentTraitsData.clear(); // Eski verileri temizle

        const traitCounts = selectedComp.reduce((acc, champ) => {
            champ.traits.forEach(t => {
                const cleanName = safeLowercase(t);
                acc[cleanName] = (acc[cleanName] || 0) + 1;
            });
            return acc;
        }, {});

        const processedTraits = Object.entries(traitCounts).map(([key, count]) => {
            const info = findTraitInfo(key);
            if (!info) return null; 

            const { data: traitData, type: traitType } = info;
            let stepsArray = traitData.thresholds || (Array.isArray(traitData) ? traitData : [traitData]);
            stepsArray = stepsArray.map(s => typeof s === 'number' ? { count: s } : s);

            const activeTier = [...stepsArray].reverse().find(s => count >= s.count);
            const reachedTierCount = stepsArray.filter(s => count >= s.count).length;
            const isActive = !!activeTier;
            const isPrismatic = activeTier?.rank === "tier-prismatic";

            // PUANLAMA VE SIRALAMA MANTIĞI
            let weight = isActive ? 50 : 0;
            if (isActive) {
                if (isPrismatic) weight = 95;
                else if (key === "targon") weight = 90;
                else if (traitType === 'special') weight = 80;
                else if (traitType === 'origin') weight = 70;
                else weight = 60;
                weight += (reachedTierCount * 2); 
            } else {
                if (key === "targon") weight = 25;
                else if (traitType === 'origin') weight = 15;
                else weight = 10;
                weight += (count / stepsArray[0].count);
            }

            const finalData = { traitName: traitData.name, count, traitData, activeTier, isActive, isPrismatic, reachedTierCount, weight, steps: stepsArray, type: traitType };
            
            // Global dinleyici için datayı sakla
            currentTraitsData.set(safeLowercase(traitData.name), finalData);
            
            return finalData;
        }).filter(Boolean);
        
        processedTraits
            .sort((a, b) => b.weight - a.weight || a.traitName.localeCompare(b.traitName))
            .forEach(data => traitListEl.appendChild(createTraitSimpleElement(data)));
    }

    function createTraitSimpleElement(data) {
        const li = document.createElement("li");
        const { traitName, count, activeTier, isActive, steps, reachedTierCount, type } = data;
        const tierClass = isActive ? (data.isPrismatic ? "tier-prismatic" : (activeTier.rank || `tier-${reachedTierCount}`)) : "inactive";
        
        li.className = `trait-item ${isActive ? 'active' : ''} ${tierClass} trait-type-${type}`;
        li.setAttribute("data-trait-key", safeLowercase(traitName)); // Dinleyici için anahtar

        const safeIcon = safeLowercase(traitName).replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m])).replace(/[^a-z0-9]/g, '');

        li.innerHTML = `
            <div class="trait-hex-container">
                <div class="trait-hex"><img src="img/traits/${safeIcon}.png" class="t-icon" onerror="this.src='img/traits/default.png'"></div>
                <div class="trait-count-badge">${count}</div>
            </div>
            <div class="trait-info-wrapper">
                <div class="t-name" style="color: ${isActive ? '#fff' : '#888'}">${traitName}</div>
                <div class="t-steps-row">
                    ${isActive ? steps.map(s => {
                        const v = s.count || s;
                        return `<span class="t-step ${activeTier && v === activeTier.count ? 'is-current' : (count >= v ? 'is-reached' : 'is-off')}">${v}</span>`;
                    }).join('<span class="t-sep">></span>') : `<span class="t-step is-off">${count} / ${steps[0].count || steps[0]}</span>`}
                </div>
            </div>`;
        return li;
    }

/* ==========================================================================
   [ORTA PANEL] - TAKIM KURMA (TEAM GRID)
   ========================================================================== */
    function toggleChampion(champ) {
        const idx = selectedComp.findIndex(c => c.name === champ.name);
        if (idx >= 0) selectedComp.splice(idx, 1);
        else if (selectedComp.length < 10) selectedComp.push(champ);
        updateUI();
    }

    function updateUI() {
        compListEl.replaceChildren(...selectedComp.map(c => createChampElement(c, true)));
        if (teamCountEl) teamCountEl.textContent = selectedComp.length;
        document.querySelectorAll(".champ-item").forEach(el => {
            el.classList.toggle("selected", selectedComp.some(c => c.name === el.getAttribute("data-name")));
        });
        renderTraits();
    }

/* ==========================================================================
   [SAĞ PANEL] - ŞAMPİYON HAVUZU VE EŞYALAR
   ========================================================================== */
    function createChampElement(champ, isInComp = false) {
        const div = document.createElement("div");
        div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;
        div.setAttribute("data-name", champ.name);
        div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));

        const img = document.createElement("img");
        img.src = champ.img;
        div.appendChild(img);

        div.addEventListener("click", () => { 
            champTooltip.style.display = "none"; 
            toggleChampion(champ); 
        });
        return div;
    }

/* ==========================================================================
   MERKEZİ TOOLTIP YÖNETİMİ (GLOBAL DELEGATION)
   - Tüm panellerin tooltip mantığı burada toplanmıştır.
   ========================================================================== */
    function initGlobalTooltips() {
        document.addEventListener("mouseover", (e) => {
            // 1. ŞAMPİYONLAR (Havuz veya Takım)
            const champEl = e.target.closest(".champ-item, .comp-champ");
            if (champEl) {
                const name = champEl.getAttribute("data-name");
                const champ = champions.find(c => c.name === name);
                if (champ) {
                    globalTooltip.style.display = "none"; 
                    champTooltip.innerHTML = generateChampionTooltipHTML(champ);
                    champTooltip.className = `champ-tooltip cost-${champ.cost}`;
                    const context = champEl.classList.contains("comp-champ") ? "team" : "champion";
                    applySmartPosition(champTooltip, champEl.getBoundingClientRect(), context);
                }
                return;
            }

            // 2. ÖZELLİKLER (Sol Panel)
            const traitEl = e.target.closest(".trait-item");
            if (traitEl) {
                const key = traitEl.getAttribute("data-trait-key");
                const data = currentTraitsData.get(key);
                if (data) {
                    champTooltip.style.display = "none";
                    globalTooltip.innerHTML = generateTraitTooltipHTML(data);
                    applySmartPosition(globalTooltip, traitEl.getBoundingClientRect(), "trait");
                }
                return;
            }

            // 3. EŞYALAR (Items)
            const itemCard = e.target.closest(".item-card");
            if (itemCard) {
                const itemId = itemCard.getAttribute("data-id");
                const item = allItemsMap.get(itemId);
                if (item) {
                    champTooltip.style.display = "none";
                    globalTooltip.innerHTML = generateItemTooltipHTML(item);
                    globalTooltip.style.display = "block";
                    applySmartPosition(globalTooltip, itemCard.getBoundingClientRect(), "item");
                }
            }
        });

        // Kapatma Mantığı
        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(".champ-item, .comp-champ")) champTooltip.style.display = "none";
            if (e.target.closest(".trait-item, .item-card")) globalTooltip.style.display = "none";
        });
    }

/* ==========================================================================
   GLOBAL KONTROLLER VE BAŞLATMA
   ========================================================================== */
    searchInput.addEventListener("input", e => {
        const term = safeLowercase(e.target.value);
        document.querySelectorAll(".champ-item").forEach(el => {
            const name = safeLowercase(el.getAttribute("data-name") || "");
            const traits = safeLowercase(el.getAttribute("data-traits") || "");
            const match = term === "" || name.includes(term) || traits.includes(term);
            el.classList.toggle("not-matching", !match);
        });
        const activeCat = document.querySelector('.item-tab-btn.active')?.getAttribute('data-cat') || 'normal';
        renderCategory(activeCat, term);
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            selectedComp.length = 0; 
            searchInput.value = ""; 
            updateUI(); 
            document.querySelectorAll(".champ-item, .item-card").forEach(el => { 
                el.classList.remove("not-matching");
            });
        });
    }

    const renderChampionPool = () => {
        championListEl.innerHTML = "";
        [...champions]
            .sort((a, b) => a.cost - b.cost)
            .forEach(c => championListEl.appendChild(createChampElement(c)));
    };

    // Tüm sistemi başlat
    initGlobalTooltips();
    renderChampionPool();
});