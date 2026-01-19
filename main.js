/* ==========================================================================
İÇE AKTARILAN BAĞLANTILAR
========================================================================== */
import { champions, traits as TRAIT_THRESHOLDS } from './data.js';
import { itemCategories } from './itemdata.js'; // Eşya verisi için gerekli
import { generateTraitTooltipHTML, generateChampionTooltipHTML, generateItemTooltipHTML, safeLowercase } from './tooltips.js';
import { initItems } from './items.js'; 

document.addEventListener("DOMContentLoaded", () => {
/* ==========================================================================
    YARDIMCI FONKSİYONLAR
========================================================================== */
    const selectedComp = []; 
    const traitListEl = document.getElementById("trait-list");
    const compListEl = document.getElementById("active-team-grid");
    const championListEl = document.getElementById("champions-grid");
    const searchInput = document.getElementById("champ-search");
    const resetBtn = document.getElementById("reset-team");
    const teamCountEl = document.getElementById("team-count");
    const globalTooltip = document.getElementById("global-trait-tooltip");
/* ==========================================================================
   EŞYA SİSTEMİ BAŞLATMA
========================================================================== */
    initItems(); // Eşya sistemini çalıştır (Eşyalar ekrana basılır)
    setupItemTooltips(); // Eşya tooltip bağlantılarını kurar
/* ==========================================================================
    GENEL TOOLTIP KUTUSU
========================================================================== */
    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);
/* ==========================================================================
    ÖZELLİK BİLGİSİ BULMA FONKSİYONU
========================================================================== */
    function findTraitInfo(key) {
        const safeKey = safeLowercase(key);
        if (TRAIT_THRESHOLDS.specialTraits && TRAIT_THRESHOLDS.specialTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: 'special' };
        }
        if (TRAIT_THRESHOLDS.originTraits && TRAIT_THRESHOLDS.originTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: 'origin' };
        }
        if (TRAIT_THRESHOLDS.classTraits && TRAIT_THRESHOLDS.classTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: 'class' };
        }
        return null;
    }
/* ==========================================================================
    EŞYA TOOLTIP AYARLARI
========================================================================== */
    function setupItemTooltips() {
    document.addEventListener("mouseover", (e) => {
        const card = e.target.closest(".item-card");
        if (!card) return;

        const itemId = card.getAttribute("data-id");
        let foundItem = null;

        for (const catKey in itemCategories) {
            const item = itemCategories[catKey].items.find(i => i.id === itemId);
            if (item) { foundItem = item; break; }
        }

        if (foundItem) {
            champTooltip.style.display = "none"; // Şampiyon tooltip'ini kapat
            globalTooltip.innerHTML = generateItemTooltipHTML(foundItem);
            globalTooltip.style.display = "block";
        }
    });
/* ==========================================================================
    TOOLTIP KONUMLANDIRMA
========================================================================== */
    document.addEventListener("mousemove", (e) => {
        if (globalTooltip.style.display === "block") {
            const tooltipWidth = globalTooltip.offsetWidth;
            const tooltipHeight = globalTooltip.offsetHeight;
            const padding = 20;

            // X Ekseni Kontrolü (Sağa sığmazsa sola at)
            let left = e.pageX + padding;
            if (left + tooltipWidth > window.innerWidth) {
                left = e.pageX - tooltipWidth - padding;
            }

            // Y Ekseni Kontrolü (Alta sığmazsa yukarı at)
            let top = e.pageY + padding;
            if (top + tooltipHeight > window.innerHeight + window.scrollY) {
                top = e.pageY - tooltipHeight - padding;
            }

            globalTooltip.style.left = `${left}px`;
            globalTooltip.style.top = `${top}px`;
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".item-card")) {
            globalTooltip.style.display = "none";
        }
    });
}
/* ==========================================================================
    ÖZELLİK RENDER VE YÖNETİMİ
========================================================================== */
    function renderTraits() {
        traitListEl.innerHTML = "";
        
        const traitCounts = selectedComp.reduce((acc, champ) => {
            champ.traits.forEach(t => {
                const cleanName = safeLowercase(t);
                acc[cleanName] = (acc[cleanName] || 0) + 1;
            });
            return acc;
        }, {});
/* ==========================================================================
        ÖZELLİK VERİSİ İŞLEME
========================================================================== */
        const processedTraits = Object.entries(traitCounts).map(([key, count]) => {
            const info = findTraitInfo(key);
            if (!info) return null; 

            const { data: traitData, type: traitType } = info;
            const traitName = traitData.name;
            const lowerKey = key;
/* ==========================================================================
            ÖZELLİK TIER ANALİZİ
========================================================================== */
            let stepsArray = traitData.thresholds && Array.isArray(traitData.thresholds)
                ? traitData.thresholds
                : (Array.isArray(traitData) ? traitData : [traitData]);

            stepsArray = stepsArray.map(s => typeof s === 'number' ? { count: s } : s);

            const activeTier = [...stepsArray].reverse().find(s => count >= s.count);
            const reachedTierCount = stepsArray.filter(s => count >= s.count).length;
            const isActive = !!activeTier;
            const isPrismatic = activeTier && activeTier.rank === "tier-prismatic";
/* ==========================================================================
            PUANLAMA SİSTEMİ
========================================================================== */
            let weight = isActive ? 50 : 0;
            if (isActive) {
                if (isPrismatic) weight = 95;
                else if (lowerKey === "targon") weight = 90;
                else if (traitType === 'special') weight = 80;
                else if (traitType === 'origin') weight = 70;
                else weight = 60;
                weight += (reachedTierCount * 2); 
            } else {
                if (lowerKey === "targon") weight = 25;
                else if (traitType === 'origin') weight = 15;
                else weight = 10;
                weight += (count / stepsArray[0].count);
            }

            return { traitName, count, traitData, activeTier, isActive, isPrismatic, reachedTierCount, weight, steps: stepsArray, type: traitType };
        }).filter(Boolean);
        
        processedTraits
            .sort((a, b) => {
                if (b.weight !== a.weight) return b.weight - a.weight;
                return a.traitName.localeCompare(b.traitName);
            })
            .forEach(data => traitListEl.appendChild(createTraitSimpleElement(data)));
    }

/* ==========================================================================
    ÖZELLİK LİSTESİ ELEMAN OLUŞTURUCU
========================================================================== */
    function createTraitSimpleElement(data) {
        const { traitName, count, activeTier, isActive, steps, reachedTierCount, type } = data;
        const li = document.createElement("li");

        let tierClass = "inactive";
        if (isActive) {
            if (data.isPrismatic) tierClass = "tier-prismatic";
            else if (activeTier.rank) tierClass = activeTier.rank;
            else tierClass = `tier-${reachedTierCount}`;
        }
        
        li.className = `trait-item ${isActive ? 'active' : ''} ${tierClass} trait-type-${type}`;
        const tooltipHTML = generateTraitTooltipHTML(data);
        
        let thresholdsHTML = isActive 
            ? steps.map(s => {
                const stepVal = s.count || s;
                const isCurrent = activeTier && stepVal === activeTier.count;
                return `<span class="t-step ${isCurrent ? 'is-current' : (count >= stepVal ? 'is-reached' : 'is-off')}">${stepVal}</span>`;
              }).join('<span class="t-sep">></span>')
            : `<span class="t-step is-off">${count} / ${steps[0].count || steps[0]}</span>`;

        const safeIconName = safeLowercase(traitName)
            .replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m]))
            .replace(/[^a-z0-9]/g, '');

        li.innerHTML = `
            <div class="trait-hex-container">
                <div class="trait-hex">
                    <img src="img/traits/${safeIconName}.png" class="t-icon" onerror="this.src='img/traits/default.png'">
                </div>
                <div class="trait-count-badge">${count}</div>
            </div>
            <div class="trait-info-wrapper">
                <div class="t-name" style="color: ${isActive ? '#fff' : '#888'}">${traitName}</div>
                <div class="t-steps-row">${thresholdsHTML}</div>
            </div>
        `;
/* ==========================================================================
        ÖZELLİK TOOLTIP ETKİLEŞİMİ
========================================================================== */
        li.addEventListener("mouseenter", () => {
            globalTooltip.innerHTML = tooltipHTML;
            globalTooltip.style.display = "block";
            const rect = li.getBoundingClientRect();
            let targetTop = rect.top + (rect.height / 2) - (globalTooltip.offsetHeight / 2);
            if (targetTop < 10) targetTop = 10;
            globalTooltip.style.top = `${targetTop}px`;
            globalTooltip.style.left = `${rect.right + 10}px`;
        });

        li.addEventListener("mouseleave", () => globalTooltip.style.display = "none");
        return li;
    }

/* ==========================================================================
    ŞAMPİYON HAVUZU OLUŞTURUCU
========================================================================== */
    function createChampElement(champ, isInComp = false) {
        const div = document.createElement("div");
        div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;
        div.setAttribute("data-name", champ.name);
        div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));

        const img = document.createElement("img");
        img.src = champ.img;
        img.alt = champ.name;
        div.appendChild(img);
/* ==========================================================================
        ŞAMPİYON TOOLTIP ETKİLEŞİMİ
========================================================================== */
        div.addEventListener("mouseenter", () => {
            champTooltip.innerHTML = generateChampionTooltipHTML(champ);
            champTooltip.className = `champ-tooltip cost-${champ.cost}`;
            champTooltip.style.display = "block";

            const rect = div.getBoundingClientRect();
            const tWidth = champTooltip.offsetWidth || 220;
            const tHeight = champTooltip.offsetHeight;
            
            let left = rect.left > window.innerWidth / 2 ? rect.left - tWidth - 12 : rect.right + 12;
            let top = rect.top + (rect.height / 2) - (tHeight / 2);
            
            if (top < 10) top = 10;
            if (top + tHeight > window.innerHeight - 10) top = window.innerHeight - tHeight - 10;

            champTooltip.style.left = `${left}px`;
            champTooltip.style.top = `${top}px`;
        });

        div.addEventListener("mouseleave", () => champTooltip.style.display = "none");
        div.addEventListener("click", () => {
            champTooltip.style.display = "none";
            toggleChampion(champ);
        });

        return div;
    }
/* ==========================================================================
    ŞAMPİYON EKLEME ÇIKARMA FONKSİYONU
========================================================================== */
    function toggleChampion(champ) {
        const index = selectedComp.findIndex(c => c.name === champ.name);
        if (index >= 0) selectedComp.splice(index, 1);
        else if (selectedComp.length < 10) selectedComp.push(champ);
        updateUI();
    }
/* ==========================================================================
    ARAYÜZ GÜNCELLEME FONKSİYONU
========================================================================== */
    function updateUI() {
        compListEl.innerHTML = "";
        selectedComp.forEach(champ => compListEl.appendChild(createChampElement(champ, true)));
        if (teamCountEl) teamCountEl.textContent = selectedComp.length;

        document.querySelectorAll(".champ-item").forEach(el => {
            const name = el.getAttribute("data-name");
            el.classList.toggle("selected", selectedComp.some(c => c.name === name));
        });

        renderTraits();
    }
/* ==========================================================================
    ARAMA FONKSİYONU
========================================================================== */
    searchInput.addEventListener("input", e => {
        const searchTerm = safeLowercase(e.target.value);

        // 1. Şampiyonları Filtrele
        document.querySelectorAll(".champ-item").forEach(el => {
            const name = safeLowercase(el.getAttribute("data-name") || "");
            const traits = safeLowercase(el.getAttribute("data-traits") || "");
            const match = searchTerm === "" || name.includes(searchTerm) || traits.includes(searchTerm);
            el.style.opacity = match ? "1" : "0.2";
            el.style.pointerEvents = match ? "auto" : "none";
        });

        // 2. Eşyaları Filtrele
        document.querySelectorAll(".item-card").forEach(el => {
            const name = safeLowercase(el.getAttribute("title") || "");
            const id = safeLowercase(el.getAttribute("data-id") || "");
            const match = searchTerm === "" || name.includes(searchTerm) || id.includes(searchTerm);
            el.style.opacity = match ? "1" : "0.2";
            el.style.pointerEvents = match ? "auto" : "none";
        });
    });
/* ==========================================================================
RESET BUTONU FONKSİYONU
========================================================================== */
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            selectedComp.length = 0; 
            updateUI(); 
        });
    }

    const renderChampionPool = () => {
        championListEl.innerHTML = "";
        [...champions].sort((a, b) => a.cost - b.cost).forEach(champ => championListEl.appendChild(createChampElement(champ)));
    };

    renderChampionPool();
});