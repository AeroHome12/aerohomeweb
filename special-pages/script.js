document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.querySelector('.top-ribbon');
  const hamburger = document.querySelector('.hamburger-btn');
  const navButtons = document.querySelector('.ribbon-buttons');
  let lastScrollY = window.scrollY;

  // === Hide/show nav on scroll ===
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (ribbon) {
      const menuOpen = navButtons && navButtons.classList.contains('open');
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50;
      if (!menuOpen) ribbon.classList.toggle('hide', scrollingDown);
    }
    lastScrollY = currentScrollY;
  });

  // === Hamburger menu ===
  if (hamburger && navButtons) {
    hamburger.addEventListener('click', () => {
      const isOpen = navButtons.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navButtons.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navButtons.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.top-ribbon')) {
        navButtons.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  // === Body loaded class ===
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});
