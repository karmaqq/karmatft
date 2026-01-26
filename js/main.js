/* ============================================================================
   KARMA TFT - ANA KOORDİNATÖR
   ============================================================================ */

import { loadJSON } from './utils.js';
import { initTooltips } from './tooltips.js';
import { initTraits, renderTraits, getTraitsData } from './traits.js';
import { initChampions, getChampionsData } from './champions.js';
import { initItems, allItemsMap } from './items.js';
import { initPlanner } from './planner.js';
import { initPhotoMode } from './photomode.js';

/* ============================================================================
   UYGULAMA BAŞLATMA
   ============================================================================ */

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🎮 Karma TFT Başlatılıyor...");
    
    try {
        // 1. DATA YÜKLEME
        console.log("📦 Veri yükleniyor...");
        const [gameData, itemData] = await Promise.all([
            loadJSON('./data.json'),
            loadJSON('./itemdata.json')
        ]);
        
        if (!gameData || !itemData) {
            throw new Error("Kritik veriler yüklenemedi!");
        }
        
        const { champions, traits } = gameData;
        
        // 2. MODÜLLERI BAŞLAT
        console.log("⚙️ Modüller başlatılıyor...");
        
        // Traits
        initTraits(traits);
        
        // Champions
        initChampions(champions);
        
        // Items
        await initItems();
        
        // Planner
        initPlanner(champions, (selectedComp) => {
            renderTraits(selectedComp);
        });
        
        // Tooltips
        initTooltips(getTraitsData(), allItemsMap, champions);
        
        // Photo Mode
        initPhotoMode();
        
        console.log("✅ Sistem başarıyla yüklendi!");
        
    } catch (error) {
        console.error("❌ Uygulama başlatılamadı:", error);
        showErrorMessage(error);
    }
});

/* ============================================================================
   HATA MESAJI GÖSTERME
   ============================================================================ */

function showErrorMessage(error) {
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ff4e50;
        color: white;
        padding: 30px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        z-index: 999999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;
    errorDiv.innerHTML = `
        <h2 style="margin: 0 0 10px 0;">⚠️ Yükleme Hatası</h2>
        <p style="margin: 0;">${error.message}</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
            Lütfen sayfayı yenileyin veya veri dosyalarını kontrol edin.
        </p>
    `;
    document.body.appendChild(errorDiv);
}