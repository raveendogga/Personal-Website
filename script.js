const data = window.SITE_DATA;
const pageKey = document.body.dataset.page || "home";
const page = data.pages[pageKey] || data.pages.home;
const root = document.querySelector("#site-root");

function navMarkup() {
  return data.nav
    .map((item) => `<a class="${item.key === pageKey ? "active" : ""}" href="${item.href}">${item.label}</a>`)
    .join("");
}

function statsMarkup(stats = []) {
  if (!stats.length) return "";
  return `
    <section class="stats-section">
      <div class="stats-grid">
        ${stats.map(([value, label]) => `
          <div class="stat-card">
            <div class="stat-value">${value}</div>
            <div class="stat-label">${label}</div>
          </div>
        `).join("")}
      </div>
    </section>`;
}

function sectionMarkup(section, index) {
  const bandClass = index % 2 === 1 ? " band" : "";
  return `
    <section class="content-section${bandClass}">
      <div class="section-inner reveal-on-scroll">
        <div class="section-heading">
          <p class="eyebrow">${section.kicker || ""}</p>
          <h2>${section.title || ""}</h2>
        </div>
        <div class="section-body">${section.body || ""}</div>
      </div>
    </section>`;
}

function render() {
  document.title = pageKey === "home" ? "Dr. Dogga Raveendhra" : `${page.title} | Dr. Dogga Raveendhra`;
  const expandedSections = window.CV_DETAIL_SECTIONS?.[pageKey] || [];
  const pageSections = [...(page.sections || []), ...expandedSections];

  root.innerHTML = `
    <header class="site-header" data-header>
      <a class="brand" href="index.html" aria-label="Dr. Dogga Raveendhra home">
        <span class="brand-mark">DR</span>
        <span>Dogga Raveendhra</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" data-nav>${navMarkup()}</nav>
    </header>

    <main>
      <section class="page-hero ${page.heroImage ? "home-hero" : ""}">
        <div class="hero-content">
          <div class="hero-copy">
            <p class="eyebrow">${page.kicker}</p>
            <h1>${page.title}</h1>
            <h2 class="hero-lead">${page.lead}</h2>
            ${page.quote ? `<p class="hero-quote">"${page.quote}"</p>` : ""}
            <div class="hero-actions">
              <a class="button primary" href="${data.contact.cv}" target="_blank" rel="noopener">Download CV</a>
              <a class="button secondary" href="${data.contact.scholar}" target="_blank" rel="noopener">Google Scholar</a>
              <a class="button secondary" href="publications.html">Publications</a>
              <a class="button secondary" href="mailto:${data.contact.email}">Contact</a>
            </div>
          </div>
          ${page.heroImage ? `<div class="hero-portrait"><img src="assets/profile.png" alt="Portrait of Dr. Dogga Raveendhra"></div>` : ""}
        </div>
      </section>
      ${pageKey === 'home' ? statsMarkup(page.stats) : ""}
      ${pageSections.map(sectionMarkup).join("")}
      
      ${pageKey === 'home' ? `
      <section class="cta-section">
        <div class="cta-inner">
          <h2>Ready to collaborate?</h2>
          <p>I'm always open to discussing research opportunities and industrial partnerships.</p>
          <a class="button primary" href="mailto:${data.contact.email}">Get in touch</a>
        </div>
      </section>` : ''}
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <strong>Dr. Dogga Raveendhra</strong>
          <p>Power Electronics | EV Systems | Renewable Energy</p>
        </div>
        <div class="footer-links">
          <a href="mailto:${data.contact.email}">Email</a>
          <a href="${data.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${data.contact.scholar}" target="_blank" rel="noopener">Google Scholar</a>
          <a href="${data.contact.orcid}" target="_blank" rel="noopener">ORCID</a>
          <a href="${data.contact.researchgate}" target="_blank" rel="noopener">ResearchGate</a>
        </div>
        <div class="footer-copy">
          <p>&copy; ${new Date().getFullYear()} Dr. Dogga Raveendhra</p>
        </div>
      </div>
    </footer>`;

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.addEventListener("click", () => {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Initialize IntersectionObserver for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function start() {
  render();
}

function loadSupplementalScripts(srcs, done) {
  const [src, ...rest] = srcs;
  if (!src) {
    done();
    return;
  }

  const detailScript = document.createElement("script");
  detailScript.src = src;
  detailScript.onload = () => loadSupplementalScripts(rest, done);
  detailScript.onerror = () => loadSupplementalScripts(rest, done);
  document.head.appendChild(detailScript);
}

const supplementalScripts = [];
if (!window.CV_DETAIL_SECTIONS) supplementalScripts.push("cv-details.js?v=20260611");
if (pageKey === "completeCv" && !window.CV_TRANSCRIPT_LOADED) supplementalScripts.push("cv-transcript.js?v=20260611");

loadSupplementalScripts(supplementalScripts, start);
