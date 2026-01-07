// Project-specific scripts extracted from index.html

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) mobileMenu.classList.add("hidden");
  });
});

// Throttle function for scroll events
function throttle(func, wait) {
  let timeout;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Date.now() - lastRan >= wait) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, wait - (Date.now() - lastRan));
    }
  };
}

// Navbar scroll effect & Active section highlighting - Combined and throttled
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const handleScroll = throttle(() => {
  // Navbar effect
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg", "py-3");
      navbar.classList.remove("py-4");
    } else {
      navbar.classList.remove("shadow-lg", "py-3");
      navbar.classList.add("py-4");
    }
  }

  // Active section highlighting
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove(
      "bg-white",
      "text-blue-900",
      "shadow-lg",
      "scale-105"
    );
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("bg-white", "text-blue-900", "shadow-lg", "scale-105");
    }
  });
}, 100);

window.addEventListener("scroll", handleScroll, { passive: true });

// Smooth scroll for all anchor links
const hashLinks = document.querySelectorAll('a[href^="#"]');
hashLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

// Scroll animations - Intersection Observer with optimized settings
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Use requestAnimationFrame for smoother animation triggering
      requestAnimationFrame(() => {
        entry.target.classList.add("animate-in");
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
const animateElements = document.querySelectorAll(
  ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
);
animateElements.forEach((el) => observer.observe(el));

// Add stagger delay to multiple items in the same container
const animateGroups = document.querySelectorAll(".animate-group");
animateGroups.forEach((group) => {
  const items = group.querySelectorAll(
    ".scroll-animate, .scroll-animate-scale"
  );
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Scroll to top button & Progress bar - Combined and optimized
const scrollToTopBtn = document.getElementById("scrollToTop");
const scrollProgress = document.getElementById("scrollProgress");

const handleScrollEffects = throttle(() => {
  const scrollY = window.scrollY;

  // Scroll to top button
  if (scrollToTopBtn) {
    if (scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }

  // Scroll progress bar
  if (scrollProgress) {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  }
}, 100);

window.addEventListener("scroll", handleScrollEffects, { passive: true });

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Add ripple effect to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('a[href="#registration"], button');
  buttons.forEach((button) => {
    if (!button.classList.contains("btn-ripple")) {
      button.classList.add("btn-ripple");
    }
  });
});

// Parallax effect for hero section - Optimized with RAF
const heroSection = document.querySelector("#home");
let ticking = false;

if (heroSection) {
  const handleParallax = () => {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(handleParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Lazy loading images enhancement
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
