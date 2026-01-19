/* ==========================================================================
GÜVENLİ KÜÇÜK HARF FONKSİYONU
========================================================================== */
export function safeLowercase(str) {
    if (!str) return "";
    return str
        .replace(/İ/g, "i")
        .replace(/I/g, "i")
        .toLowerCase()
        .replace(/ı/g, "i");
}
/* ==========================================================================
GÜVENLİ RESİM FİLTRELEME
========================================================================== */
export function parseStatIcons(text) {
    if (!text) return "";
    
    return text.replace(/\[([^\]]+)\]/g, (match, iconName) => {
        const name = iconName.toLowerCase().trim();
        
        return `<img src="img/stats/${name}.svg" 
                     class="stat-icon-img" 
                     alt="${name}"
                     onerror="this.onerror=null; this.src='img/stats/${name}.png'; this.onerror=function(){this.style.display='none'};">`;
    });
}
/* ==========================================================================
TRAIT TOOLTIP GENEL YAPISI
========================================================================== */
export function generateTraitTooltipHTML(data) {
    const { traitName, count, steps, traitData } = data;
    
    const iconName = traitName.toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]/g, '');

    const finalIconPath = `img/traits/${iconName}.png`;
/* ==========================================================================
EŞİK HESAPLAMA
========================================================================== */
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
/* ==========================================================================
TRAITS TOOLTIP ARAYÜZÜ OLUŞTURMA
========================================================================== */
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
/* ==========================================================================
   ŞAMPİYON TOOLTIP GENEL YAPISI
   ========================================================================== */
export function generateChampionTooltipHTML(champ) {

    const traitsHTML = champ.traits.map(t => {
        
        const safeIcon = safeLowercase(t)
            .replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m]))
            .replace(/[^a-z0-9]/g, '');

        return `
            <div class="ct-trait-item">
                <img src="img/traits/${safeIcon}.png" class="ct-trait-icon" onerror="this.style.display='none'">
                <span class="ct-trait-name">${t}</span>
            </div>`;
    }).join("");
/* ==========================================================================
    ŞAMPİYON TOOLTIP ARAYÜZÜ OLUŞTURMA
========================================================================== */
    return `
        <div class="ct-header">
            <span class="ct-name">${champ.name}</span>
            <div class="ct-cost border-cost-${champ.cost}">
                <img src="img/stats/gold.png" class="gold-icon" onerror="this.style.display='none'"> 
                ${champ.cost}
            </div>
        </div>
        <div class="ct-traits-list">${traitsHTML}</div>`;
}
/* ==========================================================================
   EŞYA TOOLTIP GENEL YAPISI
========================================================================== */
export function generateItemTooltipHTML(item) {
    // Bileşenler (Components) - Doğrudan img/items/ klasöründen PNG olarak çeker
    const componentsHTML = item.components ? `
        <div class="item-recipe-group">
            <img src="img/items/${item.components[0]}.png" class="recipe-icon" onerror="this.src='img/items/default.png'">
            <span class="recipe-plus">+</span>
            <img src="img/items/${item.components[1]}.png" class="recipe-icon" onerror="this.src='img/items/default.png'">
        </div>
    ` : '';

    // Statlar - parseStatIcons fonksiyonu ile PNG/SVG kontrolü yapar
    const statsHTML = item.stats ? item.stats.map(s => `
        <div class="tooltip-stat">
            ${parseStatIcons(s.icon)} <span>${s.value}</span>
        </div>
    `).join('') : '';

    return `
        <div class="item-tooltip-top-section">
            <div class="item-header-left">
                <div class="item-tooltip-title">${item.name}</div>
                <div class="item-tooltip-stats-row">${statsHTML}</div>
            </div>
            <div class="item-header-right">
                ${componentsHTML}
            </div>
        </div>
        <div class="item-tooltip-body">
            ${parseStatIcons(item.desc)}
        </div>
    `;
}