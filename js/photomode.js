/* ============================================================================
   FOTOĞRAF MODU
   ============================================================================ */

let currentZoom = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.1;
const PHOTO_MODE_ZOOM = 1.5;
let isPhotoMode = false;
let photoModeTooltip = null;

/* ============================================================================
   BAŞLATMA
   ============================================================================ */

export function initPhotoMode() {
    const body = document.body;
    const photoModeBtn = document.getElementById("photo-mode-btn");
    
    if (!photoModeBtn) {
        console.error("Photo mode butonu bulunamadı!");
        return;
    }
    
    createPhotoModeTooltip(photoModeBtn);
    setupPhotoModeButton(photoModeBtn, body);
    setupKeyboardControls(body);
    setupMouseWheel(body);
    setupFullscreenListener(body);
}

/* ============================================================================
   FOTOĞRAF MODU BUTONU
   ============================================================================ */

function setupPhotoModeButton(btn, body) {
    btn.addEventListener("click", async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
            
            currentZoom = PHOTO_MODE_ZOOM;
            isPhotoMode = true;
            body.classList.add("photo-mode");
            applyZoom(body);
            
        } catch (err) {
            console.log("Fullscreen hatası:", err);
            currentZoom = PHOTO_MODE_ZOOM;
            isPhotoMode = true;
            body.classList.add("photo-mode");
            applyZoom(body);
        }
    });
}

/* ============================================================================
   ZOOM UYGULAMA
   ============================================================================ */

function applyZoom(body) {
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

/* ============================================================================
   KLAVYE KONTROLLERI
   ============================================================================ */

function setupKeyboardControls(body) {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isPhotoMode) {
            currentZoom = 1;
            applyZoom(body);
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    });
    
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
            if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
                applyZoom(body);
            } else if (e.key === "-" || e.key === "_") {
                e.preventDefault();
                currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
                
                if (currentZoom === 1 && isPhotoMode) {
                    isPhotoMode = false;
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                }
                
                applyZoom(body);
            } else if (e.key === "0") {
                e.preventDefault();
                currentZoom = 1;
                
                if (isPhotoMode) {
                    isPhotoMode = false;
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                }
                
                applyZoom(body);
            }
        }
    });
}

/* ============================================================================
   MOUSE TEKERLEK ZOOM
   ============================================================================ */

function setupMouseWheel(body) {
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
            
            applyZoom(body);
        }
    }, { passive: false });
}

/* ============================================================================
   FULLSCREEN DEĞİŞİMİ
   ============================================================================ */

function setupFullscreenListener(body) {
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && isPhotoMode) {
            currentZoom = 1;
            applyZoom(body);
        }
    });
}

/* ============================================================================
   TOOLTIP OLUŞTURMA
   ============================================================================ */

function createPhotoModeTooltip(btnElement) {
    photoModeTooltip = document.createElement("div");
    photoModeTooltip.className = "photo-mode-tooltip";
    photoModeTooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="tooltip-icon">📸</span>
            <strong>Fotoğraf Modu</strong>
        </div>
        <div class="tooltip-content">
            <p>Takımını Tam Ekranda Görüntüle</p>
            <div class="tooltip-shortcuts">
                <div class="shortcut-item">
                    <kbd>ESC</kbd>
                    <span>Çıkış</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Ctrl</kbd> + <kbd>Scroll</kbd>
                    <span>Yakınlaştır/Uzaklaştır</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(photoModeTooltip);
    
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

/* ============================================================================
   TOOLTIP GÖSTER/GİZLE
   ============================================================================ */

function showPhotoModeTooltip(btnElement) {
    if (!photoModeTooltip) return;
    
    const btnRect = btnElement.getBoundingClientRect();
    
    photoModeTooltip.style.top = `${btnRect.bottom + 10}px`;
    photoModeTooltip.style.left = `${btnRect.left + btnRect.width / 2}px`;
    photoModeTooltip.style.transform = "translateX(-50%)";
    
    photoModeTooltip.classList.add("visible");
}

function hidePhotoModeTooltip() {
    if (!photoModeTooltip) return;
    photoModeTooltip.classList.remove("visible");
}