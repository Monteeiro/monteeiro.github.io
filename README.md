# Personal Portfolio Website

Bilingual (Portuguese and English) personal portfolio built with plain HTML5, CSS3 and vanilla JavaScript, with no framework or build step. Hosted on GitHub Pages.

🔗 **Live site:** [monteeiro.github.io](https://monteeiro.github.io/) · 🇺🇸 [English version](https://monteeiro.github.io/en/)

---

## 📌 About

This repository holds the source code of my portfolio as a Control and Automation Engineering student at UNIFEI. The site presents my background, skills, featured technical projects, hands-on experience, education, certificates, publications and contact details.

### Core areas of interest
- Industrial Automation & Control Systems
- Machine Learning & Deep Learning
- Computer Vision
- Robotics
- Cybersecurity of Industrial Systems

---

## ✨ Features

### Design
- **Blueprint look:** cyanotype blue canvas with a millimetre-paper grid, thin white lines, square corners, no shadows and a double sheet frame around the page.
- **Technical drawings in SVG:** a dimensioned 2R robotic arm in the hero, dimension lines on the "About" photo and a numbered process-flow diagram in the header of the project page. They are plain inline SVG, so they stay sharp and need no extra requests.
- **Blueprint cards:** skills, projects, entries and the resume box use thin borders with registration crosses (+) at the corners, drawn only with CSS gradients.
- **Title block footer:** a drawing-style stamp (project, author, date, scale, revision) at the bottom of every page.
- **Self-hosted fonts:** Barlow Condensed, IBM Plex Sans and IBM Plex Mono as `woff2` (Latin subset) loaded from `fonts.css`, with preload for the two most critical files. No Google Fonts requests.

### Behavior
- **Bilingual:** Portuguese (default) and English, with `hreflang` tags and a language switch (flags) that keeps the reader in the same section and scroll position, using `sessionStorage` for a few seconds.
- **Responsive layout:** CSS Grid and Flexbox, with a hamburger menu on small screens. The menu only becomes a hamburger when JavaScript is available (`.js` class on `<html>`), so the links stay visible without it.
- **Navigation aids:** active section highlight in the menu (`aria-current="location"`) and a back-to-top button.
- **Project pages:** overview, objectives and methodology, embedded video, image gallery with click-to-enlarge, results and future work.
- **Certificates:** lightweight `webp` previews next to each certificate entry linking to the full PDF (hidden on small screens).
- **Publications:** paper entry with DOI link and, in the English version, a note that the paper is in Portuguese.
- **Availability badge & quick contact:** "Available for an internship" link to the contact section in the hero, visible email address and a one-click copy-email button.
- **Custom 404 page:** bilingual blueprint-style error page (`404.html`) with automatic language detection.

### Accessibility
- Skip link, semantic landmarks, `aria-*` attributes and visible keyboard focus.
- `prefers-reduced-motion` support (smooth scroll, menu underline and badge blink are disabled).
- Fallback when JavaScript is disabled.

### SEO and sharing
- Canonical URLs and `hreflang` alternates (`pt-BR`, `en`, `x-default`) on every page.
- Open Graph and Twitter Card metadata, with a 1200×630 preview image.
- `schema.org` `Person` structured data (JSON-LD) on both home pages.
- `sitemap.xml` with the alternate language of each URL, and `robots.txt` pointing to it.

---

## 🗂️ Project structure

```text
.
├── index.html            # Portuguese home page
├── 404.html              # Bilingual 404 error page
├── en/
│   ├── index.html        # English home page
│   └── projects/         # English project pages
├── projetos/             # Portuguese project pages
├── style.css             # Design tokens, base styles, layout, components and responsive rules
├── cards.css             # Blueprint cards, project media and SVG drawings (loaded after style.css)
├── fonts.css             # @font-face rules for the self-hosted fonts
├── site.js               # Footer year, active menu, back-to-top, language switch, copy-email
├── menu.js               # Hamburger menu
├── sitemap.xml
├── robots.txt
└── assets/
    ├── fonts/            # woff2 files (Barlow Condensed, IBM Plex Sans, IBM Plex Mono)
    ├── imagens/          # Project images (one folder per project)
    ├── certificados/     # Certificate PDFs and WebP previews
    ├── flags/            # Language switch icons
    └── ...               # Photo, favicon, social preview image, resume PDFs (PT and EN)
```

---

## 🛠️ Built with

- **HTML5**: semantic structure and accessible markup
- **CSS3**: custom properties, Grid, Flexbox, `:has()` and CSS-only graphics (grid paper, registration crosses)
- **Inline SVG**: technical drawings and process diagram
- **JavaScript (vanilla)**: small, dependency-free scripts for interactions
- **Self-hosted fonts**: Barlow Condensed, IBM Plex Sans and IBM Plex Mono
- **GitHub Pages**: continuous deployment and hosting

---

## 📬 Contact

- LinkedIn: [gabriel-monteiro-rosa](https://www.linkedin.com/in/gabriel-monteiro-rosa/)
- GitHub: [Monteeiro](https://github.com/Monteeiro)