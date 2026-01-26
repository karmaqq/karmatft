/* ============================================================================
   YARDIMCI FONKSİYONLAR
   ============================================================================ */

export function safeLowercase(text) {
    if (!text) return "";
    return text.toString()
        .toLowerCase()
        .trim()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, "");
}

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

export function applySmartPosition(el, anchorRect, context = "trait") {
    if (!anchorRect) return;
    
    const padding = 15;
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    el.style.display = "block";
    const tWidth = el.offsetWidth;
    const tHeight = el.offsetHeight;

    let left, top;

    if (context === "champion") {
        left = anchorRect.left - tWidth - padding;
        if (left < 10) left = anchorRect.right + padding;
        top = (anchorRect.top > viewHeight / 2) 
            ? anchorRect.bottom - tHeight + scrollY 
            : anchorRect.top + scrollY;
    } 
    else if (context === "team") {
        left = anchorRect.left + (anchorRect.width / 2) - (tWidth / 2);
        top = anchorRect.bottom + padding + scrollY;
    } 
    else if (context === "trait") {
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
        left = anchorRect.left + (anchorRect.width / 2) - (tWidth / 2);
        top = anchorRect.top - tHeight - padding + scrollY;
    }

    if (left < 10) left = 10;
    if (left + tWidth > viewWidth - 10) left = viewWidth - tWidth - 10;
    if (top < scrollY + 10) top = scrollY + 10;
    if (top + tHeight > viewHeight + scrollY - 10) top = viewHeight + scrollY - tHeight - 10;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
}


const jsonCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export async function loadJSON(path) {
    try {
        const cached = jsonCache.get(path);
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        const response = await fetch(path, {
            cache: 'default',
            headers: {
                'Cache-Control': 'max-age=300'
            }
        });

        if (!response.ok) {
            throw new Error(`${path} yüklenemedi! (${response.status})`);
        }

        const data = await response.json();

        jsonCache.set(path, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    } catch (error) {
        console.error(`JSON yükleme hatası (${path}):`, error);
        return null;
    }
}