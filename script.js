/**
 * ============================================================
 * PORTFOLIO - ADVANCED INTERACTIONS
 * ============================================================
 * Phase 1: Visual Polish
 * - Hero text animations
 * - Scroll effects (progress bar, reveal, parallax)
 * - 3D card tilt effects
 * - Magnetic buttons
 * - Animated counters
 * - Smooth page transitions
 * ============================================================
 */

// ============================================================
// INITIALIZATION
// Wait for DOM then initialize all modules
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Hide page loader
  PageLoader.init();

  // Core functionality
  ThemeController.init();
  HeaderController.init();
  MobileMenu.init();
  ScrollProgress.init();
  RevealController.init();
  NavSpyController.init();
  BackToTop.init();

  // Advanced interactions
  TypewriterEffect.init();
  TiltEffect.init();
  MagneticButtons.init();
  AnimatedCounters.init();
  CursorGlow.init();
  ButtonRipple.init();

  // Features
  ModalController.init();
  ProjectFilterController.init();
  FormController.init();
  CommandPalette.init();
});

// ============================================================
// PAGE LOADER
// Hides loading screen when page is ready
// ============================================================
const PageLoader = (() => {
  function init() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;

    // Hide loader when page is fully loaded
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        // Remove from DOM after animation
        setTimeout(() => loader.remove(), 500);
      }, 300);
    });
  }

  return { init };
})();

// ============================================================
// THEME CONTROLLER
// Dark/light mode with system preference detection
// ============================================================
const ThemeController = (() => {
  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function toggleTheme() {
    const isDark = root.hasAttribute("data-theme");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function init() {
    applyTheme(getPreferredTheme());

    if (toggle) {
      toggle.addEventListener("click", toggleTheme);
    }

    // Listen for system preference changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  return { init };
})();

// ============================================================
// HEADER CONTROLLER
// Handles scroll state and visibility
// ============================================================
const HeaderController = (() => {
  const header = document.getElementById("header");
  let ticking = false;

  function updateHeader() {
    const scrolled = window.scrollY > 50;

    // Update header
    if (scrolled) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update body for scroll indicator
    if (window.scrollY > 100) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  function init() {
    if (!header) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeader();
  }

  return { init };
})();

// ============================================================
// MOBILE MENU
// Hamburger toggle for mobile navigation
// ============================================================
const MobileMenu = (() => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll("nav a");

  function toggleMenu() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", !isOpen);
    nav.classList.toggle("active", !isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : "";
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("active");
    document.body.style.overflow = "";
  }

  function init() {
    if (!menuToggle || !nav) return;

    // Toggle on click
    menuToggle.addEventListener("click", toggleMenu);

    // Close on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close on window resize (if going to desktop)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && nav.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  return { init };
})();

// ============================================================
// TYPEWRITER EFFECT
// Animated text typing in hero section
// ============================================================
const TypewriterEffect = (() => {
  const WORDS = [
    "scalable backend systems",
    "robust APIs",
    "data-driven services",
    "reliable microservices",
    "secure server-side systems",
    "distributed systems",
  ];

  const TYPE_SPEED = 80; // ms per character when typing
  const DELETE_SPEED = 50; // ms per character when deleting
  const PAUSE_AFTER_TYPE = 2000; // ms to wait after typing word
  const PAUSE_AFTER_DELETE = 500; // ms to wait after deleting

  let element = null;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId = null;

  function type() {
    if (!element) return;

    const currentWord = WORDS[wordIndex];

    if (isDeleting) {
      // Remove character
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % WORDS.length;
        timeoutId = setTimeout(type, PAUSE_AFTER_DELETE);
      } else {
        timeoutId = setTimeout(type, DELETE_SPEED);
      }
    } else {
      // Add character
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, PAUSE_AFTER_TYPE);
      } else {
        timeoutId = setTimeout(type, TYPE_SPEED);
      }
    }
  }

  function init() {
    element = document.getElementById("typewriter");
    if (!element) return;

    // Skip animation for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = WORDS[0];
      const cursor = document.querySelector(".typewriter-wrapper .cursor");
      if (cursor) cursor.style.display = "none";
      return;
    }

    // Start typing
    type();

    // Clean up on page hide (battery saving)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearTimeout(timeoutId);
      } else {
        // Resume from current position
        timeoutId = setTimeout(type, 500);
      }
    });
  }

  return { init };
})();

// ============================================================
// SCROLL PROGRESS
// Shows reading progress at top of page
// ============================================================
const ScrollProgress = (() => {
  const progressBar = document.getElementById("scroll-progress");

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  function init() {
    if (!progressBar) return;
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  return { init };
})();

// ============================================================
// REVEAL CONTROLLER
// Subtle scroll-triggered reveal - triggers early, animates gently
// ============================================================
const RevealController = (() => {
  function init() {
    const elements = document.querySelectorAll(".reveal, .reveal-fade");
    if (!elements.length) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Just show everything immediately
      elements.forEach((el) => el.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for smoother feel
            requestAnimationFrame(() => {
              entry.target.classList.add("active");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05, // Trigger earlier
        rootMargin: "0px 0px -20px 0px", // Less aggressive margin
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  return { init };
})();

// ============================================================
// NAV SPY CONTROLLER
// Highlights active nav link based on scroll position
// ============================================================
const NavSpyController = (() => {
  function init() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll('nav a[href^="#"]');

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => {
              const href = link.getAttribute("href").slice(1);
              link.classList.toggle("active", href === entry.target.id);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -50% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  return { init };
})();

// ============================================================
// BACK TO TOP
// Button appears on scroll, returns to top
// ============================================================
const BackToTop = (() => {
  const button = document.getElementById("back-to-top");

  function toggleButton() {
    if (window.scrollY > 500) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function init() {
    if (!button) return;

    window.addEventListener("scroll", toggleButton, { passive: true });
    button.addEventListener("click", scrollToTop);
    toggleButton();
  }

  return { init };
})();

// ============================================================
// 3D TILT EFFECT
// Very subtle tilt - not disorienting
// ============================================================
const TiltEffect = (() => {
  const MAX_TILT = 3; // Very subtle - only 3 degrees max
  const PERSPECTIVE = 1000;

  function handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -MAX_TILT;
    const rotateY = ((x - centerX) / centerX) * MAX_TILT;

    card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave(card) {
    card.style.transform = "";
  }

  function init() {
    // Skip on touch devices or reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      card.style.transition = "transform 0.15s ease-out";

      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });
  }

  return { init };
})();

// ============================================================
// MAGNETIC BUTTONS
// Very subtle magnetic effect
// ============================================================
const MagneticButtons = (() => {
  const STRENGTH = 0.15; // Reduced from 0.3

  function handleMouseMove(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
  }

  function handleMouseLeave(btn) {
    btn.style.transform = "";
  }

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const buttons = document.querySelectorAll(".magnetic-btn");

    buttons.forEach((btn) => {
      btn.style.transition = "transform 0.15s ease-out";

      btn.addEventListener("mousemove", (e) => handleMouseMove(e, btn));
      btn.addEventListener("mouseleave", () => handleMouseLeave(btn));
    });
  }

  return { init };
})();

// ============================================================
// ANIMATED COUNTERS
// Numbers count up when visible
// ============================================================
const AnimatedCounters = (() => {
  const DURATION = 2000; // ms

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  return { init };
})();

// ============================================================
// CURSOR GLOW
// Premium ambient light effect following cursor
//
// Features:
// - Very slow easing (0.04) for dreamy, laggy feel
// - Fades out during scroll
// - Brightens slightly over interactive elements
// - Completely disabled on touch/mobile
// - Performance optimized with RAF
// ============================================================
const CursorGlow = (() => {
  function init() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;

    // Strict checks - disable on touch, mobile, or reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (prefersReducedMotion || !hasFinePointer) {
      glow.style.display = "none";
      return;
    }

    // State
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isScrolling = false;
    let scrollTimeout = null;
    let rafId = null;

    // Very slow easing for dreamy, ambient feel
    const EASING = 0.04;

    /**
     * Animation loop - uses RAF for smooth 60fps
     */
    function animate() {
      // Smooth interpolation with very slow easing
      glowX += (mouseX - glowX) * EASING;
      glowY += (mouseY - glowY) * EASING;

      // Use transform for GPU acceleration
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    }

    /**
     * Track mouse position
     */
    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    /**
     * Fade out while scrolling for less distraction
     */
    function handleScroll() {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add("is-scrolling");
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Fade back in after scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove("is-scrolling");
      }, 150);
    }

    /**
     * Slightly brighten when hovering interactive elements
     */
    function handleInteractiveHover() {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .project-card, .bento-card'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener(
          "mouseenter",
          () => {
            document.body.classList.add("cursor-active");
          },
          { passive: true }
        );

        el.addEventListener(
          "mouseleave",
          () => {
            document.body.classList.remove("cursor-active");
          },
          { passive: true }
        );
      });
    }

    /**
     * Clean up when page is hidden (battery saving)
     */
    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(animate);
      }
    }

    // Bind events
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Setup interactive hover enhancement
    handleInteractiveHover();

    // Start animation loop
    rafId = requestAnimationFrame(animate);
  }

  return { init };
})();

// ============================================================
// BUTTON RIPPLE EFFECT
// Creates ripple on click
// ============================================================
const ButtonRipple = (() => {
  function createRipple(e, btn) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  }

  function init() {
    const buttons = document.querySelectorAll(".btn-primary");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => createRipple(e, btn));
    });
  }

  return { init };
})();

// ============================================================
// MODAL CONTROLLER
// Accessible project detail modal
// ============================================================
const ModalController = (() => {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");
  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-description");
  const tech = document.getElementById("modal-tech");
  const github = document.getElementById("modal-github");
  const live = document.getElementById("modal-live");

  let lastFocusedElement = null;

  const caseStudyContainer = document.getElementById("modal-case-study");

  function renderCaseStudy(card) {
    if (!caseStudyContainer) return;

    const overview = card.dataset.caseOverview;
    const points = card.dataset.casePoints;

    if (!overview && !points) {
      caseStudyContainer.innerHTML = "";
      return;
    }

    const items = points
      ? points
          .split("|")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const parts = [];
    if (overview) {
      parts.push(`
                <div class="modal-case-group">
                    <div class="modal-case-label">Overview</div>
                    <div class="modal-case-text">${overview}</div>
                </div>
            `);
    }

    if (items.length) {
      const listItems = items.map((item) => `<li>${item}</li>`).join("");
      parts.push(`
                <div class="modal-case-group">
                    <div class="modal-case-label">Highlights</div>
                    <ul class="modal-case-list">${listItems}</ul>
                </div>
            `);
    }

    caseStudyContainer.innerHTML = parts.join("");
  }

  function open(card) {
    lastFocusedElement = document.activeElement;

    // Populate content
    title.textContent = card.dataset.title;
    desc.textContent = card.dataset.description;
    tech.textContent = `Tech: ${card.dataset.tech}`;
    renderCaseStudy(card);
    github.href = card.dataset.github;

    // Show/hide live link
    if (card.dataset.live) {
      live.href = card.dataset.live;
      live.style.display = "";
    } else {
      live.style.display = "none";
    }

    // Show modal
    overlay.hidden = false;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    setTimeout(() => closeBtn.focus(), 100);
  }

  function close() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    setTimeout(() => {
      overlay.hidden = true;
      if (lastFocusedElement) lastFocusedElement.focus();
    }, 200);
  }

  function bindCards() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => open(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(card);
        }
      });
    });
  }

  function bindCloseActions() {
    closeBtn.addEventListener("click", close);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) {
        close();
      }
    });
  }

  function init() {
    if (!overlay) return;
    bindCards();
    bindCloseActions();
  }

  // Public helper to open modal by project title (used by command palette / blog)
  function openByTitle(titleText) {
    const card = Array.from(document.querySelectorAll(".project-card")).find(
      (c) => c.dataset.title === titleText
    );
    if (card) {
      open(card);
    }
  }

  return { init, openByTitle };
})();

// ============================================================
// PROJECT FILTER CONTROLLER
// Search and filter projects
// ============================================================
const ProjectFilterController = (() => {
  function init() {
    const searchInput = document.getElementById("project-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    if (!projects.length) return;

    let activeFilter = "all";

    function filterProjects() {
      const query = searchInput?.value.toLowerCase().trim() || "";

      projects.forEach((card) => {
        const text =
          `${card.dataset.title} ${card.dataset.description} ${card.dataset.tech}`.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesFilter =
          activeFilter === "all" ||
          card.dataset.tech.toLowerCase().includes(activeFilter);

        if (matchesSearch && matchesFilter) {
          card.hidden = false;
          card.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          card.hidden = true;
        }
      });
    }

    // Debounced search
    if (searchInput) {
      let timer;
      searchInput.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(filterProjects, 200);
      });
    }

    // Filter buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        filterProjects();
      });
    });
  }

  return { init };
})();

// ============================================================
// CONTACT FORM CONTROLLER
// Handles form submission with feedback
// ============================================================
const FormController = (() => {
  function init() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Loading state
      btn.textContent = "Sending...";
      btn.disabled = true;

      // Simulate API call (replace with actual submission)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success state
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "var(--color-success)";
      form.reset();

      // Reset after delay
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    });
  }

  return { init };
})();

// ============================================================
// BLOG CASE STUDY TRIGGERS
// Blog CTA buttons open the relevant project modal
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".blog-open-case-study");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.targetProject;
      if (title) {
        ModalController.openByTitle(title);
      }
    });
  });
});

// ============================================================
// COMMAND PALETTE
// Cmd/Ctrl + K quick navigation and actions
// ============================================================
const CommandPalette = (() => {
  let overlay, input, list;
  let commands = [];
  let filtered = [];
  let activeIndex = 0;

  function buildCommands() {
    const base = [
      {
        id: "nav-home",
        label: "Go to Home",
        meta: "Section",
        shortcut: "H",
        keywords: "home hero top",
        action: () => scrollToSection("#home"),
      },
      {
        id: "nav-about",
        label: "Go to About",
        meta: "Section",
        shortcut: "A",
        keywords: "about bio skills bento",
        action: () => scrollToSection("#about"),
      },
      {
        id: "nav-projects",
        label: "Go to Projects",
        meta: "Section",
        shortcut: "P",
        keywords: "projects work case studies",
        action: () => scrollToSection("#projects"),
      },
      {
        id: "nav-blog",
        label: "Go to Writing",
        meta: "Section",
        shortcut: "W",
        keywords: "blog writing articles notes",
        action: () => scrollToSection("#blog"),
      },
      {
        id: "nav-contact",
        label: "Go to Contact",
        meta: "Section",
        shortcut: "C",
        keywords: "contact email get in touch",
        action: () => scrollToSection("#contact"),
      },
      {
        id: "open-github",
        label: "Open GitHub Profile",
        meta: "External",
        shortcut: "G",
        keywords: "github code repositories profile",
        action: () =>
          window.open("https://github.com/022RaTiNdRa", "_blank", "noopener"),
      },
      {
        id: "open-portfolio-case",
        label: "Open Portfolio Website case study",
        meta: "Project",
        shortcut: "1",
        keywords: "portfolio case study hero animations",
        action: () => ModalController.openByTitle("Portfolio Website"),
      },
      {
        id: "open-student-system",
        label: "Open Student Management System case study",
        meta: "Project",
        shortcut: "2",
        keywords: "student management python cli architecture",
        action: () => ModalController.openByTitle("Student Management System"),
      },
    ];

    commands = base;
    filtered = base;
  }

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  function openPalette() {
    if (!overlay || !input || !list) return;
    overlay.hidden = false;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    input.value = "";
    filterCommands("");
    requestAnimationFrame(() => input.focus());
  }

  function closePalette() {
    if (!overlay) return;
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      overlay.hidden = true;
    }, 150);
  }

  function renderList() {
    list.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("li");
      empty.className = "command-item";
      empty.textContent = "No commands found. Try a different search.";
      list.appendChild(empty);
      return;
    }

    filtered.forEach((cmd, index) => {
      const li = document.createElement("li");
      li.className = "command-item";
      li.id = `command-item-${cmd.id}`;
      li.setAttribute("role", "option");
      li.setAttribute(
        "aria-selected",
        index === activeIndex ? "true" : "false"
      );

      const main = document.createElement("div");
      main.className = "command-item-main";

      const label = document.createElement("span");
      label.className = "command-item-label";
      label.textContent = cmd.label;

      const meta = document.createElement("span");
      meta.className = "command-item-meta";
      meta.textContent = cmd.meta;

      main.appendChild(label);
      main.appendChild(meta);

      const shortcut = document.createElement("span");
      shortcut.className = "command-item-shortcut";
      if (cmd.shortcut) {
        const kbd = document.createElement("kbd");
        kbd.textContent = cmd.shortcut;
        shortcut.appendChild(kbd);
      }

      li.appendChild(main);
      li.appendChild(shortcut);

      li.addEventListener("click", () => executeCommand(index));

      list.appendChild(li);
    });
  }

  function executeCommand(index) {
    const cmd = filtered[index];
    if (!cmd) return;
    closePalette();
    setTimeout(() => cmd.action(), 120);
  }

  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      filtered = commands;
    } else {
      filtered = commands.filter((cmd) => {
        const haystack = `${cmd.label} ${cmd.meta} ${
          cmd.keywords || ""
        }`.toLowerCase();
        return haystack.includes(q);
      });
    }
    activeIndex = 0;
    renderList();
    updateActiveDescendant();
  }

  function updateActiveDescendant() {
    const active = filtered[activeIndex];
    if (active) {
      input.setAttribute("aria-activedescendant", `command-item-${active.id}`);
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function handleKeyDown(e) {
    if (overlay.hidden) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length) {
        activeIndex = (activeIndex + 1) % filtered.length;
        renderList();
        updateActiveDescendant();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length) {
        activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
        renderList();
        updateActiveDescendant();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
    }
  }

  function bindGlobalShortcut() {
    document.addEventListener("keydown", (e) => {
      const isCmdK =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isCmdK) {
        e.preventDefault();
        if (overlay.hidden) {
          openPalette();
        } else {
          closePalette();
        }
      }
    });
  }

  function bindInput() {
    input.addEventListener("input", () => {
      filterCommands(input.value);
    });

    input.addEventListener("keydown", handleKeyDown);
  }

  function bindOverlayDismiss() {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closePalette();
      }
    });
  }

  function init() {
    overlay = document.getElementById("command-palette-overlay");
    input = document.getElementById("command-palette-input");
    list = document.getElementById("command-palette-list");

    if (!overlay || !input || !list) return;

    buildCommands();
    renderList();

    bindGlobalShortcut();
    bindInput();
    bindOverlayDismiss();
  }

  return { init };
})();

// ============================================================
// SMOOTH SCROLL LINKS
// Smooth scroll for all anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ============================================================
// CSS KEYFRAMES (injected for JS animations)
// ============================================================
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);
