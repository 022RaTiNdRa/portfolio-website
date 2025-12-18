# Contributing

Thank you for considering contributing to this portfolio repository. Contributions are welcome and appreciated — whether it's a typo fix, a UI improvement, accessibility enhancement, or CI/workflow update.

How to contribute

1. Fork the repository and create a topic branch from `main`:

```bash
git clone https://github.com/022RaTiNdRa/portfolio-website.git
git checkout -b feat/short-description
```

2. Make small, focused changes. Keep commits atomic and topic-focused.

3. Run local validations before opening a Pull Request:

```powershell
npx http-server -p 9000
npx html-validator-cli --file=index.html --verbose
npx pa11y http://127.0.0.1:9000
```

4. Push your branch and open a pull request against `main` with a clear title and description describing the change and how to test it.

Commit message style

- Use present-tense, short summary in the first line (max 72 chars).
- Optionally include a longer description and testing notes in the body.

Example:

```
fix: correct heading level on About section

Ensure proper semantic order and run accessibility checks.
```

PR checklist

- [ ] Changes are focused and small
- [ ] HTML validates with the W3C validator
- [ ] Basic accessibility checks (Pa11y / Lighthouse) pass
- [ ] Visual/functional regression tested locally
- [ ] Update `CHANGELOG.md` if the change affects public behavior

Code style

- Keep CSS simple and use variables for theming.
- Keep JavaScript vanilla and unobtrusive; prefer progressive enhancement.

If you're unsure about a change or want to propose a larger refactor, open an issue first to discuss scope and approach.

Thanks — we appreciate your help in making the site better and more accessible.
