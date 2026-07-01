const header = document.querySelector(".site-header");
const nav = document.querySelector("#global-nav");
const backToTop = document.querySelector(".back-to-top");
const fadeTargets = document.querySelectorAll(".fade-in");

nav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (!window.bootstrap) {
      return;
    }

    const collapse = bootstrap.Collapse.getInstance(nav);
    if (collapse) {
      collapse.hide();
    }
  });
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

requestAnimationFrame(() => {
  fadeTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0;

    if (isOnScreen) {
      target.classList.add("is-visible");
      observer.unobserve(target);
    }
  });
});
