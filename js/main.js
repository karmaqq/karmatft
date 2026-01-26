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
    const startTime = performance.now();
    console.log("🎮 Karma TFT Başlatılıyor...");

    try {
        console.log("📦 Veri yükleniyor...");
        const loadStart = performance.now();

        const [championsData, traitsData, itemData] = await Promise.all([
            loadJSON('data/championsdata.json'),
            loadJSON('data/traitsdata.json'),
            loadJSON('data/itemdata.json')
        ]);

        const loadTime = performance.now() - loadStart;
        console.log(`📦 Veri yükleme tamamlandı: ${loadTime.toFixed(2)}ms`);

        if (!championsData?.champions || !traitsData?.traits || !itemData) {
            throw new Error("Veri yapısı bozuk veya eksik!");
        }

        const champions = championsData.champions;
        const traits = traitsData.traits;

        console.log(`📊 Yüklenen veriler: ${champions.length} şampiyon, ${Object.keys(traits).length} özellik kategorisi`);

        console.log("⚙️ Modüller başlatılıyor...");
        const initStart = performance.now();

        initTraits(traits);
        initChampions(champions);

        const [itemsResult] = await Promise.all([
            initItems().catch(err => {
                console.warn("Items modülü başlatılırken hata:", err);
                return null;
            }),
            Promise.resolve().then(() => {
                try {
                    initPhotoMode();
                    return true;
                } catch (err) {
                    console.warn("Photo mode modülü başlatılırken hata:", err);
                    return false;
                }
            })
        ]);

        initPlanner(champions, (selectedComp) => {
            renderTraits(selectedComp);
        });

        initTooltips(getTraitsData(), allItemsMap, champions);

        const initTime = performance.now() - initStart;
        const totalTime = performance.now() - startTime;

        console.log(`⚙️ Modül başlatma tamamlandı: ${initTime.toFixed(2)}ms`);
        console.log(`✅ Sistem başarıyla yüklendi! Toplam süre: ${totalTime.toFixed(2)}ms`);

        logPerformanceSummary(totalTime, loadTime, initTime, champions.length, Object.keys(traits).length);
        
    } catch (error) {
        console.error("❌ Uygulama başlatılamadı:", error);
        showErrorMessage(error);
    }
});

/* ============================================================================
   HATA MESAJI GÖSTERME
   ============================================================================ */

function showErrorMessage(error) {
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement("div");
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff4e50, #ff6b6b);
        color: white;
        padding: 30px;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        z-index: 999999;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        max-width: 400px;
        text-align: center;
        border: 2px solid rgba(255,255,255,0.2);
    `;

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Tekrar Dene';
    retryButton.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 15px;
        font-size: 14px;
        transition: all 0.3s ease;
    `;
    retryButton.onmouseover = () => retryButton.style.background = 'rgba(255,255,255,0.3)';
    retryButton.onmouseout = () => retryButton.style.background = 'rgba(255,255,255,0.2)';
    retryButton.onclick = () => window.location.reload();

    errorDiv.innerHTML = `
        <h2 style="margin: 0 0 10px 0; font-size: 24px;">⚠️ Yükleme Hatası</h2>
        <p style="margin: 0 0 15px 0; line-height: 1.4;">${error.message}</p>
        <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            Lütfen internet bağlantınızı kontrol edin veya sayfayı yenileyin.
        </p>
    `;
    errorDiv.appendChild(retryButton);

    document.body.appendChild(errorDiv);
}

/* ============================================================================
   PERFORMANS ÖZETİ
   ============================================================================ */

function logPerformanceSummary(totalTime, loadTime, initTime, championCount, traitCategories) {
    const performanceData = {
        total: totalTime.toFixed(2),
        load: loadTime.toFixed(2),
        init: initTime.toFixed(2),
        champions: championCount,
        traits: traitCategories
    };

    let rating = '🟢 MÜKEMMEL';
    if (totalTime > 2000) rating = '🟡 YAVAŞ';
    if (totalTime > 5000) rating = '🔴 ÇOK YAVAŞ';

    console.log(`📈 Performans Özeti: ${rating}`);
    console.table(performanceData);

    try {
        const history = JSON.parse(localStorage.getItem('karma-tft-performance') || '[]');
        history.push({
            timestamp: Date.now(),
            ...performanceData
        });

        if (history.length > 10) history.shift();
        localStorage.setItem('karma-tft-performance', JSON.stringify(history));
    } catch (e) {
    }
}