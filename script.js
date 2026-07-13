// Navigation scroll effect
let lastScrollTop = 0;
const nav = document.querySelector('nav');
const backToTop = document.querySelector('.back-to-top');
const readingProgress = document.querySelector('.reading-progress');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add shadow when scrolled
  if (scrollTop > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Show/hide back to top button
  if (backToTop) {
    if (scrollTop > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Update reading progress bar
  if (readingProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    readingProgress.style.width = scrollPercent + '%';
  }

  lastScrollTop = scrollTop;
});

// Back to top click handler
if (backToTop) {
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme, default to light
function getTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return 'light'; // Default to light mode
}

// Apply theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(getTheme());

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

// Typed text animation
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
  const phrases = [
    'Computer Engineering Student',
    'Distributed Systems Engineer',
    'ML Systems Researcher',
    'Security & CTF Player',
    'Georgia Tech'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing animation
  setTimeout(typeText, 1000);
}

// Highlight current page in nav
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Lazy load images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and fade-in elements with staggered delay
  const animatedElements = document.querySelectorAll('.card, .fade-in, .fade-in-up, .slide-in-left, .project-card, .featured-project, .filter-container');
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    observer.observe(el);
  });

  // Staggered animation for project cards specifically
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Form submission handling (if needed in future)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  });
});

// Image modal for project images
document.querySelectorAll('.project-image-full').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <img src="${this.src}" alt="${this.alt}">
        <button class="modal-close">&times;</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    setTimeout(() => modal.classList.add('active'), 10);

    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    };

    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
  });
});

// Add CSS for image modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-modal.active {
    opacity: 1;
  }

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }

  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    margin: 5% auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .modal-close:hover {
    transform: scale(1.1);
  }
`;
document.head.appendChild(modalStyles);

// 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.project-card, .featured-project, .skill-item, .tech-item');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', function() {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', function() {
    card.style.transition = 'transform 0.1s ease';
  });
});
