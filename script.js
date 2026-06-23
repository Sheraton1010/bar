const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".global-nav");
const backToTop = document.querySelector(".back-to-top");
const fadeTargets = document.querySelectorAll(".fade-in");

const closeNav = () => {
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.classList.toggle("is-active", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

const updateScrollUi = () => {
  const isScrolled = window.scrollY > 80;
  header.classList.toggle("is-scrolled", isScrolled);
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
};

window.addEventListener("scroll", updateScrollUi, { passive: true });
updateScrollUi();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

fadeTargets.forEach((target) => observer.observe(target));
