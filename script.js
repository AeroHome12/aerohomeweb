// Fade-in body when page loads
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Toggle visibility of job cards in service sections (accordion behavior)
function toggleSection(section) {
  const jobs = section.querySelector('.jobs');
  const allJobs = document.querySelectorAll('.jobs');

  allJobs.forEach(jobList => {
    if (jobList !== jobs) {
      jobList.classList.remove('expanded');
    }
  });

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
