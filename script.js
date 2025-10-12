// ================================
//  MOBILE + ORIENTATION DETECTION
// ================================
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Show/hide portrait orientation overlay on mobile
function checkOrientation() {
  if (!isMobile()) return;

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

  // Toggle visibility based on orientation
  overlay.style.display = window.innerWidth > window.innerHeight ? "flex" : "none";
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
    promoPopup.classList.remove("hidden");
    const hidePopup = () => promoPopup.classList.add("hidden");
    closeBtn?.addEventListener("click", hidePopup);
    primaryBtn?.addEventListener("click", hidePopup);
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

  // Initial check
  detectMediaQuery();
  checkOrientation();
});