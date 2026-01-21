import { safeLowercase } from './tooltips.js';

// --- GLOBAL STATE ---
let selectedComp = [];
let currentViewMode = "all"; // 'all' veya 'cost'
let config = {}; // main.js'den enjekte edilen veriler

/**
 * Planner modülünü başlatır
 */
export function initPlanner(settings) {
    config = settings;
    
    initBoardSlots();
    
    // Görünüm Değiştirme Butonu (Maliyet vs Hepsi)
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

    // Tahta dışına bırakınca şampiyonu silme desteği
    document.addEventListener("drop", (e) => {
        if (e.target.closest('[id^="slot-"]')) return;
        const originSlot = e.dataTransfer.getData("origin-slot");
        if (originSlot !== "") {
            const slotIdx = parseInt(originSlot);
            const champToRemove = selectedComp.find(c => c.slot === slotIdx);
            if (champToRemove) toggleChampion(champToRemove);
        }
    });

    document.addEventListener("dragover", (e) => e.preventDefault());

    // İlk yüklemede havuzu çiz
    renderChampionPool();
}

// --- YARDIMCI FONKSİYONLAR ---

function checkMatch(champ, term) {
    if (!term) return true;
    const name = safeLowercase(champ.name || "");
    const traits = (champ.traits || []).map(t => safeLowercase(t)).join(" ");
    return name.includes(term) || traits.includes(term);
}

/**
 * Şampiyon Havuzunu Çizer
 */
export function renderChampionPool() {
    const championListEl = document.getElementById("champions-grid");
    if (!championListEl) return;

    championListEl.innerHTML = "";
    const searchTerm = safeLowercase(config.searchInput?.value || "");
    let displayChamps = [...config.champions];

    // ÖNEMLİ: Her iki modda da maliyete (1'den 5'e) göre sıralıyoruz
    displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

    if (currentViewMode === "cost") {
        let lastCost = null;
        displayChamps.forEach(c => {
            const isMatch = checkMatch(c, searchTerm);

            // Maliyet başlıklarını (divider) ekle
            if (lastCost !== c.cost) {
                const divider = document.createElement("div");
                divider.className = `pool-divider cost-divider-${c.cost}`;
                divider.innerHTML = `<span>${c.cost} ALTIN</span>`;
                
                // Arama yapılıyorsa ve o maliyette eşleşen yoksa başlığı gizle
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
        // 10x10 Modu (Başlıksız ama maliyet sıralı)
        displayChamps.forEach(c => {
            const isMatch = checkMatch(c, searchTerm);
            const el = createChampElement(c);
            if (searchTerm !== "" && !isMatch) el.classList.add("not-matching");
            if (selectedComp.some(target => target.name === c.name)) el.classList.add("selected");
            championListEl.appendChild(el);
        });
    }

    // Arama sonrası main.js'deki ekstra filtreleri tetikle
    if (config.onPoolRender_Callback) config.onPoolRender_Callback();
}

/**
 * Şampiyon Kartı Oluşturur
 */
function createChampElement(champ, isInComp = false) {
    const div = document.createElement("div");
    // Tahtadaki şampiyonlar ile havuzdakiler farklı class alır
    div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;
    
    const img = document.createElement("img");
    img.src = champ.img;
    div.appendChild(img);
    
    div.setAttribute("data-name", champ.name);
    div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));
    
    // Tıklayınca ekle/çıkar
    div.onclick = (e) => {
        e.stopPropagation();
        if (config.champTooltip) config.champTooltip.style.display = "none";
        toggleChampion(champ);
    };

    // Sürükleme özellikleri
    div.ondragstart = (e) => {
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", champ.name);
        // Eğer tahtadan sürükleniyorsa hangi slottan geldiğini kaydet
        const slotAttr = div.getAttribute("data-slot");
        e.dataTransfer.setData("origin-slot", slotAttr !== null ? slotAttr : "");
    };
    div.ondragend = () => div.classList.remove("dragging");
    div.draggable = true;

    return div;
}

/**
 * Şampiyonu Takıma Ekle veya Çıkar
 */
function toggleChampion(champ, targetSlot = -1) {
    const existingIdx = selectedComp.findIndex(c => c.name === champ.name);

    // Eğer zaten takımdaysa ve boşluğa tıklandıysa: Çıkar
    if (existingIdx > -1 && targetSlot === -1) {
        selectedComp.splice(existingIdx, 1);
    } else {
        // Takım dolu mu? (Maks 10)
        if (selectedComp.length >= 10 && existingIdx === -1) return;

        // Belirli bir slota bırakıldıysa
        if (targetSlot !== -1) {
            // Slotta başka biri varsa onu kov
            const occupantIdx = selectedComp.findIndex(c => c.slot === targetSlot);
            if (occupantIdx > -1) selectedComp.splice(occupantIdx, 1);
            
            if (existingIdx > -1) {
                selectedComp[existingIdx].slot = targetSlot;
            } else {
                selectedComp.push({ ...champ, slot: targetSlot });
            }
        } else {
            // Otomatik boş slot bul (Havuzdan tıklayınca)
            for (let i = 0; i < 10; i++) {
                if (!selectedComp.some(c => c.slot === i)) {
                    selectedComp.push({ ...champ, slot: i });
                    break;
                }
            }
        }
    }
    updateUI(selectedComp);
    renderChampionPool();
}

/**
 * Şampiyonu Tahtada Bir Slottan Diğerine Taşı
 */
function moveChampion(fromSlot, toSlot) {
    const fromIdx = selectedComp.findIndex(c => c.slot === parseInt(fromSlot));
    const toIdx = selectedComp.findIndex(c => c.slot === parseInt(toSlot));

    if (fromIdx > -1) {
        const champ = selectedComp[fromIdx];
        if (toIdx > -1) {
            // Yer değiştir
            selectedComp[toIdx].slot = parseInt(fromSlot);
        }
        champ.slot = parseInt(toSlot);
        updateUI(selectedComp);
    }
}

/**
 * Tahtayı ve Takım Listesini Günceller
 */
export function updateUI(comp) {
    selectedComp = comp;
    for (let i = 0; i < 10; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (!slot) continue;
        slot.innerHTML = "";
        slot.classList.remove("has-champ");

        const champ = selectedComp.find(c => c.slot === i);
        if (champ) {
            const el = createChampElement(champ, true);
            el.setAttribute("data-slot", i);
            slot.appendChild(el);
            slot.classList.add("has-champ");
        }
    }
    // Sinerjileri hesaplaması için main.js'e haber ver
    if (config.onUpdate) config.onUpdate(selectedComp);
}

/**
 * Tahta Slotlarını Hazırlar
 */
function initBoardSlots() {
    for (let i = 0; i < 10; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (!slot) continue;

        slot.ondragover = (e) => {
            e.preventDefault();
            slot.classList.add("slot-hover");
        };
        slot.ondragleave = () => slot.classList.remove("slot-hover");
        slot.ondrop = (e) => {
            e.preventDefault();
            slot.classList.remove("slot-hover");
            const champName = e.dataTransfer.getData("text/plain");
            const originSlot = e.dataTransfer.getData("origin-slot");

            if (originSlot !== "") {
                moveChampion(originSlot, i);
            } else {
                const champ = config.champions.find(c => c.name === champName);
                if (champ) toggleChampion(champ, i);
            }
        };
    }
}

/**
 * Takımı Tamamen Sıfırlar
 */
export function resetPlanner() {
    selectedComp = [];
    updateUI(selectedComp);
    renderChampionPool();
}

// Global erişim için (main.js reset butonu için)
window.resetPlanner = resetPlanner;