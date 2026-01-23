// photo-mode.js - Fotoğraf Modu ve Tooltip Yönetimi

let currentZoom = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.1;
const PHOTO_MODE_ZOOM = 1.5;
let isPhotoMode = false;

// Tooltip elementi
let photoModeTooltip = null;

export function initPhotoMode() {
    const body = document.body;
    const photoModeBtn = document.getElementById("photo-mode-btn");
    
    if (!photoModeBtn) return;
    
    // Tooltip oluştur
    createPhotoModeTooltip(photoModeBtn);
    
    function applyZoom() {
        if (currentZoom === 1) {
            body.classList.remove("zooming");
            body.classList.remove("photo-mode");
            body.style.transform = "scale(1)";
            isPhotoMode = false;
        } else {
            body.classList.add("zooming");
            body.style.transform = `scale(${currentZoom})`;
        }
    }
    
    // Fotoğraf Modu Butonu
    photoModeBtn.addEventListener("click", async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
            
            currentZoom = PHOTO_MODE_ZOOM;
            isPhotoMode = true;
            body.classList.add("photo-mode");
            applyZoom();
            
        } catch (err) {
            console.log("Fullscreen hatası:", err);
            currentZoom = PHOTO_MODE_ZOOM;
            isPhotoMode = true;
            body.classList.add("photo-mode");
            applyZoom();
        }
    });
    
    // Fullscreen değişikliği
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && isPhotoMode) {
            currentZoom = 1;
            applyZoom();
        }
    });
    
    // ESC tuşu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isPhotoMode) {
            currentZoom = 1;
            applyZoom();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    });
    
    // Ctrl + Scroll
    window.addEventListener("wheel", (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, currentZoom + delta));
            
            if (currentZoom === 1 && isPhotoMode) {
                isPhotoMode = false;
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
            
            applyZoom();
        }
    }, { passive: false });
    
    // Ctrl + (+, -, 0)
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
            if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
                applyZoom();
            } else if (e.key === "-" || e.key === "_") {
                e.preventDefault();
                currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
                
                if (currentZoom === 1 && isPhotoMode) {
                    isPhotoMode = false;
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                }
                
                applyZoom();
            } else if (e.key === "0") {
                e.preventDefault();
                currentZoom = 1;
                
                if (isPhotoMode) {
                    isPhotoMode = false;
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                }
                
                applyZoom();
            }
        }
    });
}

// Tooltip oluştur ve yönet
function createPhotoModeTooltip(btnElement) {
    // Tooltip elementi oluştur
    photoModeTooltip = document.createElement("div");
    photoModeTooltip.className = "photo-mode-tooltip";
    photoModeTooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="tooltip-icon">📸</span>
            <strong>Fotoğraf Modu</strong>
        </div>
        <div class="tooltip-content">
            <p>Takım ızgaranızı tam ekranda, büyütülmüş olarak görüntüleyin.</p>
            <div class="tooltip-shortcuts">
                <div class="shortcut-item">
                    <kbd>ESC</kbd>
                    <span>Çıkış</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Ctrl</kbd> + <kbd>Scroll</kbd>
                    <span>Yakınlaştır/Uzaklaştır</span>
                </div>
                <div class="shortcut-item">
                    <kbd>F11</kbd>
                    <span>Tam Ekran</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(photoModeTooltip);
    
    // Tooltip göster/gizle
    btnElement.addEventListener("mouseenter", (e) => {
        showPhotoModeTooltip(e.target);
    });
    
    btnElement.addEventListener("mouseleave", () => {
        hidePhotoModeTooltip();
    });
    
    btnElement.addEventListener("click", () => {
        hidePhotoModeTooltip();
    });
}

function showPhotoModeTooltip(btnElement) {
    if (!photoModeTooltip) return;
    
    const btnRect = btnElement.getBoundingClientRect();
    
    // Tooltip pozisyonunu ayarla (butonun altında)
    photoModeTooltip.style.top = `${btnRect.bottom + 10}px`;
    photoModeTooltip.style.left = `${btnRect.left + btnRect.width / 2}px`;
    photoModeTooltip.style.transform = "translateX(-50%)";
    
    // Göster
    photoModeTooltip.classList.add("visible");
}

function hidePhotoModeTooltip() {
    if (!photoModeTooltip) return;
    photoModeTooltip.classList.remove("visible");
}
