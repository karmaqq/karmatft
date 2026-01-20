import { itemCategories } from './itemdata.js';

// Hafızada hızlı erişim için düz bir eşya haritası
export const allItemsMap = new Map();

function buildItemMap() {
    if (allItemsMap.size > 0) return;
    for (const cat in itemCategories) {
        itemCategories[cat].items.forEach(item => {
            // Veriyi koruyarak haritaya ekle
            allItemsMap.set(item.id, { ...item, category: cat });
        });
    }
}

export function initItems() {
    buildItemMap();
    const tabs = document.querySelectorAll('.item-tab-btn');
    const container = document.getElementById('items-container');

    if (!tabs.length || !container) return;

    // İlk açılış (Önceki halinde 'artifact' veya 'special' neyse o kalabilir)
    renderCategory('normal');

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const categoryKey = btn.getAttribute('data-cat');
            
            // Kategori değişince arama kutusundaki kelimeye göre filtreli render yap
            const searchTerm = document.getElementById('champ-search')?.value || "";
            renderCategory(categoryKey, searchTerm);
        });
    });

    // EVENT DELEGATION: Browser üzerindeki yükü kaldıran kısım
    container.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.item-card');
        if (!card) return;
        
        const currentTitle = card.getAttribute('title');
        if (currentTitle) {
            card.setAttribute('data-tmp-title', currentTitle);
            card.removeAttribute('title');
        }
    });

    container.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.item-card');
        if (!card) return;
        
        const tmpTitle = card.getAttribute('data-tmp-title');
        if (tmpTitle) {
            card.setAttribute('title', tmpTitle);
        }
    });
}

/**
 * Performanslı Render: Sadece gerekenleri, tek seferde çizer.
 */
export function renderCategory(key, searchTerm = "") {
    const container = document.getElementById('items-container');
    const category = itemCategories[key];
    const term = searchTerm.toLowerCase().trim();

    if (!category) {
        container.innerHTML = `<div style="padding:10px; opacity:0.5;">Bu kategori henüz boş.</div>`;
        return;
    }

    // 1. Önce Filtrele (Mantığı bozmadan: isim veya id üzerinden)
    const filteredItems = category.items.filter(item => {
        if (!term) return true;
        return item.name.toLowerCase().includes(term) || item.id.toLowerCase().includes(term);
    });

    // 2. HTML Hazırla (Eski görsel yapıyı birebir koruyoruz)
    const itemsHTML = filteredItems.map(item => `
        <div class="item-card" data-id="${item.id}" title="${item.name}">
            <div class="item-icon-wrapper">
                <img src="img/items/${item.id}.avif" 
                     alt="${item.name}" 
                     onerror="this.src='img/items/default.png'">
            </div>
        </div>
    `).join('');

    // 3. Tek seferde DOM'a bas (Render yükünü bitiren vuruş)
    container.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;
}