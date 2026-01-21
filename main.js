
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

document.addEventListener("DOMContentLoaded", () => {
    let selectedComp = []; 
    const traitListEl = document.getElementById("trait-list");
    const championListEl = document.getElementById("champions-grid");
    const searchInput = document.getElementById("champ-search");
    const resetBtn = document.getElementById("reset-team");
    const teamCountEl = document.getElementById("team-count");
    const globalTooltip = document.getElementById("global-trait-tooltip");

    let currentTraitsData = new Map();
    initItems();

    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);

    function findTraitInfo(key) {
        const safeKey = safeLowercase(key);
        if (TRAIT_THRESHOLDS.specialTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: 'special' };
        if (TRAIT_THRESHOLDS.originTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: 'origin' };
        if (TRAIT_THRESHOLDS.classTraits?.[safeKey]) return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: 'class' };
        return null;
    }

    function renderTraits() {
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

    function toggleChampion(champ, targetSlot = null) {
        const existingIdx = selectedComp.findIndex(c => c.name === champ.name);
        if (existingIdx >= 0) {
            if (targetSlot !== null) {
                const occupantIdx = selectedComp.findIndex(c => c.slotId === targetSlot);
                if (occupantIdx >= 0 && occupantIdx !== existingIdx) {
                    selectedComp.splice(occupantIdx, 1);
                }
                const currentIdx = selectedComp.findIndex(c => c.name === champ.name);
                selectedComp[currentIdx].slotId = targetSlot;
            } else {
                selectedComp.splice(existingIdx, 1);
            }
        } else {
            if (targetSlot !== null) {
                const occupantIdx = selectedComp.findIndex(c => c.slotId === targetSlot);
                if (occupantIdx >= 0) selectedComp.splice(occupantIdx, 1);
                selectedComp.push({ ...champ, slotId: targetSlot });
            } else if (selectedComp.length < 10) {
                const occupiedSlots = selectedComp.map(c => c.slotId);
                const finalSlot = Array.from({length: 28}, (_, i) => i).find(i => !occupiedSlots.includes(i));
                selectedComp.push({ ...champ, slotId: finalSlot });
            }
        }
        updateUI();
    }

    function initBoardSlots() {
        const MAX_SLOTS = 28;
        for (let i = 0; i < MAX_SLOTS; i++) {
            const slotEl = document.getElementById(`slot-${i}`);
            if (slotEl) {
                slotEl.addEventListener("dragover", (e) => {
                    e.preventDefault();
                    if (slotEl.classList.contains("empty-slot")) {
                        slotEl.classList.add("slot-hover");
                    }
                });
                slotEl.addEventListener("dragleave", () => {
                    slotEl.classList.remove("slot-hover");
                });
                slotEl.addEventListener("drop", (e) => {
                    e.preventDefault();
                    slotEl.classList.remove("slot-hover");
                    const champName = e.dataTransfer.getData("text/plain");
                    const champ = champions.find(c => c.name === champName);
                    if (champ) {
                        toggleChampion(champ, i);
                    }
                });
            }
        }
    }

    document.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
        if (!e.target.closest(".empty-slot") && !e.target.closest(".comp-champ")) {
            const champName = e.dataTransfer.getData("text/plain");
            const champ = champions.find(c => c.name === champName);
            if (champ) {
                const existingIdx = selectedComp.findIndex(c => c.name === champ.name);
                if (existingIdx >= 0) {
                    toggleChampion(champ, null); 
                }
            }
        }
    });

    function updateUI() { 
        const MAX_SLOTS = 28; 
        renderTraits(); 
        for (let i = 0; i < MAX_SLOTS; i++) {
            const slotEl = document.getElementById(`slot-${i}`);
            if (slotEl) {
                slotEl.innerHTML = "";
                slotEl.className = "empty-slot";
                slotEl.onclick = null;
                slotEl.draggable = false;
            }
        }
        selectedComp.forEach((champ) => {
            const slotEl = document.getElementById(`slot-${champ.slotId}`);
            if (slotEl) {
                const champDiv = createChampElement(champ, true); 
                slotEl.className = champDiv.className; 
                slotEl.innerHTML = champDiv.innerHTML; 
                slotEl.onclick = () => toggleChampion(champ); 
                slotEl.draggable = true;
                slotEl.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", champ.name);
                });
            }
        });
        if (teamCountEl) teamCountEl.textContent = selectedComp.length; 
        document.querySelectorAll(".champ-item").forEach(el => {
            el.classList.toggle("selected", selectedComp.some(c => c.name === el.getAttribute("data-name")));
        });
    }

    function createChampElement(champ, isInComp = false) {
        const div = document.createElement("div");
        div.draggable = true; 
        div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;
        const img = document.createElement("img");
        img.src = champ.img;
        div.appendChild(img);
        div.setAttribute("data-name", champ.name);
        div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));
        div.addEventListener("click", (e) => { 
            e.stopPropagation();
            if (typeof champTooltip !== 'undefined') champTooltip.style.display = "none"; 
            toggleChampion(champ); 
        });
        div.addEventListener("dragstart", (e) => {
            div.classList.add("dragging");
            e.dataTransfer.setData("text/plain", champ.name);
            if (typeof champTooltip !== 'undefined') champTooltip.style.display = "none";
        });
        div.addEventListener("dragend", () => {
            div.classList.remove("dragging");
            document.querySelectorAll(".empty-slot").forEach(s => s.classList.remove("slot-hover"));
        });
        return div;
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
                    champTooltip.style.display = "block";
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
            selectedComp = []; 
            searchInput.value = ""; 
            updateUI(); 
            document.querySelectorAll(".champ-item").forEach(el => el.classList.remove("not-matching"));
            const defaultCat = 'normal'; 
            document.querySelectorAll('.item-tab-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-cat') === defaultCat));
            renderCategory(defaultCat, ""); 
        });
    }

    const renderChampionPool = () => {
        championListEl.innerHTML = "";
        [...champions].sort((a, b) => a.cost - b.cost).forEach(c => championListEl.appendChild(createChampElement(c)));
    };

    initGlobalTooltips();
    renderChampionPool();
    initBoardSlots();
});

