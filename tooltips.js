/* ==========================================================================
   1. YARDIMCI VE GÜVENLİK FONKSİYONLARI
   ========================================================================== */
export function safeLowercase(str) {
    if (!str) return "";
    return str
        .replace(/İ/g, "i")
        .replace(/I/g, "i")
        .toLowerCase()
        .replace(/ı/g, "i");
}

export function parseStatIcons(text) {
    if (!text) return "";
    
    // Riot Games Community Dragon (CDragon) CDN Base URL
    const riotAssetBase = "https://raw.communitydragon.org/latest/game/assets/ux/tft/stats/";

    return text.replace(/\[([^\]]+)\]/g, (match, iconName) => {
        const name = iconName.toLowerCase().trim();
        
        // Önce yerel dosyayı dene, hata verirse Riot CDN'e git
        return `<img src="img/stats/${name}.svg" 
                     class="stat-icon-img" 
                     alt="${name}"
                     onerror="this.onerror=null; this.src='${riotAssetBase}${name}.png';">`;
    });
}

/* ==========================================================================
   2. AKILLI KONUMLANDIRMA MOTORU (CONTEXT DUYARLI)
   ========================================================================== */
export function applySmartPosition(el, anchorRect, context = "trait") {
    if (!anchorRect) return;
    const padding = 15;
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    // Boyutları doğru ölçmek için geçici olarak görünür yap
    el.style.display = "block";
    const tWidth = el.offsetWidth;
    const tHeight = el.offsetHeight;

    let left, top;

    if (context === "champion") {
        // ŞAMPİYON HAVUZU: Önce SOL (Görsel alan açmak için)
        left = anchorRect.left - tWidth - padding;
        if (left < 10) left = anchorRect.right + padding;

        // Dikey: Alt yarıdaysa yukarı, üst yarıdaysa aşağı doğru açıl
        top = (anchorRect.top > viewHeight / 2) 
            ? anchorRect.bottom - tHeight + scrollY 
            : anchorRect.top + scrollY;
    } 
    else if (context === "team") {
        // TAKIM GRID: Sadece Alt (Sağ-Sol-Üst Yasak)
        left = anchorRect.left + (anchorRect.width / 2) - (tWidth / 2);
        top = anchorRect.bottom + padding + scrollY;
    } 
    else if (context === "trait") {
        // ÖZELLİKLER (Sol Panel): Sağda Sabit, Akıllı Dikey Hizalama
        left = anchorRect.right + padding;
        if (anchorRect.top < 200) {
            top = anchorRect.top + scrollY;
        } else if (anchorRect.bottom > viewHeight - 200) {
            top = anchorRect.bottom - tHeight + scrollY;
        } else {
            top = anchorRect.top + (anchorRect.height / 2) - (tHeight / 2) + scrollY;
        }
    } 
    else if (context === "item") {
        // EŞYALAR: Üstte Ortalı
        left = anchorRect.left + (anchorRect.width / 2) - (tWidth / 2);
        top = anchorRect.top - tHeight - padding + scrollY;
    }

    // --- GLOBAL TAŞMA KONTROLLERİ ---
    if (left < 10) left = 10;
    if (left + tWidth > viewWidth - 10) left = viewWidth - tWidth - 10;
    if (top < scrollY + 10) top = scrollY + 10;
    if (top + tHeight > viewHeight + scrollY - 10) top = viewHeight + scrollY - tHeight - 10;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
}

/* ==========================================================================
   3. TRAIT TOOLTIP ÜRETİCİ
   ========================================================================== */
export function generateTraitTooltipHTML(data) {
    const { traitName, count, steps, traitData } = data;
    
    const iconName = traitName.toLowerCase()
        .replace(/[ğüşıöç]/g, m => ({ğ:'g',ü:'u',ş:'s',ı:'i',ö:'o',ç:'c'}[m]))
        .replace(/[^a-z0-9]/g, '');

    const finalIconPath = `img/traits/${iconName}.png`;
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
   4. ŞAMPİYON TOOLTIP ÜRETİCİ
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
   5. EŞYA TOOLTIP ÜRETİCİ
   ========================================================================== */
export function generateItemTooltipHTML(item) {
    const componentsHTML = (item.components && item.components.length > 0) ? `
        <div class="item-recipe-group">
            <img src="img/items/${item.components[0]}.png" class="recipe-icon" onerror="this.src='img/items/default.png'">
            <span class="recipe-plus">+</span>
            <img src="img/items/${item.components[1]}.png" class="recipe-icon" onerror="this.src='img/items/default.png'">
        </div>
    ` : `
        <div class="item-non-craftable">Üretilemez</div>
    `;

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
            <div class="item-header-right">${componentsHTML}</div>
        </div>
        <div class="item-tooltip-body">
            ${parseStatIcons(item.desc)}
        </div>`;
}