/* ============================================================================
   ÖZELLİK (TRAIT) YÖNETİMİ
   ============================================================================ */

import { safeLowercase } from "./utils.js";

let TRAIT_THRESHOLDS = {};
let currentTraitsData = new Map();
let traitListEl = null;

/* ============================================================================
   BAŞLATMA
   ============================================================================ */

export function initTraits(traitThresholds) {
  TRAIT_THRESHOLDS = traitThresholds;
  traitListEl = document.getElementById("trait-list");
}

/* ============================================================================
   TRAIT BİLGİSİNİ BULMA
   ============================================================================ */

function findTraitInfo(key) {
  const safeKey = safeLowercase(key);
  if (TRAIT_THRESHOLDS.specialTraits?.[safeKey]) {
    return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: "special" };
  }
  if (TRAIT_THRESHOLDS.originTraits?.[safeKey]) {
    return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: "origin" };
  }
  if (TRAIT_THRESHOLDS.classTraits?.[safeKey]) {
    return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: "class" };
  }
  return null;
}

/* ============================================================================
   TRAIT RENDER VE PUANLAMA
   ============================================================================ */

export function renderTraits(selectedComp) {
  if (!traitListEl) return;

  traitListEl.innerHTML = "";
  currentTraitsData.clear();

  const traitCounts = selectedComp.reduce((acc, champ) => {
    champ.traits.forEach((t) => {
      const cleanName = safeLowercase(t);
      acc[cleanName] = (acc[cleanName] || 0) + 1;
    });
    return acc;
  }, {});

  const processedTraits = Object.entries(traitCounts)
    .map(([key, count]) => {
      const info = findTraitInfo(key);
      if (!info) return null;

      const { data: traitData, type: traitType } = info;

      let stepsArray =
        traitData.thresholds ||
        (Array.isArray(traitData) ? traitData : [traitData]);
      stepsArray = stepsArray.map((s) =>
        typeof s === "number" ? { count: s } : s,
      );

      const activeTier = [...stepsArray]
        .reverse()
        .find((s) => count >= s.count);
      const reachedTierCount = stepsArray.filter(
        (s) => count >= s.count,
      ).length;
      const isActive = !!activeTier;

      let weight = isActive ? 50 : 0;
      if (isActive) {
        if (activeTier?.rank === "tier-prismatic") weight = 95;
        else if (key === "targon") weight = 90;
        else if (traitType === "special") weight = 80;
        else if (traitType === "origin") weight = 70;
        else weight = 60;
        weight += reachedTierCount * 2;
      } else {
        weight += count / stepsArray[0].count;
      }

      const finalData = {
        traitName: traitData.name,
        count,
        traitData,
        activeTier,
        isActive,
        weight,
        steps: stepsArray,
        type: traitType,
      };

      currentTraitsData.set(safeLowercase(traitData.name), finalData);
      return finalData;
    })
    .filter(Boolean);

  processedTraits
    .sort(
      (a, b) => b.weight - a.weight || a.traitName.localeCompare(b.traitName),
    )
    .forEach((data) => traitListEl.appendChild(createTraitElement(data)));
}

/* ============================================================================
   TRAIT ELEMENT OLUŞTURMA
   ============================================================================ */

function createTraitElement(data) {
  const li = document.createElement("li");
  const { traitName, count, activeTier, isActive, steps, type } = data;

  const reachedTierCount = steps.filter((s) => count >= (s.count || s)).length;
  const tierClass = isActive
    ? activeTier.rank || `tier-${reachedTierCount}`
    : "inactive";

  li.className = `trait-item ${isActive ? "active" : ""} ${tierClass} trait-type-${type}`;
  li.setAttribute("data-trait-key", safeLowercase(traitName));

  const safeIcon = safeLowercase(traitName);

  li.innerHTML = `
        <div class="trait-hex-container">
            <div class="trait-hex-outer">
                <div class="trait-hex-inner">
                    <img src="img/traits/${safeIcon}.png" class="t-icon" onerror="this.src='img/traits/default.png'">
                </div>
            </div>
        </div>
        <div class="trait-count-badge-box">${count}</div>
        <div class="trait-info-wrapper">
            <div class="t-name">${traitName}</div>
            <div class="t-steps-row">
                ${
                  isActive
                    ? steps
                        .map((s) => {
                          const v = s.count || s;
                          const isCurrent =
                            activeTier && v === activeTier.count;
                          return `<span class="t-step ${isCurrent ? "is-current" : count >= v ? "is-reached" : "is-off"}">${v}</span>`;
                        })
                        .join('<span class="t-sep">></span>')
                    : `<span class="t-step is-off">${count} / ${steps[0].count || steps[0]}</span>`
                }
            </div>
        </div>`;

  return li;
}

export function initTraitSidebar() {
  const panel = document.querySelector(".traits-panel");
  if (!panel) return;

  let startX = 0;

  // 1. Dokunmatik Sürükleme (Swipe)
  panel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  panel.addEventListener("touchmove", (e) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (diff > 40) { 
      panel.classList.add("expanded");
    } else if (diff < -40) {
      panel.classList.remove("expanded");
    }
  }, { passive: true });

  // 2. Tıklama Kontrolü
  panel.addEventListener("click", (e) => {
    // Eğer panel kapalıysa, tıklandığında aç
    if (!panel.classList.contains("expanded")) {
      panel.classList.add("expanded");
      e.stopPropagation(); // Dışarı tıklama olayını tetiklemesini engelle
    }
  });

  // 3. Dışarı tıklandığında veya Sola kaydırıldığında kapat
  document.addEventListener("click", (e) => {
    if (panel.classList.contains("expanded") && !panel.contains(e.target)) {
      panel.classList.remove("expanded");
    }
  });
}

/* ============================================================================
   EXPORT
   ============================================================================ */

export function getTraitsData() {
  return currentTraitsData;
}
