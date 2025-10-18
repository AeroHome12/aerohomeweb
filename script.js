// ================================
//  MOBILE + ORIENTATION DETECTION
// ================================
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Enhanced orientation handling with reload on portrait return
let isLandscape = false;
let orientationTimeout = null;

function checkOrientation() {
  if (!isMobile()) return;

  const currentIsLandscape = window.innerWidth > window.innerHeight;
  let overlay = document.getElementById("orientation-overlay");

  // Create overlay once
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "orientation-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #fff;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 1.2rem;
      z-index: 9999;
      padding: 1em;
    `;
    overlay.textContent =
      "Please rotate your device to portrait mode for the best experience.";
    document.body.appendChild(overlay);
  }

  // Handle orientation changes
  if (currentIsLandscape) {
    // Device is in landscape mode - show overlay and hide promo popup
    if (!isLandscape) {
      isLandscape = true;
      overlay.style.display = "flex";
      
      // Hide promo popup in landscape mode
      const promoPopup = document.getElementById("promo-popup");
      if (promoPopup) {
        promoPopup.classList.add("hidden");
      }
      
      console.log("Device rotated to landscape mode - showing overlay, hiding promo");
    }
  } else {
    // Device is in portrait mode - hide overlay and reload if coming from landscape
    if (isLandscape) {
      isLandscape = false;
      overlay.style.display = "none";
      console.log("Device returned to portrait mode - reloading page");
      
      // Clear any existing timeout
      if (orientationTimeout) {
        clearTimeout(orientationTimeout);
      }
      
      // Reload the page after a short delay to ensure smooth transition
      orientationTimeout = setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // Already in portrait mode - just hide overlay
      overlay.style.display = "none";
    }
  }
}

// Placeholder for future media query handling
function detectMediaQuery() {
  // Example: console.log("Viewport width:", window.innerWidth);
}

// ================================
//  MAIN LOGIC
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const scrollPrompt = document.querySelector(".scroll-prompt");
  const ribbon = document.querySelector(".top-ribbon");
  const promoPopup = document.getElementById("promo-popup");
  const closeBtn = document.querySelector(".promo-popup .close-btn");
  const primaryBtn = document.querySelector(".promo-popup .btn-primary");
  const photoGallery = document.querySelector(".photo-gallery");

  let lastScrollY = window.scrollY;

  // === Scroll prompt visibility ===
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (scrollPrompt) scrollPrompt.classList.toggle("hidden", currentScrollY > 10);
    // Optional ribbon hide/show logic:
    /*
    if (ribbon) {
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50;
      ribbon.classList.toggle("hide", scrollingDown);
      lastScrollY = currentScrollY;
    }
    */
  });

  // === Promo popup ===
  if (promoPopup) {
    // Only show promo popup if not in landscape mode
    const shouldShowPromo = () => {
      if (isMobile()) {
        return window.innerWidth <= window.innerHeight; // Only show in portrait
      }
      return true; // Always show on desktop
    };

    if (shouldShowPromo()) {
      promoPopup.classList.remove("hidden");
    }
    
    const hidePopup = () => promoPopup.classList.add("hidden");
    closeBtn?.addEventListener("click", hidePopup);
    primaryBtn?.addEventListener("click", hidePopup);
  }

  // === Lazy loading for gallery images ===
  const lazyImages = document.querySelectorAll('.lazy-load');
  
  if (lazyImages.length > 0) {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      });

      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers - load all images immediately
      lazyImages.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          img.removeAttribute('data-src');
        }
      });
    }
  }

  // === Gallery auto-scroll ===
  if (photoGallery) {
    let direction = 1;
    let lastTime = 0;
    const baseSpeed = 0.3; // pixels per ms
    const speedMultiplier = window.innerWidth > 2000 ? 2 : 1;

    function isVisible(el) {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }

    function autoScrollGallery(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = Math.min(timestamp - lastTime, 50); // Clamp to prevent jumps
      lastTime = timestamp;

      if (isVisible(photoGallery)) {
        const scrollSpeed = baseSpeed * speedMultiplier * deltaTime;
        photoGallery.scrollLeft += scrollSpeed * direction;

        const maxScrollLeft = photoGallery.scrollWidth - photoGallery.clientWidth;
        if (photoGallery.scrollLeft >= maxScrollLeft - 1) direction = -1;
        if (photoGallery.scrollLeft <= 0) direction = 1;
      }

      requestAnimationFrame(autoScrollGallery);
    }

    requestAnimationFrame(autoScrollGallery);
  }

  // === On load ===
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    setTimeout(() => window.scrollTo({ top: 0 }), 50);
    checkOrientation();
  });

  // === On resize/orientation change ===
  ["resize", "orientationchange"].forEach((event) => {
    window.addEventListener(event, () => {
      checkOrientation();
      detectMediaQuery();
    });
  });

  // === Cleanup on page unload ===
  window.addEventListener("beforeunload", () => {
    if (orientationTimeout) {
      clearTimeout(orientationTimeout);
    }
  });

  // Initial check
  detectMediaQuery();
  checkOrientation();
});