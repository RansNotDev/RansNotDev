<div align="center">

# `RansNotDev // PORTFOLIO_CORE_v2026 >_`

<p align="center">
  <a href="https://ransnotdev.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=38BDF8&center=true&vCenter=true&width=750&height=46&lines=Personal+Engineering+Portfolio+%26+Interactive+AI+Platform;React+18+%C2%B7+Vite+5+%C2%B7+Hand-Crafted+CSS+Design+Tokens;Serverless+AI+Proxy+with+9-Provider+Self-Healing+Fallback;Integrated+with+notDev.ai+Autonomous+Assistant" alt="Typing SVG Banner" />
  </a>
</p>

<p align="center">
  <b>Production Core for</b> <a href="https://ransnotdev.vercel.app"><b>ransnotdev.vercel.app</b></a> &nbsp;·&nbsp;
  <b>Deployed on Vercel Edge</b> &nbsp;·&nbsp;
  <span style="color:#22c55e;">● SYSTEM STATUS: PRODUCTION READY</span>
</p>

<!-- Fast Links -->
<p align="center">
  <a href="https://ransnotdev.vercel.app">
    <img src="https://img.shields.io/badge/⚡_Live_Site-ransnotdev.vercel.app-0284c7?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://linkedin.com/in/rany-boy-templado-b3a532306">
    <img src="https://img.shields.io/badge/LinkedIn-rany--boy--templado-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="public/Rany_Boy_Templado_Resume.pdf">
    <img src="https://img.shields.io/badge/📄_ATS_Résumé-Download_PDF-10b981?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Resume PDF" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Design_Tokens-Pure_CSS-e27743?style=flat-square" alt="CSS Tokens" />
  <img src="https://img.shields.io/badge/Security-CSP_Hardened-22c55e?style=flat-square" alt="CSP Hardened" />
</p>

</div>

---

### `// 01. ARCHITECTURE OVERVIEW`

This repository houses the source code for the personal engineering portfolio of **Rany Boy Templado** (Associate Software Engineer).

Unlike generic AI-templated portfolios, this project is engineered from scratch as a **demonstration of production web engineering**:
1. **Zero UI Framework Bloat**: 100% hand-crafted CSS variables and design tokens (`src/index.css`) with fluid typography, responsive layout grids, and full `prefers-reduced-motion` compliance.
2. **Autonomous AI Assistant (`notDev.ai`)**: Built with a dedicated pixel-art mascot sprite (`NotDevSprite.jsx`), pre-flight scope guardrails (`guardrails.js`), and a multi-provider serverless edge proxy (`api/chat.js`).
3. **Enterprise Migration & Systems Workbench**: Interactive signal matrix and hardware banks demonstrating real-world SAP S/4HANA migration pipelines, automation routers, and full-stack systems.
4. **Minimalist Comms Hub**: Interactive time beacon (Cavite, PH · GMT+8), tactile wave gesture counter, instant subject pills, and pre-formatted mailto dispatchers.

```text
╭────────────────────────────────────────────────────────────────────────────────────────╮
│                                SYSTEM ARCHITECTURE MAP                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   [ Client Browser ]                                                                   │
│        │                                                                               │
│        ├─── Static Assets (React 18 + Vite 5 + Vanilla CSS Design Tokens)              │
│        │                                                                               │
│        └─── notDev.ai Chat Widget                                                      │
│                 │                                                                      │
│                 ▼ (POST /api/chat - Strictly Same-Origin)                              │
│        [ Vercel Edge Serverless Proxy ]                                                │
│                 │                                                                      │
│                 ├─ Step 1: Pre-Flight Rule-Based Guardrails (Zero Provider Cost)       │
│                 ├─ Step 2: Rate Limiting & Payload Sanitization                        │
│                 ├─ Step 3: Secret Isolation (Zero API Keys Exposed to Browser)         │
│                 │                                                                      │
│                 ▼ (Ordered Fallback Chain w/ Per-Provider Cooldowns)                   │
│        ┌───────────────┬───────────────┬───────────────┬───────────────┐               │
│        ▼               ▼               ▼               ▼               ▼               │
│     [ Groq ]  ──►  [ Cerebras ]──►  [ Mistral ] ──► [ Gemini ]  ──►  [ Cohere ]...     │
│                                                                                        │
╰────────────────────────────────────────────────────────────────────────────────────────╯
```

---

### `// 02. INTERACTIVE EXPLORER DRAWERS`
> *Click on any drawer below to inspect specific architectural subsystems.*

<details>
<summary><b>🛡️ [ ▶ SECURITY: Multi-Provider Edge Proxy & Secret Isolation ]</b></summary>
<br>

Located at [`api/chat.js`](api/chat.js):
- **Secret Isolation**: Client browsers never receive, store, or transmit LLM API tokens. All authorization headers are injected in isolated serverless execution environments.
- **Self-Healing Fallback Array**:
  ```javascript
  const PROVIDERS = [
    'groq', 'cerebras', 'mistral', 'gemini',
    'sambanova', 'openrouter', 'cohere', 'github', 'huggingface'
  ];
  ```
  If provider $N$ throws a 429 (rate-limit) or 503 (overload), the request fails over seamlessly to provider $N+1$ within 250ms, placing provider $N$ on temporary cooldown.
- **Origin & Payload Enforcement**: Validates request headers to prevent unauthorized cross-origin embedding, enforces payload size caps, and filters prompt injections.

</details>

<details>
<summary><b>🎨 [ ▶ DESIGN SYSTEM: Hand-Crafted CSS & Theme Tokens ]</b></summary>
<br>

- **Color Tokens**: CSS custom properties (`--bg`, `--card`, `--border`, `--text`, `--accent`, `--pulse`) dynamically flipped via light/dark theme switch with native `View Transitions` cross-fade.
- **Font Stack**:
  - Display: `Space Grotesk`, `system-ui`, sans-serif
  - Sans: `Inter`, `Segoe UI`, -apple-system, sans-serif
  - Mono: `JetBrains Mono`, `Fira Code`, monospace
- **Micro-Interactions**: Ambient gradient cards, coupled circuit glowing borders, tactile emoji wave reactions, and smooth scroll anchors.

</details>

<details>
<summary><b>📁 [ ▶ CODEBASE MAP: Structural Hierarchy ]</b></summary>
<br>

```text
RansNotDev/
├── api/
│   └── chat.js                 # Serverless AI proxy (keys isolated server-side)
├── public/
│   ├── Rany_Boy_Templado_Resume.pdf  # ATS-optimized 2-page résumé
│   ├── notdev-ai-sprite.png    # Custom pixel-art mascot sprite
│   └── projects/               # High-resolution architectural project mockups
├── src/
│   ├── components/
│   │   ├── Nav.jsx             # Accessible header & theme toggle
│   │   ├── Hero.jsx            # Editorial introduction & fast action triggers
│   │   ├── AboutSection.jsx    # Experience journey & Interactive Technical Workbench
│   │   ├── Projects.jsx        # Production labs showcase with private link feedback
│   │   ├── Certifications.jsx  # Verified credentials & filterable badges
│   │   ├── Footer.jsx          # Minimalist contact card, time beacon & draft notes
│   │   ├── Chat.jsx            # notDev.ai interactive drawer & chat engine
│   │   └── NotDevSprite.jsx    # Animated CSS sprite mascot component
│   ├── data/
│   │   ├── portfolioData.js    # Comprehensive ground-truth career knowledge base
│   │   └── guardrails.js       # Fast pre-flight regex gates for topic filtering
│   ├── services/
│   │   └── chatApi.js          # Client-side API connector with timeout handling
│   ├── App.jsx                 # Root composition & event bridges
│   └── index.css               # Design tokens, typography & animation keyframes
├── scripts/
│   └── generate-resume.cjs     # Automated headless PDF compiler (100% ATS-verified)
├── vercel.json                 # Security headers (CSP, HSTS) & edge route rewrite rules
└── vite.config.js              # Production build optimization
```

</details>

---

### `// 03. LOCAL DEVELOPMENT & TESTING`

#### Prerequisites
- Node.js `v18+` (tested on Node v24 LTS)
- npm `v9+`

#### 1. Clone & Install
```bash
git clone https://github.com/RansNotDev/RansNotDev.git
cd RansNotDev
npm install
```

#### 2. Run Locally
```bash
# Frontend development server (instant HMR)
npm run dev

# Full-stack local development (including serverless /api/chat proxy):
npx vercel dev
```

#### 3. Production Compilation
```bash
# Validates TypeScript/JSX and compiles minified bundle to dist/
npm run build

# Preview production build locally:
npm run preview
```

#### 4. Regenerate ATS Résumé PDF
```bash
# Uses headless browser engine to compile Resume/Rany_Boy_Templado_Resume.html
node scripts/generate-resume.cjs
```

---

### `// 04. PRODUCTION DEPLOYMENT & ENVIRONMENT VARS`

The application is deployed on **Vercel Edge**. To configure the AI provider fallback keys in your deployment:

1. In Vercel Project Settings → **Environment Variables**, configure any combination of the following keys:
   - `GROQ_API_KEY`
   - `CEREBRAS_API_KEY`
   - `MISTRAL_API_KEY`
   - `GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
   - `COHERE_API_KEY`
2. The proxy auto-detects whichever keys are available and dynamically mounts them to the active fallback chain.

---

### `// 05. AUTHOR & CONTACT`

**Rany Boy Templado**  
*Associate Software Engineer @ Accenture*  
Trece Martires City, Cavite, Philippines  
- **Live Portfolio**: [ransnotdev.vercel.app](https://ransnotdev.vercel.app)
- **LinkedIn**: [linkedin.com/in/rany-boy-templado-b3a532306](https://linkedin.com/in/rany-boy-templado-b3a532306)
- **Email**: [ranyboytemplado@gmail.com](mailto:ranyboytemplado@gmail.com)

---

<div align="center">
  <sub>Built with purpose · Deployed on Vercel · Powered by persistence</sub><br>
  <sub>© 2026 RansNotDev. All rights reserved.</sub>
</div>
