/**
 * Türkçe karakter duyarlı küçük harf dönüştürücü.
 */
export function safeLowercase(str) {
    if (!str) return "";
    return str
        .replace(/İ/g, "i")
        .replace(/I/g, "i")
        .toLowerCase()
        .replace(/ı/g, "i");
}

/**
 * [iconName] formatındaki metinleri <img> etiketine dönüştürür.
 */
export function parseStatIcons(text) {
    if (!text) return "";
    let parsed = text.replace(/\[(\w+)\]/g, (match, iconName) => {
        const name = iconName.toLowerCase();
        // İkon bulunamazsa PNG dene, o da yoksa boş ver
        return `<img src="img/stats/${name}.svg" class="stat-icon-img" alt="${name}"
            onerror="this.onerror=null; this.src='img/stats/${name}.png';">`;
    });

    return parsed;
}

/**
 * ÖZELLİK (Trait) Tooltip HTML üretici.
 * Sol menüdeki trait üzerine gelince çalışır.
 */
export function generateTraitTooltipHTML(data) {
    const { traitName, count, steps, traitData } = data;
    
    // 1. HARF FİLTRESİ VE İKON YOLU (DÜZENLENDİ)
    const iconName = traitName.toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]/g, ''); // Boşlukları ve tüm özel karakterleri siler

    const finalIconPath = `img/traits/${iconName}.png`;
    
    // 2. EŞİK (THRESHOLD) MANTIĞI
    const hasStepDescriptions = steps && steps.some(s => s.desc);

    const thresholdsListHTML = !hasStepDescriptions ? "" : steps.map((s, index) => {
        const stepThreshold = s.count || s;
        const isReached = count >= stepThreshold;
        
        const nextStep = steps[index + 1];
        const nextStepCount = nextStep ? (nextStep.count || nextStep) : Infinity;
        const isCurrentActive = isReached && count < nextStepCount;
        
        return `
            <div class="t-tooltip-step ${isCurrentActive ? 'is-current-active' : ''} ${isReached ? 'is-passed' : ''}">
                <span class="t-threshold-val">${stepThreshold}</span>
                <span class="t-tooltip-desc">${parseStatIcons(s.desc || '')}</span>
            </div>`;
    }).join("");

    const divider = `<div class="t-tooltip-divider"></div>`;
    
    const hasTop = !!(traitData.generalDesc || traitData.preDesc);
    const hasBottom = !!(thresholdsListHTML || traitData.postDesc);

    // 3. HTML ÇIKTISI (finalIconPath BURADA KULLANILDI)
    return `
        <div class="t-tooltip-header">
            <div class="t-header-content">
                 <img src="${finalIconPath}" class="t-header-icon" onerror="this.src='img/traits/default.png'">
                 <span class="t-tooltip-title">${traitData.name || traitName}</span>
            </div>
        </div>
        ${hasTop || hasBottom ? divider : ''}
        <div class="t-tooltip-body">
            ${traitData.generalDesc ? `<p class="t-tooltip-general">${parseStatIcons(traitData.generalDesc)}</p>` : ''}
            ${traitData.preDesc ? `<p class="t-tooltip-pre-info">${parseStatIcons(traitData.preDesc)}</p>` : ''}
            
            ${(hasTop && hasBottom) ? divider : ''}
            
            ${thresholdsListHTML ? `<div class="t-tooltip-steps-list">${thresholdsListHTML}</div>` : ''}
            
            ${(thresholdsListHTML && traitData.postDesc) ? divider : ''}
            
            ${traitData.postDesc ? `<p class="t-tooltip-post-info">${parseStatIcons(traitData.postDesc)}</p>` : ''}
        </div>`;
}

/**
 * ŞAMPİYON Tooltip HTML üretici.
 * Sağ taraftaki şampiyon listesi veya takımdaki şampiyon üzerine gelince çalışır.
 */
export function generateChampionTooltipHTML(champ) {
    // Şampiyonun traitlerini döngüye alıp ikonlarını oluşturuyoruz.
    const traitsHTML = champ.traits.map(t => {
        // Dosya adı temizliği (türkçe karakter ve boşluk silme)
        const safeIcon = safeLowercase(t)
            .replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m]))
            .replace(/[^a-z0-9]/g, ''); // Sadece harf ve rakam kalsın

        return `
            <div class="ct-trait-item">
                <img src="img/traits/${safeIcon}.png" class="ct-trait-icon" onerror="this.style.display='none'">
                <span class="ct-trait-name">${t}</span>
            </div>`;
    }).join("");

    return `
        <div class="ct-header">
            <span class="ct-name">${champ.name}</span>
            <div class="ct-cost border-cost-${champ.cost}">
                <img src="img/coin.png" class="coin-icon" onerror="this.style.display='none'"> 
                ${champ.cost}
            </div>
        </div>
        <div class="ct-traits-list">${traitsHTML}</div>`;
}