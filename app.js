/* =================================================================
   ALI MUNIR PORTFOLIO - JAVASCRIPT
   Smooth scrolling, animations, and interactive elements
   ================================================================= */

// =================================================================
// NAVIGATION FUNCTIONALITY
// =================================================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// =================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// =================================================================
// SCROLL ANIMATIONS
// =================================================================

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in-up class
const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach(element => {
  observer.observe(element);
});

// =================================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =================================================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (correspondingLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// =================================================================
// COUNTER ANIMATION FOR METRICS
// =================================================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe metrics for counter animation
const metrics = document.querySelectorAll('.metric-value');
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      
      if (number && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        
        // Special handling for different metric formats
        if (text.includes('%')) {
          animateCounter(entry.target, number, 1500);
          entry.target.textContent = number + '%';
        } else if (text.includes('$')) {
          animateCounter(entry.target, number, 1500);
          entry.target.textContent = '$' + number + 'M';
        } else {
          animateCounter(entry.target, number, 1500);
          entry.target.textContent = number + '%';
        }
      }
      
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

metrics.forEach(metric => {
  metricsObserver.observe(metric);
});

// =================================================================
// PAGE LOAD ANIMATION
// =================================================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// =================================================================
// UTILITY: DETECT IF ELEMENT IS IN VIEWPORT
// =================================================================

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// =================================================================
// LAZY LOADING FOR IMAGES (if you add images later)
// =================================================================

function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// =================================================================
// EXTERNAL LINKS - OPEN IN NEW TAB
// =================================================================

const externalLinks = document.querySelectorAll('a[href^="http"]');
externalLinks.forEach(link => {
  if (!link.hasAttribute('target')) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

// =================================================================
// PERFORMANCE: DEBOUNCE FUNCTION FOR SCROLL EVENTS
// =================================================================

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavigation, 15));

// =================================================================
// ACCESSIBILITY: KEYBOARD NAVIGATION SUPPORT
// =================================================================

// Add keyboard support for mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navMenu.classList.toggle('active');
    }
  });
}

// =================================================================
// CONSOLE MESSAGE
// =================================================================

console.log('%cAli Munir Portfolio', 'font-size: 20px; font-weight: bold; color: #38b2ac;');
console.log('%cInterested in working together? Get in touch: ali.munir@me.com', 'font-size: 14px; color: #4a5568;');

// =================================================================
// EXPORT FOR TESTING (if needed)
// =================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isInViewport,
    debounce,
    animateCounter
  };
}