function detectMediaQuery() {
  const width = window.innerWidth;

  if (width >= 1281) {

    return "min-1281px";

  } else if (width >= 1025 && width <= 1280) {

    return "1025-1280px";

  } else if (width >= 768 && width <= 1024) {

    return "768-1024";

  } else if (width >= 380 && width <= 420) {

    const heroTitle = document.querySelector('.hero .text-container h1');
    heroTitle.textContent = "LANDSCAPING RENOVATION INSTALLATIONS";
    return "380-420px";

  } else {

    return "other";

  }
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkOrientation() {
  if (isMobile() && window.innerWidth > window.innerHeight) {
    document.body.innerHTML = "Please rotate your device to portrait mode for the best experience.";
  }
}

// When DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const scrollPrompt = document.querySelector(".scroll-prompt");

  // Scroll prompt hide/show
  if (scrollPrompt) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        scrollPrompt.classList.add("hidden");
      } else {
        scrollPrompt.classList.remove("hidden");
      }
    });
  }

  // Animate On Scroll (AOS) initialization
  AOS.init({
    duration: 2100,
    once: false
  });

  // Run media query check once
  detectMediaQuery();
});

// When full page is loaded
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Scroll to top after slight delay
  setTimeout(() => {
    window.scrollTo({ top: 0 });
  }, 50);

  // Check orientation
  checkOrientation();
});

// Re-check on orientation or resize
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);