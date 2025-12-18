# Portfolio Website

This repository is a compact, production-ready static portfolio built with semantic HTML, modern CSS, and optional Eleventy support for templating. The project emphasizes accessibility, performance, and a minimal-dependency workflow.

This README is an advanced, practical guide for developers and maintainers: running the site, developing locally, testing, deploying, and extending the project.

---

**Table of contents**
- Project overview
- Quick start (static preview)
- Eleventy (optional templating)
- Development workflow
- Testing, linting & CI
- Deployment
- Accessibility & SEO
- Performance optimizations
- Customization & structure
- Contributing & license

---

## Project overview

- Purpose: A lightweight, accessible, and high-performance portfolio to showcase projects, skills and contact information.
- Core files: `index.html`, `style.css`, `script.js`, `CHANGELOG.md`, `LICENSE`.
- Optional: Eleventy scaffold under `src/` with `.eleventy.js` for templating.

This repository is designed to be hostable on GitHub Pages, Netlify, Vercel or any static hosting provider.

## Quick start — static preview (no build)

1. Clone the repository and open it locally:

```powershell
git clone <your-repo-url>
cd portfolio-website
```

2. Preview the site without any build tools:

```powershell
# Python 3 built-in static server
python -m http.server 5500
# or using Node (no install required via npx)
npx http-server -p 5500
# then open http://localhost:5500
```

These commands are useful for quick checks and mirror what CI uses when validating pages.

## Eleventy (optional templating)

This repo includes an optional Eleventy scaffold to simplify templating and content updates.

Install and run Eleventy locally:

```powershell
npm install
npm run start    # runs eleventy with --serve
npm run build    # builds static site into _site/
```

Notes:
- `start` uses `npx @11ty/eleventy --serve` so a global install isn't required.
- Output directory is `_site` by default (configured in `.eleventy.js`).

## Development workflow

- Keep markup semantic and content-first.
- Use `style.css` for global theming and variables. Keep critical styles minimal and defer heavy utilities to production builds.
- Keep `script.js` focused and small; prefer progressive enhancement.
- For more advanced workflows, add an npm-based toolchain (build, lint, image optimization).

## Testing, linting & CI

This repository contains a basic GitHub Actions workflow at `.github/workflows/ci.yml` that:

- checks out the repo
- spins up a static server
- runs an HTML validator and a Pa11y accessibility check

You can run the same checks locally:

```powershell
npx http-server -p 9000
npx html-validator-cli --file=index.html --verbose
npx pa11y http://127.0.0.1:9000
```

Consider adding these to CI in future iterations:
- ESLint/Stylelint
- Visual regression tests
- Automated accessibility audits (axe)

## Deployment

Recommended static hosts:

- GitHub Pages: push to `main` and enable Pages (or use Actions to build + deploy).
- Netlify: connect the repo; set build command `npm run build` (if using Eleventy) and publish directory `_site`.
- Vercel: connect repo and configure to run `npm run build` and serve the static output.

For zero-build deployments, simply upload repository root contents.

## Accessibility & SEO

- Use semantic headings and landmarks.
- Provide `alt` text for images; `alt=""` for decorative assets.
- Include a `meta description` and Open Graph/Twitter metadata in `<head>` for sharing.
- Add a `skip-to-content` link for keyboard users.

Lighthouse and Pa11y are recommended for ongoing accessibility checks.

## Performance optimizations

- Minify CSS and JS for production builds.
- Inline critical CSS for the above-the-fold experience.
- Use `preload` for key fonts and `font-display: swap`.
- Optimize images (AVIF/WebP) and use responsive `srcset`.
- Serve via CDN/HTTP/2 for best results.

Example: defer non-critical JS

```html
<script src="/script.js" defer></script>
```

## Project structure & customization

- `index.html` — primary HTML entry
- `style.css` — global css and variables
- `script.js` — optional JS behaviors
- `src/` — Eleventy templates (if present)
- `.eleventy.js` — Eleventy config
- `.github/workflows/ci.yml` — CI validation

To customize branding, update CSS variables and template content under `src/` (or `index.html`).

## Contributing

If you accept contributions:

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-change`
3. Run validations locally and include screenshots for UI changes
4. Open a PR with a clear description and testing steps

## License

This project is distributed under the MIT License. See the `LICENSE` file in the repository root.

---

If you'd like, I can also:
- add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`,
- expand the CI workflow to run linting and visual tests, or
- generate seeding JSON for projects and wire them into Eleventy templates.

Tell me which task you want next and I'll proceed.
