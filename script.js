// Detect screen width and apply media-specific logic
function detectMediaQuery() {
  const width = window.innerWidth;

  if (width >= 1281) {
    return "min-1281px";
  } else if (width >= 1025) {
    return "1025-1280px";
  } else if (width >= 768) {
    return "768-1024";
  } else if (width >= 380 && width <= 420) {
    const heroTitle = document.querySelector('.hero .text-container h1');
    if (heroTitle) {
      heroTitle.textContent = "LANDSCAPING RENOVATION INSTALLATIONS";
    }
    return "380-420px";
  } else {
    return "other";
  }
}

// Basic mobile user agent check
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Prompt portrait orientation on mobile landscape
function checkOrientation() {
  if (isMobile() && window.innerWidth > window.innerHeight) {
    document.body.innerHTML = "Please rotate your device to portrait mode for the best experience.";
  }
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const scrollPrompt = document.querySelector(".scroll-prompt");
  const ribbon = document.querySelector(".top-ribbon");
  let lastScrollY = window.scrollY;

  // Show/hide scroll prompt
  if (scrollPrompt) {
    window.addEventListener("scroll", () => {
      scrollPrompt.classList.toggle("hidden", window.scrollY > 10);
    });
  }

  // Show/hide top ribbon on scroll
  if (ribbon) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      ribbon.classList.toggle("hide", currentScrollY > lastScrollY && currentScrollY > 50);
      lastScrollY = currentScrollY;
    });
  }

  // Show promo popup on page load (remove 'hidden' class)
  const promoPopup = document.getElementById("promo-popup");
  const closeBtn = document.querySelector(".promo-popup .close-btn");
  const primaryBtn = document.querySelector(".promo-popup .btn-primary");
  if (promoPopup) {
    promoPopup.classList.remove("hidden");
  }

  // Hide promo popup on close button click (add 'hidden' class)
  if (primaryBtn && closeBtn && promoPopup) {
    closeBtn.addEventListener("click", () => {
      promoPopup.classList.add("hidden");
    });

    primaryBtn.addEventListener("click", () => {
      promoPopup.classList.add("hidden");
    });
  }

  // Initialize AOS animation library
  AOS.init({
    duration: 2100,
    once: false,
  });

  // Run media query detection once
  detectMediaQuery();
});

// Page fully loaded
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Scroll to top shortly after load
  setTimeout(() => window.scrollTo({ top: 0 }), 50);

  // Check device orientation on load
  checkOrientation();
});

// Re-check orientation on resize and orientation change
["resize", "orientationchange"].forEach(evt =>
  window.addEventListener(evt, checkOrientation)
);