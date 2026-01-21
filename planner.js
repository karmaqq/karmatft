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
        toggleBtn.addEventListener("click", (e) => {
            if (currentViewMode === "all") {
                currentViewMode = "cost";
                e.target.textContent = "Hepsini Göster";
            } else {
                currentViewMode = "all";
                e.target.textContent = "Maliyete Göre Sıralı";
            }
            renderChampionPool();
        });
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
 * Sağ Paneldeki Şampiyon Havuzunu Çizer
 */
/**
 * Şampiyon Havuzunu Render Eder - Filtreleme Fix
 */
    export function renderChampionPool() {
        const championListEl = document.getElementById("champions-grid");
        if (!championListEl) return;

        championListEl.innerHTML = "";
        // Arama terimini al (Config'den veya input'tan)
        const searchTerm = safeLowercase(config.searchInput?.value || "");
        
        let displayChamps = [...config.champions];

        // MOD 1: MALİYETE GÖRE GRUPLANMIŞ (COST VIEW)
        if (currentViewMode === "cost") {
            displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
            
            let lastCost = null;
            displayChamps.forEach(c => {
                const isMatch = checkMatch(c, searchTerm);

                if (lastCost !== c.cost) {
                    const divider = document.createElement("div");
                    divider.className = `pool-divider cost-divider-${c.cost}`;
                    divider.innerHTML = `<span>${c.cost} ALTIN</span>`;
                    championListEl.appendChild(divider);
                    
                    const hasMatchInThisCost = displayChamps.some(champ => champ.cost === c.cost && checkMatch(champ, searchTerm));
                    if (searchTerm !== "" && !hasMatchInThisCost) divider.style.display = "none";
                }
                lastCost = c.cost;

                const el = createChampElement(c);
                if (searchTerm !== "" && !isMatch) el.classList.add("not-matching");
                if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");
                
                championListEl.appendChild(el);
            });
        } 
        // MOD 2: HEPSİ (10x10 VIEW) - MİLYETE GÖRE SIRALI
        else {
            // Burada alfabetik yerine maliyete göre sıralama yapıyoruz
            displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
            
            displayChamps.forEach(c => {
                const isMatch = checkMatch(c, searchTerm);
                const el = createChampElement(c);

                if (searchTerm !== "" && !isMatch) el.classList.add("not-matching");
                if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");
                
                championListEl.appendChild(el);
            });
        }

        if (config.onPoolRender_Callback) {
            config.onPoolRender_Callback();
        }

/**
 * Yardımcı Fonksiyon: Şampiyon arama terimiyle eşleşiyor mu?
 */
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

    // Slotları temizle
    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (slotEl) {
            slotEl.innerHTML = "";
            slotEl.className = "empty-slot";
            slotEl.onclick = null;
            slotEl.removeAttribute("draggable");
        }
    }

    // Dolu slotları yerleştir
    selectedComp.forEach((champ) => {
        const slotEl = document.getElementById(`slot-${champ.slotId}`);
        if (slotEl) {
            const champDiv = createChampElement(champ, true);
            slotEl.className = champDiv.className;
            slotEl.innerHTML = champDiv.innerHTML;
            
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
    
    // Sinerjileri (Traits) hesapla
    config.renderTraits_Callback(selectedComp);

    // Havuzdaki 'selected' durumlarını güncelle
    document.querySelectorAll(".champ-item").forEach(el => {
        const isSelected = selectedComp.some(c => c.name === el.getAttribute("data-name"));
        el.classList.toggle("selected", isSelected);
    });
}

/**
 * Şampiyon ekleme/çıkarma ve akıllı yer değiştirme
 */
function toggleChampion(champ, targetSlot = null) {
    const sourceChamp = selectedComp.find(c => c.name === champ.name);
    const occupantChamp = targetSlot !== null ? selectedComp.find(c => c.slotId === targetSlot) : null;

    if (sourceChamp) {
        // Zaten takımdaysa
        if (targetSlot !== null) {
            // Yer değiştirme (Swap)
            const oldSourceSlot = sourceChamp.slotId;
            selectedComp = selectedComp.map(c => {
                if (c.name === sourceChamp.name) return { ...c, slotId: targetSlot };
                if (occupantChamp && c.name === occupantChamp.name) return { ...c, slotId: oldSourceSlot };
                return c;
            });
        } else {
            // Takımdan çıkar
            selectedComp = selectedComp.filter(c => c.name !== champ.name);
        }
    } else {
        // Takıma yeni ekleniyorsa
        if (targetSlot !== null) {
            if (occupantChamp) selectedComp = selectedComp.filter(c => c.slotId !== targetSlot);
            selectedComp.push({ ...champ, slotId: targetSlot });
        } else if (selectedComp.length < 10) {
            const occupiedSlots = selectedComp.map(c => c.slotId);
            const firstFree = Array.from({length: 28}, (_, i) => i).find(i => !occupiedSlots.includes(i));
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
    div.appendChild(img);
    
    div.setAttribute("data-name", champ.name);
    div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));
    
    div.onclick = (e) => {
        e.stopPropagation();
        if (config.champTooltip) config.champTooltip.style.display = "none";
        toggleChampion(champ);
    };

    div.ondragstart = (e) => {
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", champ.name);
        e.dataTransfer.setData("origin-slot", ""); // Havuzdan geliyorsa origin boştur
        if (config.champTooltip) config.champTooltip.style.display = "none";
    };

    div.ondragend = () => {
        div.classList.remove("dragging");
    };

    return div;
}