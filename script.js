// Fade-in body when page loads
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Accordion toggle logic for service sections
function toggleSection(section) {
  const allSections = document.querySelectorAll('.service-category');
  const jobs = section.querySelector('.jobs');

  allSections.forEach(sec => {
    const secJobs = sec.querySelector('.jobs');
    if (sec !== section) {
      secJobs.classList.remove('expanded');
    }
  });

  jobs.classList.toggle('expanded');
}

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true
});

window.addEventListener('scroll', () => {
  const scrollPrompt = document.querySelector('.scroll-prompt');
  if (window.scrollY > 100) {
    scrollPrompt.style.display = 'none';
  } else {
    scrollPrompt.style.display = 'block';
  }
});
