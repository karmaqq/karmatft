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
    const searchInput = document.getElementById('champ-search'); // Sağ paneldeki arama kutusu

    // 1. Kategori butonları için dinleyici
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            const categoryKey = btn.getAttribute('data-cat');
            // Butona basıldığında, o an arama kutusunda ne yazıyorsa ona göre filtrele
            const currentSearch = searchInput ? searchInput.value : "";
            renderCategory(categoryKey, currentSearch);
        });
    });

    // 2. Arama kutusuna yazı yazıldığında eşyaları da tetikle
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeTab = document.querySelector('.item-tab-btn.active');
            const categoryKey = activeTab ? activeTab.getAttribute('data-cat') : 'normal';
            renderCategory(categoryKey, e.target.value);
        });
    }

    renderCategory('normal');
}

export function renderCategory(key, searchTerm = "") {
    const container = document.getElementById('items-container');
    if (!container) return;

    const category = itemCategories[key];
    const term = searchTerm.toLowerCase().trim();

    if (!category) return;

    // Filtreleme mantığı: Arama boşsa hepsini, doluysa sadece uyuşanları göster
    const filteredItems = category.items.filter(item => {
        if (!term) return true;
        return item.name.toLowerCase().includes(term) || item.id.toLowerCase().includes(term);
    });

    const itemsHTML = filteredItems.map(item => `
        <div class="item-card" data-id="${item.id}" title="${item.name}">
            <div class="item-icon-wrapper">
                <img src="img/items/${item.id}.avif" alt="${item.name}" onerror="this.src='img/items/default.png'">
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;
}
