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

- **Bilingual:** Portuguese (default) and English, with `hreflang` tags and a language switch that keeps the reader in the same section and scroll position.
- **Responsive layout:** CSS Grid and Flexbox, with a hamburger menu on small screens.
- **Accessibility:** skip link, semantic landmarks, `aria-*` attributes, visible keyboard focus, `prefers-reduced-motion` support and a fallback when JavaScript is disabled.
- **Visual effects:** liquid metal shader in the hero (WebGL2) and animated blue gradient cards that follow the cursor.
- **Navigation aids:** active section highlight in the menu and a back-to-top button.
- **Project pages:** each project has its own page with overview, methodology, images, embedded video, results and future work.
- **Certificates:** PDF previews embedded next to each certificate entry.
- **SEO and sharing:** canonical URLs, Open Graph and Twitter Card metadata.

---

## 🗂️ Project structure

```text
.
├── index.html            # Portuguese home page
├── en/
│   ├── index.html        # English home page
│   └── projects/         # English project pages
├── projetos/             # Portuguese project pages
├── style.css             # Base styles, layout and responsive rules
├── cards.css             # Animated gradient cards
├── site.js               # Active menu, card glow, back-to-top, language switch
├── menu.js               # Hamburger menu
├── hero-metal.js         # Liquid metal configuration for the hero
├── paper-shaders.js      # Paper Shaders library (shader engine)
└── assets/
    ├── imagens/          # Project images
    ├── certificados/     # Certificate PDFs
    ├── flags/            # Language switch icons
    └── ...               # Photo, favicon, social preview image, resume PDFs
```

---

## 🛠️ Built with

- **HTML5**: semantic structure and accessible markup
- **CSS3**: custom properties, responsive layout and animations
- **JavaScript (vanilla)**: small, dependency-free scripts for interactions
- **[Paper Shaders](https://github.com/paper-design/shaders)**: Liquid Metal shader used in the hero
- **Google Fonts**: Space Grotesk, Inter and JetBrains Mono
- **GitHub Pages**: continuous deployment and hosting

---

## 🚀 Running locally

No installation is needed. Clone the repository and serve the folder with any static server, for example:

```bash
git clone https://github.com/Monteeiro/monteeiro.github.io.git
cd monteeiro.github.io
python -m http.server 8000
```

Then open `http://localhost:8000`. A local server is recommended over opening `index.html` directly, because the PDF previews and the language switch behave better over HTTP.

---

## ➕ Adding a new project

1. Duplicate `projetos/projeto-1.html` and `en/projects/project-1.html`.
2. Replace the texts, images and video link.
3. Update the matching card in both `index.html` files.
4. Add the new URLs to `sitemap.xml`.

---

## 📬 Contact

- LinkedIn: [gabriel-monteiro-rosa](https://www.linkedin.com/in/gabriel-monteiro-rosa/)
- GitHub: [Monteeiro](https://github.com/Monteeiro)