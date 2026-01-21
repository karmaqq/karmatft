import { safeLowercase } from './tooltips.js';

// --- GLOBAL STATE ---
let selectedComp = [];
let currentViewMode = "all"; // 'all' veya 'cost'
let config = {}; // main.js'den enjekte edilen bağımlılıklar

/**
 * Planner modülünü başlatır
 */
export function initPlanner(settings) {
    config = settings;

    initBoardSlots();

    // Görünüm Değiştirme (Maliyet vs Alfabetik)
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

    // Tahta dışına (boşluğa) bırakınca şampiyonu silme
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

    // Reset fonksiyonunu globalden erişilebilir yap (Main.js için)
    window.resetPlanner = () => {
        selectedComp = [];
        renderChampionPool();
        updateUI();
    };

    renderChampionPool();
}

/**
 * Şampiyon Havuzunu Render Eder
 */
export function renderChampionPool() {
    const championListEl = document.getElementById("champions-grid");
    if (!championListEl) return;

    championListEl.innerHTML = "";
    const searchTerm = safeLowercase(config.searchInput?.value || "");
    let displayChamps = [...config.champions];

    displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

    if (currentViewMode === "cost") {
        let lastCost = null;
        displayChamps.forEach(c => {
            const isMatch = checkMatch(c, searchTerm);

            if (lastCost !== c.cost) {
                const divider = document.createElement("div");
                divider.className = `pool-divider cost-divider-${c.cost}`;
                divider.innerHTML = `<span>${c.cost} ALTIN</span>`;

                const hasMatchInThisCost = displayChamps.some(champ =>
                    champ.cost === c.cost && checkMatch(champ, searchTerm)
                );
                if (searchTerm !== "" && !hasMatchInThisCost) divider.style.display = "none";

                championListEl.appendChild(divider);
            }
            lastCost = c.cost;

            const el = createChampElement(c);
            if (searchTerm !== "" && !isMatch) el.classList.add("not-matching");
            if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");

            championListEl.appendChild(el);
        });
    } else {
        displayChamps.forEach(c => {
            const isMatch = checkMatch(c, searchTerm);
            const el = createChampElement(c);

            if (searchTerm !== "" && !isMatch) el.classList.add("not-matching");
            if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");

            championListEl.appendChild(el);
        });
    }

    if (config.onPoolRender_Callback) config.onPoolRender_Callback();
}

function checkMatch(champ, term) {
    if (term === "") return true;
    const nameMatch = safeLowercase(champ.name).includes(term);
    const traitMatch = champ.traits.some(t => safeLowercase(t).includes(term));
    return nameMatch || traitMatch;
}

/**
 * Tahtayı ve Sinerjileri Günceller
 */
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

    // --- KRİTİK BAĞLANTI: Main.js'deki Sinerji Fonksiyonunu Çağır ---
    if (config.onUpdate) {
        config.onUpdate(selectedComp);
    }

    document.querySelectorAll(".champ-item").forEach(el => {
        const isSelected = selectedComp.some(c => c.name === el.getAttribute("data-name"));
        el.classList.toggle("selected", isSelected);
    });
}

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

function createChampElement(champ, isInComp = false) {
    const div = document.createElement("div");
    div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;

    const img = document.createElement("img");
    img.src = champ.img;
    img.onerror = () => img.src = 'img/profiles/default.png';
    div.appendChild(img);

    div.setAttribute("data-name", champ.name);
    div.setAttribute("data-traits", (champ.traits || []).map(t => safeLowercase(t)).join(","));

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