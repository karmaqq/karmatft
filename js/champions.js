/* ============================================================================
   ŞAMPİYON YÖNETİMİ
   ============================================================================ */

import { safeLowercase } from './utils.js';

let championsData = [];
let championsGridEl = null;
let currentViewMode = "all";
let currentSearchTerm = "";

/* ============================================================================
   BAŞLATMA
   ============================================================================ */

export function initChampions(champions) {
    championsData = champions;
    championsGridEl = document.getElementById("champions-grid");
    
    if (!championsGridEl) {
        console.error("Champions grid elementi bulunamadı!");
        return;
    }
    
    setupViewToggle();
    setupSearch();
}

/* ============================================================================
   GÖRÜNÜM DEĞİŞTİRME (ALL / COST)
   ============================================================================ */

function setupViewToggle() {
    const toggleBtn = document.getElementById("toggle-pool-view");
    if (!toggleBtn) return;
    
    toggleBtn.onclick = (e) => {
        if (currentViewMode === "all") {
            currentViewMode = "cost";
            e.target.textContent = "Hepsini Göster";
        } else {
            currentViewMode = "all";
            e.target.textContent = "Maliyete Göre Sıralı";
        }
        renderChampionPool();
    };
}

/* ============================================================================
   ARAMA SİSTEMİ
   ============================================================================ */

function setupSearch() {
    const searchInput = document.getElementById("champ-search");
    const clearBtn = document.getElementById("clear-champ-search");
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            handleChampSearch(e.target.value);
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            handleChampSearch("");
            if (searchInput) searchInput.focus();
        });
    }
}

export function handleChampSearch(term) {
    currentSearchTerm = safeLowercase(term);
    
    const clearBtn = document.getElementById('clear-champ-search');
    if (clearBtn) {
        clearBtn.style.display = term.length > 0 ? 'block' : 'none';
    }
    
    applyChampFilter();
}

function applyChampFilter() {
    const cards = document.querySelectorAll('.champ-item');
    cards.forEach(card => {
        const name = safeLowercase(card.getAttribute('data-name') || "");
        const traits = card.getAttribute('data-traits') || "";
        
        const isNameMatch = name.includes(currentSearchTerm);
        const isTraitMatch = traits.includes(currentSearchTerm);

        if (isNameMatch || isTraitMatch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ============================================================================
   ŞAMPİYON HAVUZU RENDER
   ============================================================================ */

export function renderChampionPool(selectedChamps = [], onChampClick = null) {
    if (!championsGridEl) return;
    
    championsGridEl.innerHTML = "";
    let displayChamps = [...championsData];

    displayChamps.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

    if (currentViewMode === "cost") {
        let lastCost = null;
        displayChamps.forEach(c => {
            if (lastCost !== c.cost) {
                const divider = document.createElement("div");
                divider.className = `pool-divider cost-divider-${c.cost}`;
                divider.innerHTML = `<span>${c.cost} Altın</span>`;
                championsGridEl.appendChild(divider);
            }
            lastCost = c.cost;

            const el = createChampElement(c, onChampClick);
            if (selectedChamps.some(sc => sc.name === c.name)) {
                el.classList.add("selected");
            }
            championsGridEl.appendChild(el);
        });
    } else {
        displayChamps.forEach(c => {
            const el = createChampElement(c, onChampClick);
            if (selectedChamps.some(sc => sc.name === c.name)) {
                el.classList.add("selected");
            }
            championsGridEl.appendChild(el);
        });
    }
    
    applyChampFilter();
}

/* ============================================================================
   ŞAMPİYON ELEMENT OLUŞTURMA
   ============================================================================ */

function createChampElement(champ, onChampClick = null) {
    const div = document.createElement("div");
    div.className = `champ-item cost-${champ.cost}`;

    const img = document.createElement("img");
    img.src = champ.img;
    img.onerror = () => img.src = 'img/profiles/default.png';
    div.appendChild(img);

    if (champ.isLocked) {
        const lockIcon = document.createElement("div");
        lockIcon.className = "permanent-lock";
        div.appendChild(lockIcon);
    }

    div.setAttribute("data-name", champ.name);
    div.setAttribute("data-traits", champ.traits.map(t => safeLowercase(t)).join(','));

    if (onChampClick) {
        div.onclick = (e) => {
            e.stopPropagation();
            onChampClick(champ);
        };
    }

    div.setAttribute("draggable", "true");
    div.ondragstart = (e) => {
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", champ.name);
        e.dataTransfer.setData("origin-slot", "");
    };

    div.ondragend = () => div.classList.remove("dragging");

    return div;
}

/* ============================================================================
   SEÇİLİ ŞAMPİYONLARI GÜNCELLEME
   ============================================================================ */

export function updateSelectedChampions(selectedChamps) {
    document.querySelectorAll(".champ-item").forEach(el => {
        const champName = el.getAttribute("data-name");
        const isSelected = selectedChamps.some(c => c.name === champName);
        
        el.classList.toggle("selected", isSelected);
    });
}

/* ============================================================================
   GETTER
   ============================================================================ */

export function getChampionsData() {
    return championsData;
}