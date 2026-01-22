import { champions, traits as TRAIT_THRESHOLDS } from './data.js';
import { allItemsMap, renderCategory, initItems } from './items.js';
import {
    generateTraitTooltipHTML,
    generateChampionTooltipHTML,
    generateItemTooltipHTML,
    safeLowercase,
    applySmartPosition
} from './tooltips.js';
import { initPlanner, updateUI } from './planner.js';

document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTLER ---
    const traitListEl = document.getElementById("trait-list");
    const resetBtn = document.getElementById("reset-team");
    const globalTooltip = document.getElementById("global-trait-tooltip");
    
    // YENİ: Eşya Arama Elementleri
    const itemSearchInput = document.getElementById("item-search");
    const clearItemSearchBtn = document.getElementById("clear-item-search");

    let currentTraitsData = new Map();

    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);

    initItems();

    // YENİ: Eşya Arama Dinleyicileri
    if (itemSearchInput) {
        itemSearchInput.addEventListener("input", (e) => {
            // items.js'den gelen fonksiyonu çağırıyoruz
            import('./items.js').then(module => {
                module.handleItemSearch(e.target.value);
            });
        });
    }

    if (clearItemSearchBtn) {
        clearItemSearchBtn.addEventListener("click", () => {
            itemSearchInput.value = "";
            import('./items.js').then(module => {
                module.handleItemSearch("");
            });
            itemSearchInput.focus();
        });
    }

    initPlanner({
        champions: champions,
        champTooltip: champTooltip,
        onUpdate: (comp) => {
            renderTraits(comp);
        },
        onPoolRender_Callback: null 
    });

    // Reset butonuna eşya aramasını temizlemeyi de ekleyelim
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (window.resetPlanner) window.resetPlanner();
            
            // Eşya aramasını sıfırla
            if (itemSearchInput) {
                itemSearchInput.value = "";
                import('./items.js').then(m => m.handleItemSearch(""));
            }

            const activeBtn = document.querySelector('.item-tab-btn.active');
            const currentCat = activeBtn ? activeBtn.getAttribute('data-cat') : 'normal';
            renderCategory(currentCat);
        });
    }
    
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
        const tierClass = isActive ? (activeTier.rank || `tier-${reachedTierCount}`) : "inactive";

        li.className = `trait-item ${isActive ? 'active' : ''} ${tierClass} trait-type-${type}`;
        li.setAttribute("data-trait-key", safeLowercase(traitName));

        const safeIcon = safeLowercase(traitName).replace(/[ğüşıöç]/g, m => ({ ğ: 'g', ü: 'u', ş: 's', ı: 'i', ö: 'o', ç: 'c' }[m])).replace(/[^a-z0-9]/g, '');

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

    function initGlobalTooltips() {
        document.addEventListener("mouseover", (e) => {
            const champEl = e.target.closest(".champ-item, .comp-champ");
            if (champEl) {
                const champ = champions.find(c => c.name === champEl.getAttribute("data-name"));
                if (champ) {
                    globalTooltip.style.display = "none";
                    champTooltip.innerHTML = generateChampionTooltipHTML(champ);
                    champTooltip.className = `champ-tooltip cost-${champ.cost}`;
                    const context = champEl.classList.contains("comp-champ") ? "team" : "champion";
                    applySmartPosition(champTooltip, champEl.getBoundingClientRect(), context);
                }
                return;
            }

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


    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (window.resetPlanner) window.resetPlanner();
            const activeBtn = document.querySelector('.item-tab-btn.active');
            const currentCat = activeBtn ? activeBtn.getAttribute('data-cat') : 'normal';
            renderCategory(currentCat);
        });
    }

    initGlobalTooltips();
});