// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark');
  themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  themeToggleBtn.setAttribute('aria-pressed', 'true');
} else {
  themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  themeToggleBtn.setAttribute('aria-pressed', 'false');
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    themeToggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    themeToggleBtn.setAttribute('aria-pressed', 'false');
  }
});

// Scroll Animation (IntersectionObserver)
const observerOptions = {
  threshold: 0.1
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-tag, .project').forEach(el => {
  observer.observe(el);
});

// Scroll progress bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Download CV functionality (simulate download)
document.getElementById('download-cv').addEventListener('click', () => {
  // Replace with your actual CV URL
  const cvUrl = 'https://example.com/NarendraKoya_CV.pdf';
  const a = document.createElement('a');
  a.href = cvUrl;
  a.download = 'NarendraKoya_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
