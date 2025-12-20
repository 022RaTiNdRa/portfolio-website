# 🚀⚡ PORTFOLIO WEBSITE — FULL-STACK | ACCESSIBLE | PRODUCTION-READY ⚡🚀

> 💼 A modern, accessible, high-performance **full-stack portfolio website** built with **semantic HTML**, **modern CSS**, **vanilla JavaScript**, and a **Node.js + Express backend** with real email functionality.

This project is **dependency-light**, **production-ready**, and designed to showcase **frontend excellence + real backend engineering**.  
It combines a **clean, accessible UI** with a **fully working contact form** that sends **emails + auto-replies** using **Gmail App Passwords**.

Optional **Eleventy (11ty)** support is included for content-driven workflows — but **ZERO build is required** to run or deploy.

---

## ✨💎 FEATURES OVERVIEW

### 🎨 FRONTEND
- ⚡ Ultra-fast — no framework overhead
- ♿ Accessibility-first (semantic HTML + keyboard navigation)
- 📱 Fully responsive (mobile-first)
- 🧩 Progressive enhancement (works without JS)
- 🔍 SEO-ready markup & metadata
- 🚀 Zero-build static deployment
- 🎯 Smooth scrolling & subtle animations

### 🧠 BACKEND
- 🔌 Node.js + Express REST API
- 📩 Fully working contact form
- 📧 Email notification to admin
- 🤖 Auto-reply confirmation to user
- 🔐 Secure secrets via `.env`
- 🌍 CORS-enabled frontend → backend

### 🧪 QUALITY & TOOLING
- 🧪 CI-validated HTML
- ♿ Accessibility checks (Pa11y)
- ⚡ Performance-oriented structure
- 📦 Minimal dependencies

---

## 🎯🧭 PROJECT PURPOSE

To showcase **projects, skills, and contact information** with a **professional frontend** while enforcing:

- ♿ Accessibility best practices  
- 🔍 SEO & semantic correctness  
- ⚡ Performance optimizations  
- 🧠 Real-world backend integration  

This is **not just a UI portfolio** — it’s a **real full-stack system**.

---

## 🗂️📁 PROJECT STRUCTURE

```
portfolio-website/
├── frontend/
│   ├── index.html        # Main HTML entry
│   ├── style.css         # Global styles & variables
│   └── script.js         # JS interactions & API calls
│
├── backend/
│   ├── server/
│   │   └── index.js      # Express server
│   ├── node_modules/
│   ├── package.json
│   ├── .env              # Environment variables
│   └── .gitignore
│
├── src/                  # (Optional Eleventy)
│   ├── templates
│   └── content
│
├── .github/workflows/
│   └── ci.yml            # CI validation
│
├── CHANGELOG.md
├── LICENSE
└── README.md
```

---

## ⚡🚀 QUICK START — STATIC PREVIEW (NO BUILD)

Clone the repo:

```
git clone <your-repo-url>
cd portfolio-website
```

Run a local server:

```
python -m http.server 5500
```

or

```
npx http-server -p 5500
```

Open:

```
http://localhost:5500
```

✔ Mirrors CI validation  
✔ Perfect for quick testing  

---

## 🧱🧩 ELEVENTY (OPTIONAL — NOT REQUIRED)

Install dependencies:

```
npm install
```

Run dev server:

```
npm run start
```

Build for production:

```
npm run build
```

📦 Output: `_site`  
🌍 Works with GitHub Pages / Netlify / Vercel  

---

## ⚙️🖥️ BACKEND SETUP

Install backend dependencies:

```
cd backend
npm install
```

---

## 🔐🔑 ENVIRONMENT VARIABLES (`.env`)

Create **`backend/.env`**:

```
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_me

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_TO=your_gmail@gmail.com
```

⚠️ Rules:
- ❌ NEVER use Gmail password
- ✅ Use Gmail **App Password**
- ❌ NEVER commit `.env`

---

## 🔑📧 GMAIL APP PASSWORD SETUP

1️⃣ https://myaccount.google.com/security  
2️⃣ Enable **2-Step Verification**  
3️⃣ Open **App passwords**  
4️⃣ App → Mail  
5️⃣ Device → Other  
6️⃣ Name → `Portfolio Contact Form`  
7️⃣ Copy **16-character password**  
8️⃣ Paste into `EMAIL_PASS`

---

## ▶️🚦 RUN BACKEND SERVER

```
node server/index.js
```

Expected output:

```
Server running on http://localhost:5000
```

---

## 🔄📡 API ENDPOINTS

```
GET  /                → Health check
GET  /api/hello       → Test API
POST /api/contact     → Contact form
```

### Example request:

```
{
  "name": "John Doe",
  "email": "john@email.com",
  "message": "Hello!"
}
```

---

## 📩🤝 CONTACT FORM FLOW

1️⃣ User submits form  
2️⃣ Frontend sends data via Fetch  
3️⃣ Backend:
   - 📧 Sends email to admin
   - 🤖 Sends auto-reply to user  
4️⃣ Frontend shows success / error UI  

---

## 🛠️🧠 DEVELOPMENT PRINCIPLES

- Semantic HTML (`header`, `main`, `section`, `article`)
- Content-first, variable-driven CSS
- Minimal JavaScript
- Progressive enhancement
- Small, maintainable bundles

---

## 🧪🧯 TESTING, LINTING & CI

CI validates:
- ✅ HTML correctness
- ♿ Accessibility (Pa11y)

Local testing:

```
npx http-server -p 9000
npx html-validator-cli --file=index.html --verbose
npx pa11y http://127.0.0.1:9000
```

Future upgrades:
- ESLint / Stylelint
- axe-core audits
- Visual regression tests

---

## ♿🔍 ACCESSIBILITY & SEO

- Semantic landmarks
- Keyboard navigation
- Skip-to-content link
- Proper `alt` usage
- Open Graph & Twitter metadata

Tools:
- Lighthouse
- Pa11y
- axe-core

---

## ⚡📈 PERFORMANCE OPTIMIZATION

- Minified CSS & JS
- Inline critical CSS
- `font-display: swap`
- AVIF / WebP images
- `srcset` responsive images
- Deferred JS loading

```
<script src="/script.js" defer></script>
```

---

## 🌍🚀 DEPLOYMENT

### Frontend
- 🐙 GitHub Pages
- 🔺 Netlify
- ▲ Vercel

### Backend
- 🚄 Render
- 🚀 Railway
- ✈️ Fly.io

Production API switch:

```
const API_BASE_URL = "https://your-backend-url";
```

---

## 🤝🧩 CONTRIBUTING

1️⃣ Fork repository  
2️⃣ Create branch  

```
git checkout -b feat/your-feature
```

3️⃣ Run validations  
4️⃣ Open PR with description  

---

## 📬📫 CONTACT

- 🐙 GitHub: https://github.com/022RaTiNdRa  
- 💼 LinkedIn: https://www.linkedin.com/in/ratindra-parate/  
- 📧 Email: ratindra24@gmail.com  

---

## 📜⚖️ LICENSE

MIT License — see LICENSE file.

---

## 📌✨ ABOUT

A **production-grade, accessible, full-stack portfolio website** built with:

**HTML · CSS · JavaScript · Node.js · Express · Nodemailer**

🏷️ Topics:  
`html` `css` `javascript` `portfolio` `frontend` `accessibility` `nodejs` `express` `nodemailer` `fullstack`

🔥 Built to impress recruiters — and actually work.
