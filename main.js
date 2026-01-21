import { champions, traits as TRAIT_THRESHOLDS } from './data.js';
import { allItemsMap, renderCategory, initItems } from './items.js';
import { 
    generateTraitTooltipHTML, 
    generateChampionTooltipHTML, 
    generateItemTooltipHTML, 
    safeLowercase,
    applySmartPosition,
    initItemTooltips
} from './tooltips.js';

// Planner modülünden gelecek fonksiyonları import edeceğiz
// Şimdilik burayı boş bırakıyorum, planner.js'i hazırladığımızda ekleyeceğiz
import { initPlanner, renderChampionPool, updateUI } from './planner.js';

document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTLER ---
    const traitListEl = document.getElementById("trait-list");
    const searchInput = document.getElementById("champ-search");
    const resetBtn = document.getElementById("reset-team");
    const globalTooltip = document.getElementById("global-trait-tooltip");

    let currentTraitsData = new Map();

    // --- TOOLTIP HAZIRLIĞI ---
    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);

    // --- BAŞLATMA ---
    initItems();
    
    // Planner modülünü başlatıyoruz (Bağımlılıkları enjekte ediyoruz)
    initPlanner({
        champions,
        searchInput,
        champTooltip,
        updateUI_Callback: updateUI, // Planner içindeki updateUI'ı kullanacak
        renderTraits_Callback: renderTraits
    });

    // --- SİNERJİ MANTIĞI (TRAITS) ---
    function findTraitInfo(key) {
        const safeKey = safeLowercase(key);
        if (TRAIT_THRESHOLDS.specialTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: 'special' };
        if (TRAIT_THRESHOLDS.originTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: 'origin' };
        if (TRAIT_THRESHOLDS.classTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: 'class' };
        return null;
    }

    function renderTraits(selectedComp) {
        traitListEl.innerHTML = "";
        currentTraitsData.clear();

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

            let weight = isActive ? 50 : 0;
            if (isActive) {
                if (activeTier?.rank === "tier-prismatic") weight = 95;
                else if (key === "targon") weight = 90;
                else if (traitType === 'special') weight = 80;
                else if (traitType === 'origin') weight = 70;
                else weight = 60;
                weight += (reachedTierCount * 2); 
            } else {
                weight += (count / stepsArray[0].count);
            }

            const finalData = { traitName: traitData.name, count, traitData, activeTier, isActive, weight, steps: stepsArray, type: traitType };
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
        li.setAttribute("data-trait-key", safeLowercase(traitName));
        
        const safeIcon = safeLowercase(traitName).replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m])).replace(/[^a-z0-9]/g, '');
        
        li.innerHTML = `
            <div class="trait-hex-container">
                <div class="trait-hex"><img src="img/traits/${safeIcon}.png" class="t-icon" onerror="this.src='img/traits/default.png'"></div>
                <div class="trait-count-badge">${count}</div>
            </div>
            <div class="trait-info-wrapper">
                <div class="t-name">${traitName}</div>
                <div class="t-steps-row">
                    ${isActive ? steps.map(s => {
                        const v = s.count || s;
                        return `<span class="t-step ${activeTier && v === activeTier.count ? 'is-current' : (count >= v ? 'is-reached' : 'is-off')}">${v}</span>`;
                    }).join('<span class="t-sep">></span>') : `<span class="t-step is-off">${count} / ${steps[0].count || steps[0]}</span>`}
                </div>
            </div>`;
        return li;
    }

    // --- TOOLTIP EVENTLERI (GLOBAL) ---
    function initGlobalTooltips() {
        document.addEventListener("mouseover", (e) => {
            // Şampiyon Tooltip
            const champEl = e.target.closest(".champ-item, .comp-champ");
            if (champEl) {
                const champ = champions.find(c => c.name === champEl.getAttribute("data-name"));
                if (champ) {
                    globalTooltip.style.display = "none"; 
                    champTooltip.innerHTML = generateChampionTooltipHTML(champ);
                    champTooltip.className = `champ-tooltip cost-${champ.cost}`;
                    const context = champEl.classList.contains("comp-champ") ? "team" : "champion";
                    applySmartPosition(champTooltip, champEl.getBoundingClientRect(), context);
                    champTooltip.style.display = "block";
                }
                return;
            }

            // Trait Tooltip
            const traitEl = e.target.closest(".trait-item");
            if (traitEl) {
                const data = currentTraitsData.get(traitEl.getAttribute("data-trait-key"));
                if (data) {
                    champTooltip.style.display = "none";
                    globalTooltip.innerHTML = generateTraitTooltipHTML(data);
                    applySmartPosition(globalTooltip, traitEl.getBoundingClientRect(), "trait");
                    globalTooltip.style.display = "block";
                }
                return;
            }

            // Item Tooltip
            const itemCard = e.target.closest(".item-card");
            if (itemCard) {
                const item = allItemsMap.get(itemCard.getAttribute("data-id"));
                if (item) {
                    champTooltip.style.display = "none";
                    globalTooltip.innerHTML = generateItemTooltipHTML(item);
                    applySmartPosition(globalTooltip, itemCard.getBoundingClientRect(), "item");
                    globalTooltip.style.display = "block";
                }
            }
        });

        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(".champ-item, .comp-champ")) champTooltip.style.display = "none";
            if (e.target.closest(".trait-item, .item-card")) globalTooltip.style.display = "none";
        });
    }

    // --- MERKEZİ ARAMA FONKSİYONU ---
// Hem şampiyonları hem eşyaları anlık DOM üzerinden süzer
    function handleSearch() {
        const term = safeLowercase(searchInput.value || "");

        // 1. Şampiyonları Filtrele
        document.querySelectorAll(".champ-item").forEach(el => {
            const name = safeLowercase(el.getAttribute("data-name") || "");
            const traits = safeLowercase(el.getAttribute("data-traits") || "");
            const isMatch = name.includes(term) || traits.includes(term);
            
            // Eşleşmiyorsa yarı saydam/gizli yap
            el.classList.toggle("not-matching", term !== "" && !isMatch);
            // Eğer arama kutusu boşsa tüm not-matching sınıflarını temizle
            if (term === "") el.classList.remove("not-matching");
        });

        // 2. Eşyaları Filtrele
        document.querySelectorAll(".item-card, .item-icon").forEach(el => {
            const itemName = safeLowercase(el.getAttribute("data-name") || "");
            const isMatch = itemName.includes(term);
            el.style.display = (term === "" || isMatch) ? "block" : "none";
        });
    }

    // Global erişim sağla (items.js veya planner.js içinden çağrılabilmesi için)
    window.refreshSearch = handleSearch;

    // --- OLAY DİNLEYİCİLERİ ---

    searchInput.addEventListener("input", handleSearch);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            // 1. Arama Kutusunu Sıfırla
            searchInput.value = ""; 

            // 2. Planner'ı Sıfırla (selectedComp'u boşaltır ve havuzu render eder)
            if (window.resetPlanner) {
                window.resetPlanner(); 
            }

            // 3. Eşyaları 'normal' kategorisine döndür ve render et
            const defaultCat = 'normal'; 
            document.querySelectorAll('.item-tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-cat') === defaultCat);
            });
            renderCategory(defaultCat, ""); 

            // 4. KRİTİK: Tüm filtreleri temizle (DOM güncellendikten sonra)
            // setTimeout ile bir sonraki frame'e bırakmak render hatalarını önler
            setTimeout(() => {
                handleSearch();
            }, 0);
        });
    }

    // Başlat
    initGlobalTooltips();
});