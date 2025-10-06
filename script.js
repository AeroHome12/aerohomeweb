// Basic mobile user agent check
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Prompt portrait orientation on mobile landscape
function checkOrientation() {
  if (isMobile() && window.innerWidth > window.innerHeight) {
    document.body.innerHTML =
      "Please rotate your device to portrait mode for the best experience.";
  }
}

// Detect media query placeholder (if you have logic)
function detectMediaQuery() {
  // Add your media query handling logic here if needed
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const scrollPrompt = document.querySelector(".scroll-prompt");
  const ribbon = document.querySelector(".top-ribbon");
  const promoPopup = document.getElementById("promo-popup");
  const closeBtn = document.querySelector(".promo-popup .close-btn");
  const primaryBtn = document.querySelector(".promo-popup .btn-primary");

  let lastScrollY = window.scrollY;

  // Scroll events (for scroll prompt)
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (scrollPrompt) {
      scrollPrompt.classList.toggle("hidden", currentScrollY > 10);
    }

    /*
    if (ribbon) {
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50;
      ribbon.classList.toggle("hide", scrollingDown);
      lastScrollY = currentScrollY;
    }
    */
  });

  // Show promo popup
  if (promoPopup) {
    promoPopup.classList.remove("hidden");

    const hidePopup = () => promoPopup.classList.add("hidden");
    closeBtn?.addEventListener("click", hidePopup);
    primaryBtn?.addEventListener("click", hidePopup);
  }

  // Run media query detection once
  detectMediaQuery();

  // === ✅ Gallery auto-scroll logic ===
  const photoGallery = document.querySelector(".photo-gallery");

  if (photoGallery) {
    let scrollAmount = 2; // pixels per frame
    let direction = 1; // 1 = right, -1 = left

    function autoScrollGallery() {
      photoGallery.scrollLeft += scrollAmount * direction;

      const maxScrollLeft = photoGallery.scrollWidth - photoGallery.clientWidth;

      if (photoGallery.scrollLeft >= maxScrollLeft - 1) direction = -1;
      if (photoGallery.scrollLeft <= 0) direction = 1;

      requestAnimationFrame(autoScrollGallery);
    }

    autoScrollGallery();
  }
});

// Page fully loaded
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Scroll to top after slight delay
  setTimeout(() => {
    window.scrollTo({ top: 0 });
  }, 50);

  // Orientation check on load
  checkOrientation();
});

// Re-check orientation and media query on window changes
["resize", "orientationchange"].forEach((event) => {
  window.addEventListener(event, () => {
    checkOrientation();
    detectMediaQuery();
  });
});