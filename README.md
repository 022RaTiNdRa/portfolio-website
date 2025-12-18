# 🚀 Portfolio Website

A lightweight, accessible, and high-performance portfolio website built with semantic HTML, modern CSS, and vanilla JavaScript. Designed to be production-ready, dependency-light, and easily deployable on any static hosting platform such as GitHub Pages, Netlify, or Vercel.

This project emphasizes accessibility, performance, clean semantics, and minimal dependencies. Optional Eleventy (11ty) support is included for developers who prefer templating and content-driven workflows, but it is not required to run or deploy the site.

## ✨ Features

- ⚡ Fast and minimal — no framework overhead  
- ♿ Accessible by default — semantic HTML and keyboard navigation  
- 📱 Fully responsive — mobile-first layout  
- 🧩 Progressive enhancement — works without JavaScript  
- 🚀 Zero-build or Eleventy-powered workflow  
- 🔍 SEO-ready — clean markup and metadata  
- 🧪 CI-validated — HTML and accessibility checks  

## 📁 Project Overview

### 🎯 Purpose

The purpose of this project is to showcase projects, skills, and contact information with a clean, professional frontend while maintaining strong accessibility, SEO, and performance standards.

### 🧱 Core Files

    index.html        Main HTML entry
    style.css         Global styles and CSS variables
    script.js         Optional JavaScript behaviors
    CHANGELOG.md
    LICENSE

### 🧩 Optional Eleventy Structure

    src/                          Eleventy templates and content
    .eleventy.js                  Eleventy configuration
    .github/workflows/ci.yml      CI validation workflow

The repository can be deployed as-is without any build step or built using Eleventy for more advanced workflows.

## ⚡ Quick Start — Static Preview (No Build)

Clone the repository and navigate into it:

    git clone <your-repo-url>
    cd portfolio-website

Start a local static server:

    Python 3:
    python -m http.server 5500

    Node (via npx):
    npx http-server -p 5500

Open the following URL in your browser:

    http://localhost:5500

This mirrors how the site is validated in CI and is ideal for quick testing.

## 🧱 Eleventy (Optional Templating)

Eleventy is optional and not required to run the site.

Install dependencies:

    npm install

Run the development server:

    npm run start

Build the site for production:

    npm run build

Notes:
- 📦 Runs via npx (no global install required)  
- 📂 Output directory: _site  
- 🌍 Compatible with GitHub Pages, Netlify, and Vercel  

## 🛠 Development Workflow

- 🧠 Use semantic HTML elements (header, main, section, article)  
- 🎨 Keep CSS content-first and variable-driven  
- 🚫 Avoid JavaScript for layout or critical UX  
- 🧩 Prefer progressive enhancement  
- 📦 Keep bundles small and maintainable  

## 🧪 Testing, Linting & CI

A GitHub Actions workflow validates:
- ✅ HTML correctness  
- ♿ Accessibility using Pa11y  

Run the same checks locally:

    npx http-server -p 9000
    npx html-validator-cli --file=index.html --verbose
    npx pa11y http://127.0.0.1:9000

Recommended future improvements:
- 🧹 ESLint and Stylelint  
- ♿ axe-core accessibility audits  
- 👀 Visual regression testing  

## 🌍 Deployment

Supported platforms:
- 🐙 GitHub Pages  
- 🔺 Netlify  
- ▲ Vercel  

Zero-build deployment:
- 📤 Upload repository root contents directly

Eleventy deployment:
- 🛠 Build command: npm run build  
- 📂 Output directory: _site  

## ♿ Accessibility & SEO

- 🧭 Semantic landmarks and proper heading hierarchy  
- ⌨️ Keyboard navigation support  
- 🔗 Skip-to-content link  
- 🖼 Proper alt text usage (alt="" for decorative images)  
- 🔍 Meta description and Open Graph / Twitter metadata  

Recommended tools:
- 💡 Lighthouse  
- 🧪 Pa11y  
- 🪓 axe-core  

## ⚡ Performance Optimizations

- 📦 Minify CSS and JavaScript  
- 🎯 Inline critical CSS for above-the-fold content  
- 🔤 Use font-display: swap  
- 🖼 Optimize images using AVIF or WebP  
- 📐 Responsive images with srcset  
- ⏳ Defer non-critical JavaScript  

Example:

    <script src="/script.js" defer></script>

## 🎨 Customization

- 🎨 Update branding and theme via CSS variables  
- ✏️ Edit content directly in index.html  
- 🧩 Customize templates under src when using Eleventy  

## 🤝 Contributing

1. 🍴 Fork the repository  
2. 🌿 Create a feature branch  

       git checkout -b feat/your-feature  

3. ✅ Run validations locally  
4. 🔁 Open a pull request with a clear description and screenshots for UI changes  

## 📄 License

📜 This project is licensed under the MIT License. See the LICENSE file for details.

## 📌 About

An accessible, performant portfolio website built with HTML, CSS, and vanilla JavaScript.

🏷 Topics:  
html, css, javascript, portfolio, frontend, accessibility
