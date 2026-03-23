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
  let lastScrollY = window.scrollY;

  // === Hamburger menu ===
  const hamburger = document.querySelector('.hamburger-btn');
  const navButtons = document.querySelector('.ribbon-buttons');

  // === Scroll: hide nav on down, show on up ===
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (scrollPrompt) scrollPrompt.classList.toggle("hidden", currentScrollY > 10);
    if (ribbon) {
      const menuOpen = navButtons && navButtons.classList.contains('open');
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50;
      if (!menuOpen) ribbon.classList.toggle("hide", scrollingDown);
    }
    lastScrollY = currentScrollY;
  });
  if (hamburger && navButtons) {
    hamburger.addEventListener('click', () => {
      const isOpen = navButtons.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Close menu when any nav link is clicked
    navButtons.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navButtons.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.top-ribbon')) {
        navButtons.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  // === Promo popup ===
  const PROMO_KEY = "aerohome_promo_spring2026_seen";
  if (promoPopup) {
    // Only show if not already seen and not in landscape mode
    const shouldShowPromo = () => {
      if (localStorage.getItem(PROMO_KEY)) return false;
      if (isMobile()) return window.innerWidth <= window.innerHeight;
      return true;
    };

    if (shouldShowPromo()) {
      promoPopup.classList.remove("hidden");
    }

    const hidePopup = () => {
      promoPopup.classList.add("hidden");
      localStorage.setItem(PROMO_KEY, "1");
    };
    closeBtn?.addEventListener("click", hidePopup);
    primaryBtn?.addEventListener("click", hidePopup);
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