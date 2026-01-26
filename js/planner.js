/* ============================================================================
   TAKIM PLANLAYICI
   ============================================================================ */

import { hideAllTooltips } from './tooltips.js';
import { renderChampionPool, updateSelectedChampions } from './champions.js';

let selectedComp = [];
let onTeamUpdateCallback = null;
let championsData = [];

const MAX_SLOTS = 28;
const MAX_TEAM_SIZE = 10;

/* ============================================================================
   BAŞLATMA
   ============================================================================ */

export function initPlanner(champions, onUpdate) {
    championsData = champions;
    onTeamUpdateCallback = onUpdate;
    
    initBoardSlots();
    setupResetButton();
    setupGlobalDrop();
    
    renderChampionPool(selectedComp, handleChampionClick);
}

/* ============================================================================
   RESET BUTONU
   ============================================================================ */

function setupResetButton() {
    const resetBtn = document.getElementById("reset-team");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetTeam);
    }
}

export function resetTeam() {
    selectedComp = [];
    updateUI();
    renderChampionPool(selectedComp, handleChampionClick);
}

/* ============================================================================
   GLOBAL DROP (TAKIMdan DışarıYA)
   ============================================================================ */

function setupGlobalDrop() {
    document.addEventListener("drop", (e) => {
        if (e.target.closest('[id^="slot-"]')) return;

        const originSlot = e.dataTransfer.getData("origin-slot");
        if (originSlot !== "") {
            const slotIdx = parseInt(originSlot);
            const champToRemove = selectedComp.find(c => c.slotId === slotIdx);
            if (champToRemove) {
                removeChampion(champToRemove);
            }
        }
    });

    document.addEventListener("dragover", (e) => e.preventDefault());
}

/* ============================================================================
   HEX SLOT İNİT
   ============================================================================ */

function initBoardSlots() {
    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (!slotEl) continue;

        slotEl.addEventListener("dragover", (e) => {
            e.preventDefault();
            slotEl.classList.add("slot-hover");
        });
        
        slotEl.addEventListener("dragleave", () => {
            slotEl.classList.remove("slot-hover");
        });
        
        slotEl.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            slotEl.classList.remove("slot-hover");

            const champName = e.dataTransfer.getData("text/plain");
            const originSlot = e.dataTransfer.getData("origin-slot");

            if (originSlot !== "") {
                moveChampion(parseInt(originSlot), i);
            } else {
                const champ = championsData.find(c => c.name === champName);
                if (champ) addChampionToSlot(champ, i);
            }
        });
    }
}

/* ============================================================================
   ŞAMPİYON EKLENDİĞİNDE (HAVUZDAN TIKLANDIĞINDA)
   ============================================================================ */

function handleChampionClick(champ) {
    hideAllTooltips();
    toggleChampion(champ);
}

function toggleChampion(champ) {
    const existing = selectedComp.find(c => c.name === champ.name);
    
    if (existing) {
        removeChampion(existing);
    } else {
        addChampion(champ);
    }
}

/* ============================================================================
   ŞAMPİYON EKLEME / ÇIKARMA
   ============================================================================ */

function addChampion(champ) {
    if (selectedComp.length >= MAX_TEAM_SIZE) return;
    
    const occupiedSlots = selectedComp.map(c => c.slotId);
    const firstFree = Array.from({ length: MAX_SLOTS }, (_, i) => i).find(i => !occupiedSlots.includes(i));
    
    if (firstFree !== undefined) {
        selectedComp.push({ ...champ, slotId: firstFree });
        updateUI();
    }
}

function addChampionToSlot(champ, targetSlot) {
    const existing = selectedComp.find(c => c.name === champ.name);
    const occupant = selectedComp.find(c => c.slotId === targetSlot);
    
    if (existing) {
        // Zaten takımda, yer değiştir
        const oldSlot = existing.slotId;
        selectedComp = selectedComp.map(c => {
            if (c.name === existing.name) return { ...c, slotId: targetSlot };
            if (occupant && c.name === occupant.name) return { ...c, slotId: oldSlot };
            return c;
        });
    } else {
        if (selectedComp.length >= MAX_TEAM_SIZE) return;
        
        // Yeni ekle
        if (occupant) {
            selectedComp = selectedComp.filter(c => c.slotId !== targetSlot);
        }
        selectedComp.push({ ...champ, slotId: targetSlot });
    }
    
    updateUI();
}

function removeChampion(champ) {
    selectedComp = selectedComp.filter(c => c.name !== champ.name);
    updateUI();
}

/* ============================================================================
   ŞAMPİYON TAŞIMA (SLOT'TAN SLOT'A)
   ============================================================================ */

function moveChampion(fromSlotId, toSlotId) {
    if (fromSlotId === toSlotId) return;

    const mover = selectedComp.find(c => c.slotId === fromSlotId);
    const target = selectedComp.find(c => c.slotId === toSlotId);

    if (mover) {
        selectedComp = selectedComp.map(c => {
            if (c.slotId === fromSlotId) return { ...c, slotId: toSlotId };
            if (target && c.slotId === toSlotId) return { ...c, slotId: fromSlotId };
            return c;
        });
        updateUI();
    }
}

/* ============================================================================
   UI GÜNCELLEME
   ============================================================================ */

function updateUI() {
    const teamCountEl = document.getElementById("team-count");

    // Tüm slotları temizle
    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (slotEl) {
            slotEl.innerHTML = "";
            slotEl.className = "empty-slot";
            slotEl.onclick = null;
            slotEl.removeAttribute("draggable");
        }
    }

    // Şampiyonları yerleştir
    selectedComp.forEach((champ) => {
        const slotEl = document.getElementById(`slot-${champ.slotId}`);
        if (slotEl) {
            const champDiv = createCompChampElement(champ);
            slotEl.className = champDiv.className;
            slotEl.innerHTML = champDiv.innerHTML;
            slotEl.classList.add("has-champ");

            slotEl.onclick = (e) => {
                e.stopPropagation();
                removeChampion(champ);
            };

            slotEl.setAttribute("draggable", "true");
            slotEl.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", champ.name);
                e.dataTransfer.setData("origin-slot", champ.slotId.toString());
                hideAllTooltips();
            });
        }
    });

    // Sayaç güncelle
    if (teamCountEl) teamCountEl.textContent = selectedComp.length;

    // Havuz güncelle
    updateSelectedChampions(selectedComp);

    // Callback
    if (onTeamUpdateCallback) {
        onTeamUpdateCallback(selectedComp);
    }
}

/* ============================================================================
   COMP'TAKİ ŞAMPİYON ELEMENT OLUŞTURMA
   ============================================================================ */

function createCompChampElement(champ) {
    const div = document.createElement("div");
    div.className = `comp-champ cost-border-${champ.cost}`;

    const img = document.createElement("img");
    img.src = champ.img;
    img.onerror = () => img.src = 'img/profiles/default.png';
    div.appendChild(img);

    div.setAttribute("data-name", champ.name);

    return div;
}