import { safeLowercase } from './tooltips.js';

let selectedComp = [];
let currentViewMode = "all";
let currentChampSearchTerm = "";
let config = {};

/*================================================================================================================*/
/*  SECTION: PLANLAYICI VE HAVUZ GÖRÜNTÜLEME MODU
/*================================================================================================================*/
export function initPlanner(settings) {
    config = settings;

    initBoardSlots();

    const toggleBtn = document.getElementById("toggle-pool-view");
    if (toggleBtn) {
        toggleBtn.onclick = (e) => {
            if (currentViewMode === "all") {
                currentViewMode = "cost";
                e.target.textContent = "Hepsini Göster";
            } else {
                currentViewMode = "all";
                e.target.textContent = "Maliyete Göre Sıralı";
            }
            renderChampionPool();
        };
    }

    document.addEventListener("drop", (e) => {
        if (e.target.closest('[id^="slot-"]')) return;

        const originSlot = e.dataTransfer.getData("origin-slot");
        if (originSlot !== "") {
            const slotIdx = parseInt(originSlot);
            const champToRemove = selectedComp.find(c => c.slotId === slotIdx);
            if (champToRemove) toggleChampion(champToRemove, null);
        }
    });

    document.addEventListener("dragover", (e) => e.preventDefault());

    window.resetPlanner = () => {
        selectedComp = [];
        renderChampionPool();
        updateUI();
    };

    renderChampionPool();
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON ARAMA GİZLEME FİLTRESİ
/*================================================================================================================*/
export function handleChampSearch(term) {
    currentChampSearchTerm = safeLowercase(term);

    const clearBtn = document.getElementById('clear-champ-search');
    if (clearBtn) {
        clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    }

    applyChampFilter();
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON HAVUZU RENDER İŞLEMLERİ
/*================================================================================================================*/
export function renderChampionPool() {
    const championListEl = document.getElementById("champions-grid");
    if (!championListEl) return;

    championListEl.innerHTML = "";
    let displayChamps = [...config.champions];

    displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

    if (currentViewMode === "cost") {
        let lastCost = null;
        displayChamps.forEach(c => {
            if (lastCost !== c.cost) {
                const divider = document.createElement("div");
                divider.className = `pool-divider cost-divider-${c.cost}`;
                divider.innerHTML = `<span>${c.cost} Altın</span>`;
                championListEl.appendChild(divider);
            }
            lastCost = c.cost;

            const el = createChampElement(c);
            if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");
            championListEl.appendChild(el);
        });
    } else {
        displayChamps.forEach(c => {
            const el = createChampElement(c);
            if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");
            championListEl.appendChild(el);
        });
    }

    if (config.onPoolRender_Callback) config.onPoolRender_Callback();

    applyChampFilter();
}

/*================================================================================================================*/
/*  SECTION: PLANLAYICI UI GÜNCELLEME İŞLEMLERİ
/*================================================================================================================*/
export function updateUI() {
    const MAX_SLOTS = 28;
    const teamCountEl = document.getElementById("team-count");

    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (slotEl) {
            slotEl.innerHTML = "";
            slotEl.className = "empty-slot";
            slotEl.onclick = null;
            slotEl.removeAttribute("draggable");
        }
    }

    selectedComp.forEach((champ) => {
        const slotEl = document.getElementById(`slot-${champ.slotId}`);
        if (slotEl) {
            const champDiv = createChampElement(champ, true);
            slotEl.className = champDiv.className;
            slotEl.innerHTML = champDiv.innerHTML;
            slotEl.classList.add("has-champ");

            slotEl.onclick = (e) => {
                e.stopPropagation();
                toggleChampion(champ, null);
            };

            slotEl.setAttribute("draggable", "true");
            slotEl.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", champ.name);
                e.dataTransfer.setData("origin-slot", champ.slotId.toString());
                if (config.champTooltip) config.champTooltip.style.display = "none";
            });
        }
    });

    if (teamCountEl) teamCountEl.textContent = selectedComp.length;

    if (config.onUpdate) {
        config.onUpdate(selectedComp);
    }

    document.querySelectorAll(".champ-item").forEach(el => {
        const isSelected = selectedComp.some(c => c.name === el.getAttribute("data-name"));
        el.classList.toggle("selected", isSelected);
    });
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON FİLTRELEME İŞLEMLERİ
/*================================================================================================================*/
function applyChampFilter() {
    const cards = document.querySelectorAll('.champ-item');
    cards.forEach(card => {
        const name = safeLowercase(card.getAttribute('data-name') || "");
        const traits = card.getAttribute('data-traits') || "";
        
        const isNameMatch = name.includes(currentChampSearchTerm);
        const isTraitMatch = traits.includes(currentChampSearchTerm);

        if (isNameMatch || isTraitMatch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON EKLEME/ÇIKARMA İŞLEMLERİ
/*================================================================================================================*/
function toggleChampion(champ, targetSlot = null) {
    const sourceChamp = selectedComp.find(c => c.name === champ.name);
    const occupantChamp = targetSlot !== null ? selectedComp.find(c => c.slotId === targetSlot) : null;

    if (sourceChamp) {
        if (targetSlot !== null) {
            const oldSourceSlot = sourceChamp.slotId;
            selectedComp = selectedComp.map(c => {
                if (c.name === sourceChamp.name) return { ...c, slotId: targetSlot };
                if (occupantChamp && c.name === occupantChamp.name) return { ...c, slotId: oldSourceSlot };
                return c;
            });
        } else {
            selectedComp = selectedComp.filter(c => c.name !== champ.name);
        }
    } else {
        if (targetSlot !== null) {
            if (occupantChamp) selectedComp = selectedComp.filter(c => c.slotId !== targetSlot);
            selectedComp.push({ ...champ, slotId: targetSlot });
        } else if (selectedComp.length < 10) {
            const occupiedSlots = selectedComp.map(c => c.slotId);
            const firstFree = Array.from({ length: 28 }, (_, i) => i).find(i => !occupiedSlots.includes(i));
            if (firstFree !== undefined) selectedComp.push({ ...champ, slotId: firstFree });
        }
    }
    updateUI();
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON TAŞIMA İŞLEMLERİ
/*================================================================================================================*/
function moveChampion(fromSlotId, toSlotId) {
    const startId = parseInt(fromSlotId);
    const endId = parseInt(toSlotId);
    if (startId === endId) return;

    const mover = selectedComp.find(c => c.slotId === startId);
    const target = selectedComp.find(c => c.slotId === endId);

    if (mover) {
        selectedComp = selectedComp.map(c => {
            if (c.slotId === startId) return { ...c, slotId: endId };
            if (target && c.slotId === endId) return { ...c, slotId: startId };
            return c;
        });
        updateUI();
    }
}

/*================================================================================================================*/
/*  SECTION: HEX SLOT İŞLEMLERİ
/*================================================================================================================*/
function initBoardSlots() {
    for (let i = 0; i < 28; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (!slotEl) continue;

        slotEl.addEventListener("dragover", (e) => {
            e.preventDefault();
            slotEl.classList.add("slot-hover");
        });
        slotEl.addEventListener("dragleave", () => slotEl.classList.remove("slot-hover"));
        slotEl.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            slotEl.classList.remove("slot-hover");

            const champName = e.dataTransfer.getData("text/plain");
            const originSlot = e.dataTransfer.getData("origin-slot");

            if (originSlot !== "") {
                moveChampion(originSlot, i);
            } else {
                const champ = config.champions.find(c => c.name === champName);
                if (champ) toggleChampion(champ, i);
            }
        });
    }
}

/*================================================================================================================*/
/*  SECTION: ŞAMPİYON ELEMENT OLUŞTURMA
/*================================================================================================================*/
function createChampElement(champ, isInComp = false) {
    const div = document.createElement("div");
    const costClass = isInComp ? `cost-border-${champ.cost}` : `cost-${champ.cost}`;
    div.className = `${isInComp ? 'comp-champ' : 'champ-item'} ${costClass}`;

    const img = document.createElement("img");
    img.src = champ.img;
    img.onerror = () => img.src = 'img/profiles/default.png';
    div.appendChild(img);

    if (champ.isLocked) {
        const lockIcon = document.createElement("div");
        lockIcon.className = "permanent-lock";
        div.appendChild(lockIcon);
    }


    div.setAttribute("data-name", champ.name);

    div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(','));

    div.onclick = (e) => {
        e.stopPropagation();
        if (config.champTooltip) config.champTooltip.style.display = "none";
        toggleChampion(champ);
    };

    div.ondragstart = (e) => {
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", champ.name);
        e.dataTransfer.setData("origin-slot", "");
        if (config.champTooltip) config.champTooltip.style.display = "none";
    };

    div.ondragend = () => div.classList.remove("dragging");

    return div;
}