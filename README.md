Portfolio Website

A lightweight, accessible, and high-performance portfolio website built with semantic HTML, modern CSS, and vanilla JavaScript.
Designed to be production-ready, dependency-light, and easily deployable on any static hosting platform.

Optional Eleventy (11ty) support is included for developers who prefer templating and content-driven workflows.

 Features

 Fast & minimal — no framework overhead

 Accessible by default — semantic HTML, keyboard-friendly, ARIA-aware

 Responsive — mobile-first layout

 Progressively enhanced — works without JavaScript

 Zero-build or Eleventy-powered

 SEO-ready — metadata, Open Graph, clean markup

 CI-validated — HTML & accessibility checks

 Project Overview

Purpose
Showcase projects, skills, and contact information with a clean, professional frontend.

Core files

index.html        # Main HTML entry
style.css         # Global styles & CSS variables
script.js         # Optional JS behaviors
CHANGELOG.md
LICENSE


Optional

src/              # Eleventy templates & content
.eleventy.js      # Eleventy configuration
.github/workflows/ci.yml


This repository can be deployed as-is or built via Eleventy.

 Quick Start (Static Preview — No Build)

Clone and preview instantly:

git clone <your-repo-url>
cd portfolio-website


Start a local server:

# Python
python -m http.server 5500

# or Node (via npx)
npx http-server -p 5500


Open:
 http://localhost:5500

Ideal for quick testing and CI parity.

 Eleventy (Optional Templating)

Eleventy is optional, not required.

Install & Run
npm install
npm run start   # Eleventy dev server
npm run build   # Builds static site into _site/

Notes

Uses npx @11ty/eleventy (no global install)

Output directory: _site/

Fully compatible with GitHub Pages, Netlify, Vercel

 Development Guidelines

Use semantic HTML (header, main, section, article)

Keep CSS content-first and variable-driven

Avoid JS for layout or critical UX

Prefer progressive enhancement

Keep bundle size small

 Testing, Linting & CI

A GitHub Actions workflow validates:

HTML correctness

Accessibility (Pa11y)

Run Locally
npx http-server -p 9000
npx html-validator-cli --file=index.html --verbose
npx pa11y http://127.0.0.1:9000

Suggested Enhancements

ESLint / Stylelint

Axe accessibility audits

Visual regression testing

 Deployment
Recommended Platforms

GitHub Pages

Netlify

Vercel

Zero-Build Deploy

Upload the repository root contents directly.

Eleventy Deploy
PlatformBuild CommandOutput
Netlifynpm run build_site
Vercelnpm run build_site
 Accessibility & SEO

Semantic landmarks & heading hierarchy

Keyboard navigation support

Skip-to-content link

Proper alt usage

Meta description & Open Graph tags

Tools:

Lighthouse

Pa11y

axe-core

 Performance Best Practices

Minify CSS & JS

Inline critical CSS

font-display: swap

Responsive images (srcset)

Use AVIF/WebP

Defer non-critical JS

<script src="/script.js" defer></script>

 Customization

Update branding via CSS variables

Edit content directly in index.html
or

Use Eleventy templates under src/

 Contributing

Fork the repository

Create a branch

git checkout -b feat/your-feature


Run validations

Open a PR with:

Clear description

Screenshots (for UI changes)

 License

Licensed under the MIT License.
See the LICENSE file for details.

 About

An accessible, high-performance portfolio built with HTML, CSS, and vanilla JavaScript.

Topics:
html css javascript portfolio frontend accessibility
