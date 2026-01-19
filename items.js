import { itemCategories } from './itemdata.js';

export function initItems() {
    const tabs = document.querySelectorAll('.item-tab-btn');
    const container = document.getElementById('items-container');

    if (!tabs.length || !container) return;

    // İlk açılışta 'normal' kategorisini göster
    renderCategory('normal');

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif buton görselini güncelle
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            // Kategoriyi değiştir
            const categoryKey = btn.getAttribute('data-cat');
            renderCategory(categoryKey);
        });
    });
}

/**
 * Belirli bir kategorideki eşyaları ekrana basar
 */
function renderCategory(key) {
    const container = document.getElementById('items-container');
    const category = itemCategories[key];

    if (!category) {
        container.innerHTML = `<div style="padding:10px; opacity:0.5;">Bu kategori henüz boş.</div>`;
        return;
    }

    // Grid yapısını ve eşyaları oluştur
    container.innerHTML = `
        <div class="items-grid">
            ${category.items.map(item => `
                <div class="item-card" data-id="${item.id}" title="${item.name}">
                    <div class="item-icon-wrapper">
                        <img src="img/items/${item.id}.avif" 
                             alt="${item.name}" 
                             onerror="this.src='img/items/default.png'">
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}