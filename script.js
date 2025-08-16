// =======================
// 🌙 Dark Mode Toggle
// =======================
const themeToggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem('theme');
const nameText = "Hello, I'm Narendra Koya";
const taglineText = "🚀 Building performant, scalable, and accessible web apps with React & Next.js";

const nameTarget = document.getElementById('typewriter-name');
const taglineTarget = document.getElementById('typewriter-tagline');

let nameIndex = 0;
let taglineIndex = 0;

function typeName() {
  if (nameIndex < nameText.length) {
    nameTarget.textContent += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName, 70);
  } else {
    // Start typing tagline after name finishes
    setTimeout(typeTagline, 500);
  }
}

function typeTagline() {
  if (taglineIndex < taglineText.length) {
    taglineTarget.textContent += taglineText.charAt(taglineIndex);
    taglineIndex++;
    setTimeout(typeTagline, 38);
  }
}

if (nameTarget && taglineTarget) {
  nameTarget.textContent = "";
  taglineTarget.textContent = "";
  typeName();
}


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

// =======================
// 📱 Burger Menu Toggle
// =======================
const menuToggleBtn = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggleBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
  const isOpened = navList.classList.contains('show');
  menuToggleBtn.setAttribute('aria-label', isOpened ? "Close menu" : "Open menu");
});

// Close menu on link click (mobile UX)
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
    menuToggleBtn.setAttribute('aria-label', "Open menu");
  });
});

// =======================
// 🎬 Scroll Animation with Stagger
// =======================
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add staggered animation delay for list-like elements
      if (entry.target.parentElement && 
          (entry.target.parentElement.matches('.skills') || entry.target.parentElement.matches('#achievements ul'))) {
        const siblings = entry.target.parentElement.querySelectorAll(':scope > *');
        siblings.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 150); // 150ms stagger
        });
      } else {
        entry.target.classList.add('visible');
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe targets (skills, projects, achievements, testimonials)
document.querySelectorAll('.skill-tag, .project, #achievements li, #testimonials blockquote')
  .forEach(el => observer.observe(el));

// =======================
// 📊 Scroll progress bar
// =======================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// =======================
// 📄 Download CV (Direct Download)
// =======================
document.getElementById('download-cv').addEventListener('click', () => {
  const cvUrl = 'Narendra-Koya-CV.pdf'; // ✅ use actual hosted path
  const a = document.createElement('a');
  a.href = cvUrl;
  a.download = 'Narendra-Koya-CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// =======================
// 📨 Contact Form Validation
// =======================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    // Simple front-end validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      e.preventDefault();
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }
    // ✅ Fixed Regex (removed extra backslashes)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      e.preventDefault();
      alert("⚠️ Please enter a valid email address.");
      return;
    }
  });
}
