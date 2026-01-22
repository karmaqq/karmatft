import { itemCategories } from './itemdata.js';
import { safeLowercase } from './tooltips.js'; 

export const allItemsMap = new Map();
let currentItemSearchTerm = ""; // Global arama terimi hafızası

/**
 * Tüm eşyaları hızlı erişim için bir Map objesine yükler
 */
function buildItemMap() {
    if (allItemsMap.size > 0) return;
    for (const cat in itemCategories) {
        itemCategories[cat].items.forEach(item => {
            allItemsMap.set(item.id, { ...item, category: cat });
        });
    }
}

/**
 * Eşya panelini ve sekmelerini başlatır
 */
export function initItems() {
    buildItemMap();
    const tabs = document.querySelectorAll('.item-tab-btn');

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const categoryKey = btn.getAttribute('data-cat');
            renderCategory(categoryKey);
        });
    });
    
    // Varsayılan olarak normal eşyaları göster
    renderCategory('normal');
}

/**
 * Belirli bir kategorideki eşyaları ekrana basar
 */
export function renderCategory(catKey) {
    const container = document.getElementById('items-container');
    if (!container) return;

    const category = itemCategories[catKey];
    if (!category) return;

    const itemsHTML = category.items.map(item => `
        <div class="item-card" data-id="${item.id}" data-name="${safeLowercase(item.name)}">
            <div class="item-icon-wrapper">
                <img src="img/items/${item.id}.avif" alt="${item.name}" onerror="this.src='img/items/default.png'">
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;

    // Yeni kategoriye geçildiğinde, eğer arama kutusu doluysa filtreyi uygula
    applyItemFilter();
}

/**
 * Arama kutusuna yazıldığında tetiklenen ana fonksiyon
 */
export function handleItemSearch(term) {
    // Arama terimini güvenli küçük harfe çevir ve kaydet
    currentItemSearchTerm = safeLowercase(term);
    
    const clearBtn = document.getElementById('clear-item-search');
    
    // Arama kutusunda yazı varsa "X" temizleme butonunu göster
    if (clearBtn) {
        clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    }

    // Mevcut grid içindeki kartları filtrele
    applyItemFilter();
}

/**
 * Mevcut eşya kartlarını currentItemSearchTerm'e göre gizler veya gösterir
 */
function applyItemFilter() {
    const cards = document.querySelectorAll('.item-card');
    cards.forEach(card => {
        const itemName = card.getAttribute('data-name') || "";
        
        if (itemName.includes(currentItemSearchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}