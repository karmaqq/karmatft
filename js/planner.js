/* ============================================================================
   TAKIM PLANLAYICI
   ============================================================================ */

import { hideAllTooltips } from "./tooltips.js";
import { renderChampionPool, updateSelectedChampions } from "./champions.js";

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
   ÖZEL BİRİM KURALLARI (SUMMON LOGIC)
   ============================================================================ */

function applySpecialRules() {
  const traitCounts = {};
  selectedComp.forEach((c) => {
    if (!c.isSummon) {
      c.traits.forEach((t) => {
        traitCounts[t] = (traitCounts[t] || 0) + 1;
      });
    }
  });

  const hasAnnie = selectedComp.some((c) => c.name === "Annie");
  const noxusCount = traitCounts["Noxus"] || 0;
  const freljordCount = traitCounts["Freljord"] || 0;

  const atakhanData = championsData.find((c) => c.name === "Atakhan");
  if (noxusCount >= 3) {
    if (!selectedComp.some((c) => c.name === "Atakhan")) {
      const freeSlot = findFirstFreeSlot();
      if (freeSlot !== undefined) {
        selectedComp.push({
          ...atakhanData,
          slotId: 14,
          freeSlot,
          freeSlot: true,
        });
      }
    }
  } else {
    selectedComp = selectedComp.filter((c) => c.name !== "Atakhan");
  }

  if (!hasAnnie) {
    selectedComp = selectedComp.filter((c) => c.name !== "Tibbers");
  }

  const kuleData = championsData.find((c) => c.name === "Donmuş Kule");
  selectedComp = selectedComp.filter((c) => c.name !== "Donmuş Kule"); // Önce temizle

  if (freljordCount >= 3) {
    selectedComp.push({
      ...kuleData,
      slotId: 8,
      freeSlot: true,
      isFixed: true,
    });
  }
  if (freljordCount >= 5) {
    selectedComp.push({
      ...kuleData,
      slotId: 11,
      freeSlot: true,
      isFixed: true,
    });
  }
}

function findFirstFreeSlot() {
  const occupiedSlots = selectedComp.map((c) => c.slotId);
  return Array.from({ length: MAX_SLOTS }, (_, i) => i).find(
    (i) => !occupiedSlots.includes(i),
  );
}

/* ============================================================================
   RESET VE GLOBAL DROP
   ============================================================================ */

function setupResetButton() {
  const resetBtn = document.getElementById("reset-team");
  if (resetBtn) resetBtn.addEventListener("click", resetTeam);
}

export function resetTeam() {
  selectedComp = [];
  updateUI();
  renderChampionPool(selectedComp, handleChampionClick);
}

function setupGlobalDrop() {
  document.addEventListener("drop", (e) => {
    if (e.target.closest('[id^="slot-"]')) return;
    const originSlot = e.dataTransfer.getData("origin-slot");
    if (originSlot !== "") {
      const slotIdx = parseInt(originSlot);
      const champToRemove = selectedComp.find((c) => c.slotId === slotIdx);
      if (champToRemove && !champToRemove.isFixed)
        removeChampion(champToRemove);
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

    slotEl.addEventListener("dragleave", () =>
      slotEl.classList.remove("slot-hover"),
    );

    slotEl.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      slotEl.classList.remove("slot-hover");

      const champName = e.dataTransfer.getData("text/plain");
      const originSlot = e.dataTransfer.getData("origin-slot");

      if (originSlot !== "") {
        moveChampion(parseInt(originSlot), i);
      } else {
        const champ = championsData.find((c) => c.name === champName);
        if (champ) addChampionToSlot(champ, i);
      }
    });
  }
}

/* ============================================================================
   ŞAMPİYON EKLEME / ÇIKARMA
   ============================================================================ */

function handleChampionClick(champ) {
  hideAllTooltips();

  if (champ.name === "Tibbers" && !selectedComp.some((c) => c.name === "Annie"))
    return;
  toggleChampion(champ);
}

function toggleChampion(champ) {
  const existing = selectedComp.find((c) => c.name === champ.name);
  if (existing) {
    if (existing.isFixed) return;
    removeChampion(existing);
  } else {
    addChampion(champ);
  }
}

function addChampion(champ) {
  const currentSize = selectedComp.filter((c) => !c.freeSlot).length;
  if (currentSize >= MAX_TEAM_SIZE) return;

  const firstFree = findFirstFreeSlot();
  if (firstFree !== undefined) {
    selectedComp.push({ ...champ, slotId: firstFree });
    updateUI();
  }
}

function addChampionToSlot(champ, targetSlot) {
  const existing = selectedComp.find((c) => c.name === champ.name);
  const occupant = selectedComp.find((c) => c.slotId === targetSlot);

  if (existing) {
    if (existing.isFixed) return;
    moveChampion(existing.slotId, targetSlot);
  } else {
    const currentSize = selectedComp.filter((c) => !c.freeSlot).length;
    if (currentSize >= MAX_TEAM_SIZE) return;

    if (occupant && !occupant.isFixed) {
      selectedComp = selectedComp.filter((c) => c.slotId !== targetSlot);
    }
    selectedComp.push({ ...champ, slotId: targetSlot });
    updateUI();
  }
}

function removeChampion(champ) {
  selectedComp = selectedComp.filter((c) => c.name !== champ.name);
  updateUI();
}

function moveChampion(fromSlotId, toSlotId) {
  if (fromSlotId === toSlotId) return;
  const mover = selectedComp.find((c) => c.slotId === fromSlotId);
  const target = selectedComp.find((c) => c.slotId === toSlotId);

  if (mover && !mover.isFixed) {
    selectedComp = selectedComp.map((c) => {
      if (c.slotId === fromSlotId) return { ...c, slotId: toSlotId };
      if (target && c.slotId === toSlotId && !target.isFixed)
        return { ...c, slotId: fromSlotId };
      return c;
    });
    updateUI();
  }
}

/* ============================================================================
   UI GÜNCELLEME
   ============================================================================ */

function updateUI() {
  applySpecialRules();

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
      const champDiv = createCompChampElement(champ);
      slotEl.className = champDiv.className;
      slotEl.innerHTML = champDiv.innerHTML;
      slotEl.classList.add("has-champ");

      if (champ.isFixed) slotEl.classList.add("fixed-unit");

      slotEl.onclick = (e) => {
        e.stopPropagation();
        if (!champ.isFixed) removeChampion(champ);
      };

      if (!champ.isFixed) {
        slotEl.setAttribute("draggable", "true");
        slotEl.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", champ.name);
          e.dataTransfer.setData("origin-slot", champ.slotId.toString());
          hideAllTooltips();
        });
      }
    }
  });

  const teamCountEl = document.getElementById("team-count");
  const actualSize = selectedComp.filter((c) => !c.freeSlot).length;
  if (teamCountEl) teamCountEl.textContent = actualSize;

  updateSelectedChampions(selectedComp);
  if (onTeamUpdateCallback) onTeamUpdateCallback(selectedComp);
}

function createCompChampElement(champ) {
  const div = document.createElement("div");
  div.className = `comp-champ cost-border-${champ.cost}`;
  if (champ.isSummon) div.classList.add("summon-unit");

  const img = document.createElement("img");
  img.src = champ.img;
  img.onerror = () => (img.src = "img/profiles/default.png");
  div.appendChild(img);

  return div;
}
