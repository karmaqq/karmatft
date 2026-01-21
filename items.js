import { itemCategories } from './itemdata.js';

export const allItemsMap = new Map();

function buildItemMap() {
    if (allItemsMap.size > 0) return;
    for (const cat in itemCategories) {
        itemCategories[cat].items.forEach(item => {
            allItemsMap.set(item.id, { ...item, category: cat });
        });
    }
}

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
    renderCategory('normal');
}

export function renderCategory(catKey) {
    const container = document.getElementById('items-container');
    if (!container) return;

    const category = itemCategories[catKey];
    if (!category) return;

    const itemsHTML = category.items.map(item => `
        <div class="item-card" data-id="${item.id}" data-name="${item.name.toLowerCase()}">
            <div class="item-icon-wrapper">
                <img src="img/items/${item.id}.avif" alt="${item.name}" onerror="this.src='img/items/default.png'">
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;

    if (window.refreshSearch) window.refreshSearch();
}