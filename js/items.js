/* ============================================================================
   EŞYA YÖNETİMİ
   ============================================================================ */

import { safeLowercase } from './utils.js';

export let allItemsMap = new Map();
let itemCategories = {};
let currentItemSearchTerm = "";
let itemsContainerEl = null;

/* ============================================================================
   BAŞLATMA
   ============================================================================ */

export async function initItems() {
    try {
        const response = await fetch('./itemdata.json');
        if (!response.ok) throw new Error("itemdata.json yüklenemedi!");
        
        itemCategories = await response.json();
        buildItemMap();
        
        itemsContainerEl = document.getElementById('items-container');
        
        setupTabs();
        setupSearch();
        
        renderCategory('normal');
        
        console.log("Eşya sistemi başarıyla yüklendi.");
    } catch (error) {
        console.error("Eşya yükleme hatası:", error);
    }
}

/* ============================================================================
   EŞYA MAP OLUŞTURMA
   ============================================================================ */

function buildItemMap() {
    allItemsMap.clear();
    for (const cat in itemCategories) {
        itemCategories[cat].items.forEach(item => {
            allItemsMap.set(item.id, { ...item, categoryKey: cat });
        });
    }
}

/* ============================================================================
   TAB SİSTEMİ
   ============================================================================ */

function setupTabs() {
    const tabs = document.querySelectorAll('.item-tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const categoryKey = btn.getAttribute('data-cat');
            renderCategory(categoryKey);
        });
    });
}

/* ============================================================================
   ARAMA SİSTEMİ
   ============================================================================ */

function setupSearch() {
    const searchInput = document.getElementById("item-search");
    const clearBtn = document.getElementById("clear-item-search");
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            handleItemSearch(e.target.value);
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            handleItemSearch("");
            if (searchInput) searchInput.focus();
        });
    }
}

export function handleItemSearch(term) {
    currentItemSearchTerm = safeLowercase(term);
    
    const clearBtn = document.getElementById('clear-item-search');
    if (clearBtn) {
        clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    }

    if (currentItemSearchTerm.length > 0) {
        renderSearchResults();
    } else {
        const activeTab = document.querySelector('.item-tab-btn.active');
        renderCategory(activeTab ? activeTab.getAttribute('data-cat') : 'normal');
    }
}

/* ============================================================================
   KATEGORİ RENDER
   ============================================================================ */

export function renderCategory(catKey) {
    if (!itemsContainerEl) return;

    const category = itemCategories[catKey];
    if (!category) return;

    const itemsHTML = category.items.map(item => {
        const extension = (catKey === 'base' || catKey === 'component') ? 'png' : 'avif';
        
        return `
            <div class="item-card" data-id="${item.id}" data-name="${safeLowercase(item.name)}">
                <div class="item-icon-wrapper">
                    <img src="img/items/${item.id}.${extension}" 
                         alt="${item.name}" 
                         onerror="this.onerror=null; this.src='img/items/default.png';">
                </div>
            </div>
        `;
    }).join('');

    itemsContainerEl.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;
    applyItemFilter();
}

/* ============================================================================
   ARAMA SONUÇLARI RENDER
   ============================================================================ */

function renderSearchResults() {
    if (!itemsContainerEl) return;

    const results = [];
    allItemsMap.forEach(item => {
        if (safeLowercase(item.name).includes(currentItemSearchTerm)) {
            results.push(item);
        }
    });

    const itemsHTML = results.map(item => {
        const extension = (item.categoryKey === 'base' || item.categoryKey === 'component') ? 'png' : 'avif';
        return `
            <div class="item-card" data-id="${item.id}" data-name="${safeLowercase(item.name)}">
                <div class="item-icon-wrapper">
                    <img src="img/items/${item.id}.${extension}" alt="${item.name}" onerror="this.src='img/items/default.png'">
                </div>
            </div>
        `;
    }).join('');

    itemsContainerEl.innerHTML = results.length > 0 
        ? `<div class="items-grid">${itemsHTML}</div>` 
        : `<div class="no-results">Eşya bulunamadı.</div>`;
}

/* ============================================================================
   FİLTRE UYGULAMA
   ============================================================================ */

function applyItemFilter() {
    const cards = document.querySelectorAll('.item-card');
    cards.forEach(card => {
        const itemName = card.getAttribute('data-name') || "";
        card.style.display = itemName.includes(currentItemSearchTerm) ? 'block' : 'none';
    });
}