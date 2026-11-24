/* ===================================================================
   PT ALAM PANDHADHA PERKASA — SCRIPT
   1. Sticky nav background on scroll
   2. Mobile hamburger menu toggle
   3. Smooth scroll + close menu on link click
   4. Scroll-reveal animations (IntersectionObserver)
   5. Back-to-top button
   6. Contact form validation
   7. Footer year
=================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Sticky nav background ---------- */
  var header = document.getElementById("siteHeader");

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* ---------- 2. Mobile hamburger menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    var isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  }

  hamburger.addEventListener("click", toggleMenu);

  /* ---------- 3. Smooth scroll + close menu on link click ---------- */
  var allNavAnchors = document.querySelectorAll('a[href^="#"]');

  allNavAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      closeMenu();
    });
  });

  /* ---------- 4. Scroll-reveal animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 5. Back-to-top button ---------- */
  var backToTop = document.getElementById("backToTop");

  function handleBackToTopVisibility() {
    if (window.scrollY > 600) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }
  handleBackToTopVisibility();
  window.addEventListener("scroll", handleBackToTopVisibility, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 6. Contact form validation ---------- */
  var form = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");

  function setError(fieldName, message) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    var errorEl = form.querySelector('[data-error-for="' + fieldName + '"]');
    var row = field.closest(".form-row");

    if (message) {
      row.classList.add("invalid");
      if (errorEl) errorEl.textContent = message;
    } else {
      row.classList.remove("invalid");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formSuccess.classList.remove("visible");

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var isValid = true;

      if (name.length < 2) {
        setError("name", "Please enter your full name.");
        isValid = false;
      } else {
        setError("name", "");
      }

      if (!isValidEmail(email)) {
        setError("email", "Please enter a valid email address.");
        isValid = false;
      } else {
        setError("email", "");
      }

      if (message.length < 10) {
        setError("message", "Please enter a message of at least 10 characters.");
        isValid = false;
      } else {
        setError("message", "");
      }

      if (isValid) {
        // NOTE: No backend is connected. Integrate a form service
        // (e.g. Formspree, EmailJS, a custom API endpoint) to actually
        // deliver submitted messages.
        formSuccess.classList.add("visible");
        form.reset();
      }
    });
  }

  /* ---------- 7. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
