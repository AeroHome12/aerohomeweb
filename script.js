// Run DOM-related setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const scrollPrompt = document.querySelector('.scroll-prompt');

  // Scroll prompt hide/show on scroll with fade effect
  if (scrollPrompt) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        scrollPrompt.classList.add('hidden');
      } else {
        scrollPrompt.classList.remove('hidden');
      }
    });
  }

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 500,
    once: false
  });
});

// Run after full page (including images) has loaded
window.addEventListener('load', () => {
  // Add loaded class for fade-in effect
  document.body.classList.add('loaded');
  
  // Smooth scroll to top after short delay
  setTimeout(() => {
    window.scrollTo({ top: 0});
  }, 50);
});
