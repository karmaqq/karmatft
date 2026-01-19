import { champions, traits as TRAIT_THRESHOLDS } from './data.js';
import { generateTraitTooltipHTML, generateChampionTooltipHTML, safeLowercase } from './tooltips.js';

document.addEventListener("DOMContentLoaded", () => {
    // --- REFERANSLAR ---
    const selectedComp = []; 
    const traitListEl = document.getElementById("trait-list");
    const compListEl = document.getElementById("active-team-grid");
    const championListEl = document.getElementById("champions-grid");
    const searchInput = document.getElementById("champ-search");
    const resetBtn = document.getElementById("reset-team");
    const teamCountEl = document.getElementById("team-count");
    const globalTooltip = document.getElementById("global-trait-tooltip");

    // Şampiyon tooltip elementini oluştur
    const champTooltip = document.createElement("div");
    champTooltip.className = "champ-tooltip";
    document.body.appendChild(champTooltip);

    // --- YARDIMCI FONKSİYON: Trait Verisini ve Tipini Bul ---
    // Artık veriler ayrıldığı için, aradığımız trait'in hangi grupta olduğunu bulmamız lazım.
    function findTraitInfo(key) {
        // Önce key'i güvenli hale getir
        const safeKey = safeLowercase(key);

        // 1. Özel Traitlerde ara
        if (TRAIT_THRESHOLDS.specialTraits && TRAIT_THRESHOLDS.specialTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.specialTraits[safeKey], type: 'special' };
        }
        // 2. Kökenlerde (Origin) ara
        if (TRAIT_THRESHOLDS.originTraits && TRAIT_THRESHOLDS.originTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.originTraits[safeKey], type: 'origin' };
        }
        // 3. Sınıflarda (Class) ara
        if (TRAIT_THRESHOLDS.classTraits && TRAIT_THRESHOLDS.classTraits[safeKey]) {
            return { data: TRAIT_THRESHOLDS.classTraits[safeKey], type: 'class' };
        }
        
        return null; // Bulunamadı
    }

    // --- ÖZELLİK HESAPLAMA ---
function renderTraits() {
    traitListEl.innerHTML = "";
    
    // Takımdaki trait sayılarını hesapla
    const traitCounts = selectedComp.reduce((acc, champ) => {
        champ.traits.forEach(t => {
            const cleanName = safeLowercase(t);
            acc[cleanName] = (acc[cleanName] || 0) + 1;
        });
        return acc;
    }, {});

    const processedTraits = Object.entries(traitCounts).map(([key, count]) => {
        const info = findTraitInfo(key);
        if (!info) return null; 

        const { data: traitData, type: traitType } = info;
        const traitName = traitData.name;
        const lowerKey = key; // Zaten safeLowercase yapılmıştı

        // Threshold (Eşik) Ayarlamaları
        let stepsArray = traitData.thresholds && Array.isArray(traitData.thresholds)
            ? traitData.thresholds
            : (Array.isArray(traitData) ? traitData : [traitData]);

        stepsArray = stepsArray.map(s => typeof s === 'number' ? { count: s } : s);

        const activeTier = [...stepsArray].reverse().find(s => count >= s.count);
        const reachedTierCount = stepsArray.filter(s => count >= s.count).length;
        const isActive = !!activeTier;
        const isPrismatic = activeTier && activeTier.rank === "tier-prismatic";

        // --- YENİ PUAN SİSTEMİ (GÜNDELİK SAYILAR) ---
        // Temel puan: Aktifse 50'den başla, pasifse 0'dan.
        let weight = isActive ? 50 : 0;
        
        if (isActive) {
            if (isPrismatic) weight = 95;          // 1. Prizmatik (En Üst)
            else if (lowerKey === "targon") weight = 90; // 2. Targon (VIP)
            else if (traitType === 'special') weight = 80; // 3. Özel Yetenekler
            else if (traitType === 'origin') weight = 70;  // 4. Kökenler
            else weight = 60;                             // 5. Sınıflar
            
            // Kendi grubu içindeki sıralama (Örn: 2 Ionia, 4 Ionia'dan altta kalsın)
            weight += (reachedTierCount * 2); 
        } else {
            // Pasifler için: Kökenleri sınıfların bir tık önüne alalım (10-20 arası)
            if (lowerKey === "targon") weight = 25; // Targon pasifken de üstte dursun
            else if (traitType === 'origin') weight = 15;
            else weight = 10;

            // Doluluk oranına göre minik puan (0.1, 0.5 gibi) ekle ki ilerleme görünsün
            weight += (count / stepsArray[0].count);
        }

        return { traitName, count, traitData, activeTier, isActive, isPrismatic, reachedTierCount, weight, steps: stepsArray, type: traitType };
    }).filter(Boolean);

    // Listeyi ağırlığa göre sırala
    processedTraits
        .sort((a, b) => {
            if (b.weight !== a.weight) return b.weight - a.weight;
            return a.traitName.localeCompare(b.traitName); // Puanlar eşitse alfabetik
        })
        .forEach(data => traitListEl.appendChild(createTraitSimpleElement(data)));
}

    function createTraitSimpleElement(data) {
        const { traitName, count, activeTier, isActive, steps, reachedTierCount, type } = data;
        const li = document.createElement("li");

        // CSS Class belirleme
        let tierClass = "inactive";
        if (isActive) {
            if (data.isPrismatic) tierClass = "tier-prismatic";
            else if (activeTier.rank) tierClass = activeTier.rank;
            else tierClass = `tier-${reachedTierCount}`;
        }
        
        // Tip verisini de class olarak ekleyebilirsin (örn: trait-origin, trait-class)
        li.className = `trait-item ${isActive ? 'active' : ''} ${tierClass} trait-type-${type}`;

        const tooltipHTML = generateTraitTooltipHTML(data);
        
        // Eşiklerin (Steps) Çizimi
        let thresholdsHTML = isActive 
            ? steps.map(s => {
                const stepVal = s.count || s;
                const isCurrent = activeTier && stepVal === activeTier.count;
                return `<span class="t-step ${isCurrent ? 'is-current' : (count >= stepVal ? 'is-reached' : 'is-off')}">${stepVal}</span>`;
              }).join('<span class="t-sep">></span>')
            : `<span class="t-step is-off">${count} / ${steps[0].count || steps[0]}</span>`;

        // İkon adını temizle (Dosya adıyla eşleşmesi için)
        const safeIconName = safeLowercase(traitName)
            .replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m]))
            .replace(/[^a-z0-9]/g, ''); // Boşlukları ve özel karakterleri sil

        li.innerHTML = `
        <div class="trait-hex-container">
            <div class="trait-hex">
                <img src="img/traits/${safeIconName}.png" class="t-icon" onerror="this.src='img/traits/default.png'">
            </div>
            <div class="trait-count-badge">${count}</div>
        </div>
        <div class="trait-info-wrapper">
            <div class="t-name" style="color: ${isActive ? '#fff' : '#888'}">${traitName}</div>
            <div class="t-steps-row">${thresholdsHTML}</div>
        </div>
    `;

        // Tooltip Olayları
        li.addEventListener("mouseenter", () => {
            globalTooltip.innerHTML = tooltipHTML;
            globalTooltip.style.display = "block";
            const rect = li.getBoundingClientRect();
            let targetTop = rect.top + (rect.height / 2) - (globalTooltip.offsetHeight / 2);
            if (targetTop < 10) targetTop = 10;
            globalTooltip.style.top = `${targetTop}px`;
        });

        li.addEventListener("mouseleave", () => globalTooltip.style.display = "none");
        return li;
    }

    // --- ŞAMPİYON OLUŞTURUCU ---
    function createChampElement(champ, isInComp = false) {
        const div = document.createElement("div");
        div.className = isInComp ? `comp-champ cost-border-${champ.cost}` : `champ-item cost-${champ.cost}`;
        div.setAttribute("data-name", champ.name);
        // data-traits attribute'una traitleri virgülle ayırarak yazıyoruz
        div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(","));

        const img = document.createElement("img");
        img.src = champ.img;
        img.alt = champ.name;
        div.appendChild(img);
        
        div.addEventListener("mouseenter", () => {
            champTooltip.innerHTML = generateChampionTooltipHTML(champ);
            champTooltip.className = `champ-tooltip cost-${champ.cost}`;
            champTooltip.style.display = "block";

            const rect = div.getBoundingClientRect();
            const tWidth = champTooltip.offsetWidth || 220;
            const tHeight = champTooltip.offsetHeight;
            
            let left = rect.left > window.innerWidth / 2 ? rect.left - tWidth - 12 : rect.right + 12;
            let top = rect.top + (rect.height / 2) - (tHeight / 2);
            
            if (top < 10) top = 10;
            if (top + tHeight > window.innerHeight - 10) top = window.innerHeight - tHeight - 10;

            champTooltip.style.left = `${left}px`;
            champTooltip.style.top = `${top}px`;
        });

        div.addEventListener("mouseleave", () => champTooltip.style.display = "none");
        div.addEventListener("click", () => {
            champTooltip.style.display = "none";
            toggleChampion(champ);
        });

        return div;
    }

    function toggleChampion(champ) {
        const index = selectedComp.findIndex(c => c.name === champ.name);
        if (index >= 0) selectedComp.splice(index, 1);
        else if (selectedComp.length < 10) selectedComp.push(champ);
        updateUI();
    }

    function updateUI() {
        compListEl.innerHTML = "";
        selectedComp.forEach(champ => compListEl.appendChild(createChampElement(champ, true)));
        if (teamCountEl) teamCountEl.textContent = selectedComp.length;

        document.querySelectorAll(".champ-item").forEach(el => {
            const name = el.getAttribute("data-name");
            el.classList.toggle("selected", selectedComp.some(c => c.name === name));
        });

        renderTraits();
    }

    // Arama Fonksiyonu
    searchInput.addEventListener("input", e => {
        const searchTerm = safeLowercase(e.target.value);

        document.querySelectorAll(".champ-item").forEach(el => {
            const name = safeLowercase(el.getAttribute("data-name") || "");
            const traits = safeLowercase(el.getAttribute("data-traits") || "");
            const match = searchTerm === "" || name.includes(searchTerm) || traits.includes(searchTerm);

            el.style.opacity = match ? "1" : "0.2";
            el.style.pointerEvents = match ? "auto" : "none";
        });
    });

    // --- SIFIRLAMA BUTONU ---
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            selectedComp.length = 0; 
            updateUI(); 
        });
    }

    // İlk Yükleme
    const renderChampionPool = () => {
        championListEl.innerHTML = "";
        [...champions].sort((a, b) => a.cost - b.cost).forEach(champ => championListEl.appendChild(createChampElement(champ)));
    };

    renderChampionPool();
});