/* ============================================================================
   KARMA TFT - ANA KOORDİNATÖR
   ============================================================================ */

import { loadJSON, initMobileTabs } from "./utils.js";
import { initTooltips } from "./tooltips.js";
import { initNavigation } from "./header.js";
import { initTraits, renderTraits, getTraitsData, initTraitSidebar } from "./traits.js";
import { initChampions, getChampionsData } from "./champions.js";
import { initItems, allItemsMap } from "./items.js";
import { initPlanner } from "./planner.js";
import { initPhotoMode } from "./photomode.js";

/* ============================================================================
   UYGULAMA BAŞLATMA
   ============================================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  const [championsData, traitsData, itemData] = await Promise.all([
    loadJSON("data/championsdata.json"),
    loadJSON("data/traitsdata.json"),
    loadJSON("data/itemdata.json"),
  ]);

  initMobileTabs();

  initTraitSidebar();

  if (championsData?.champions && traitsData?.traits && itemData) {
    const champions = championsData.champions;
    const traits = traitsData.traits;

    initNavigation();

    initTraits(traits);
    initChampions(champions);

    await initItems();
    initPhotoMode();

    initPlanner(champions, (selectedComp) => {
      renderTraits(selectedComp);
    });

    initTooltips(getTraitsData(), allItemsMap, champions);
  }
});