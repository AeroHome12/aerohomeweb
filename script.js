// Fade-in body when page loads
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Toggle visibility of job cards in service sections (accordion behavior)
function toggleSection(section) {
  const jobs = section.querySelector('.jobs');
  const allSections = document.querySelectorAll('.service-category');

  allSections.forEach(otherSection => {
    const otherJobs = otherSection.querySelector('.jobs');
    if (otherSection !== section) {
      otherJobs.style.maxHeight = null;
      otherJobs.classList.remove('expanded');
    }
  });

  if (jobs.classList.contains('expanded')) {
    jobs.style.maxHeight = null;
  } else {
    jobs.style.maxHeight = jobs.scrollHeight + "px";
  }

  jobs.classList.toggle('expanded');
}

// Animate On Scroll (AOS) init
AOS.init({
  duration: 800,
  once: true
});

// Hide scroll prompt after scroll
window.addEventListener('scroll', () => {
  const scrollPrompt = document.querySelector('.scroll-prompt');
  scrollPrompt.style.display = window.scrollY > 100 ? 'none' : 'block';
});
