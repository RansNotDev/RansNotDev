<div align="center">

# `RansnotDEV >_`

### Rany Boy Templado — Associate Software Engineer

*SAP Data Migration · Web Applications · Data Quality*

<br/>

[![Live Site](https://img.shields.io/badge/Live-ransnotdev.vercel.app-e27743?style=for-the-badge&logo=vercel&logoColor=white)](https://ransnotdev.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ranyboytemplado-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ranyboytemplado)
[![Instagram](https://img.shields.io/badge/Instagram-ranyboytemplado-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/ranyboytemplado)
[![Email](https://img.shields.io/badge/Email-ranyboytemplado@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ranyboytemplado@gmail.com)

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-Personal-8fbf91?style=flat-square)

</div>

---

## `>` About this repo

This is the source for my personal portfolio at **[ransnotdev.vercel.app](https://ransnotdev.vercel.app)** — a fast, accessible, single-page site built with **React + Vite** and deployed on **Vercel**. It doubles as a small full-stack project: the standout feature is a **scoped AI assistant** backed by a serverless function that keeps API keys off the browser and falls back across multiple providers so it stays up even when a free tier runs out.

> *"Code is not just instructions for a machine — it's a solution waiting to make someone's life easier."*

---

## `>` Highlights

- **AI portfolio assistant** — a chat widget scoped to my portfolio and tech-career advice, refusing anything off-topic before it ever hits a provider.
- **Server-side AI proxy** — API keys live only on the server; requests run through an ordered provider fallback chain with per-provider timeouts and cooldowns.
- **Theme system** — light/dark with a `View Transitions` cross-fade and full `prefers-reduced-motion` support.
- **Motion, done tastefully** — scroll-reveal sections, an animated capabilities grid, a contribution-style layout, and a custom cursor (mouse users only).
- **Accessibility first** — semantic landmarks, focus management in modals, keyboard support, and a `<noscript>` fallback.
- **SEO ready** — Open Graph, Twitter cards, canonical URL, and schema.org structured data.
- **Hardened headers** — strict Content-Security-Policy, HSTS, and sensible cache rules via `vercel.json`.

---

## `>` Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

**Frontend** — React 18, Vite 5, hand-written CSS (design tokens, no UI framework)
**Backend** — Vercel serverless function (`api/chat.js`), multi-provider AI fallback
**Tooling** — Git, GitHub, VS Code, GitHub Actions

---

## `>` Project Structure

```text
RansNotDev/
├── api/
│   └── chat.js              # Serverless AI proxy (keys stay server-side)
├── public/                  # Static assets (images, résumé, favicon)
├── src/
│   ├── components/          # Nav, Hero, About, Projects, Certifications, Footer, Chat, Cursor
│   ├── data/                # Portfolio knowledge + chat guardrails
│   ├── services/            # Client-side chat API wrapper
│   ├── App.jsx
│   └── main.jsx
├── vercel.json              # Security headers + function config
└── vite.config.js
```

---

## `>` Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Add your AI keys (server-side only)
cp .env.example .env        # then fill in the values

# 3a. Frontend only (chat API will not run under plain Vite)
npm run dev

# 3b. Full stack incl. the /api chat function
npx vercel dev
```

Build for production:

```bash
npm run build && npm run preview
```

> The AI chat lives in a Vercel serverless function, so use `vercel dev` (not `npm run dev`) if you want to exercise the assistant locally. Keys go in a git-ignored `.env` for local work, and in **Vercel → Project Settings → Environment Variables** in production.

---

## `>` The AI Assistant

- **Scope guardrails** ([`src/data/guardrails.js`](src/data/guardrails.js)) — a fast rule-based gate answers only portfolio and tech-career questions, and returns a fixed reply for anything else *before* any provider is called (so off-topic messages cost nothing).
- **Provider fallback** ([`api/chat.js`](api/chat.js)) — tries providers in order; when one hits its limit it's marked exhausted and skipped on a cooldown, so the next takes over automatically.
- **Safety** — same-origin check, rate limiting, request-size limits, and no keys ever exposed to the browser.

---

## `>` Featured Work

| Project | What it does | Stack |
|---|---|---|
| 🤖 **This Portfolio + AI Chat** | React portfolio with a scoped, server-routed AI assistant | React · Vite · Vercel |
| 👁️ **Computer Vision Object Detection** | YOLO + OpenCV video detection with labeled bounding boxes | Python · YOLO · OpenCV |
| 🏥 **Dental Clinic Management** | Appointments, patient records, reminders, admin reporting | PHP · MySQL · Bootstrap |
| 🏠 **Real Estate Platform** | Multi-role property viewings (agent · client · admin) | PHP · MySQL · AJAX |
| 🌤️ **Weather Forecast Dashboard** | Geolocation, 7-day forecast, hourly breakdowns | JavaScript · OpenWeather API |

---

## `>` GitHub Stats

<div align="center">

![Rany's GitHub Stats](https://github-readme-stats.vercel.app/api?username=RansNotDev&show_icons=true&theme=tokyonight&hide_border=true&title_color=e27743&icon_color=e27743)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=RansNotDev&layout=compact&theme=tokyonight&hide_border=true&title_color=e27743)

</div>

---

## `>` Contribution Snake

<div align="center">

![Snake animation](https://raw.githubusercontent.com/RansNotDev/RansNotDev/output/github-contribution-grid-snake-dark.svg)

</div>

---

<div align="center">

*Built with purpose · Powered by persistence*

`// coded → graduated → BPO → back to tech`

[![Profile views](https://komarev.com/ghpvc/?username=ransnotdev&color=e27743&style=flat-square)](https://ransnotdev.vercel.app)

</div>
