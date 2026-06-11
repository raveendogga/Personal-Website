const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (year) {
  year.textContent = String(new Date().getFullYear());
}
