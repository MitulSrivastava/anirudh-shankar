// Custom JavaScript for Anirudh Shankar Portfolio

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    const isMenuOpen = mobileMenu.classList.contains("show");

    if (isMenuOpen) {
      // Close menu
      mobileMenu.classList.remove("show");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    } else {
      // Open menu
      mobileMenu.classList.add("show");
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
    }
  });

  // Close mobile menu when clicking on nav links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("show");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnMenuBtn &&
      mobileMenu.classList.contains("show")
    ) {
      mobileMenu.classList.remove("show");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();

        // Calculate offset for sticky navigation
        const navHeight = document.querySelector(".navbar-custom").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect to navigation
  const navbar = document.querySelector(".navbar-custom");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class based on scroll position
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".stat-card, .service-card, .hero-image-container"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add hover effects for cards
  const cards = document.querySelectorAll(".stat-card, .service-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click effects for buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Parallax effect for hero decorations
  const heroDecorations = document.querySelectorAll(
    ".hero-decoration-1, .hero-decoration-2"
  );

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    heroDecorations.forEach((decoration, index) => {
      const speed = index === 0 ? 0.3 : 0.5;
      decoration.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // Add active navigation highlighting based on scroll position (only on home page)
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname === "/index.html";

  if (isHomePage) {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

    window.addEventListener("scroll", function () {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });

      // Handle home link
      if (window.pageYOffset < 100) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (
            link.getAttribute("href") === "#" ||
            link.textContent.trim() === "Home"
          ) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  console.log("Anirudh Shankar Portfolio - JavaScript loaded successfully!");
});
