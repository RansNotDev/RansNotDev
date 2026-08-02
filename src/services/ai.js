import { PORTFOLIO_CONTEXT } from '../data/portfolioContext'

// ═══════════════════════════════════════════════════════════════════════════════
// AI PROVIDER FALLBACK CHAIN
// Providers are tried in order. If one fails (429, 5xx, network error),
// the next provider is attempted automatically.
// ═══════════════════════════════════════════════════════════════════════════════

const PROVIDERS = [
  {
    name: 'Groq',
    key: () => import.meta.env.VITE_GROQ_API_KEY,
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: () => import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'Gemini',
    key: () => import.meta.env.VITE_GEMINI_API_KEY,
    url: (key) => {
      const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'
      return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`
    },
    model: () => import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash',
    validate: (key) => key && key.length > 10,
    isGemini: true,
  },
  {
    name: 'OpenRouter',
    key: () => import.meta.env.VITE_OPENROUTER_API_KEY,
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: () => import.meta.env.VITE_OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
    validate: (key) => key && key.length > 10,
    extraHeaders: () => ({
      'HTTP-Referer': window.location.origin,
      'X-Title': 'RansnotDEV Portfolio',
    }),
  },
  {
    name: 'Cerebras',
    key: () => import.meta.env.VITE_CEREBRAS_API_KEY,
    url: 'https://api.cerebras.ai/v1/chat/completions',
    model: () => import.meta.env.VITE_CEREBRAS_MODEL || 'llama3.1-8b',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'Mistral',
    key: () => import.meta.env.VITE_MISTRAL_API_KEY,
    url: 'https://api.mistral.ai/v1/chat/completions',
    model: () => import.meta.env.VITE_MISTRAL_MODEL || 'mistral-small-latest',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'Together',
    key: () => import.meta.env.VITE_TOGETHER_API_KEY,
    url: 'https://api.together.xyz/v1/chat/completions',
    model: () => import.meta.env.VITE_TOGETHER_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'DeepInfra',
    key: () => import.meta.env.VITE_DEEPINFRA_API_KEY,
    url: 'https://api.deepinfra.com/v1/openai/chat/completions',
    model: () => import.meta.env.VITE_DEEPINFRA_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'Fireworks',
    key: () => import.meta.env.VITE_FIREWORKS_API_KEY,
    url: 'https://api.fireworks.ai/inference/v1/chat/completions',
    model: () => import.meta.env.VITE_FIREWORKS_MODEL || 'accounts/fireworks/models/llama-v3p1-8b-instruct',
    validate: (key) => key && key.length > 10,
  },
  {
    name: 'HuggingFace',
    key: () => import.meta.env.VITE_HUGGINGFACE_TOKEN,
    url: () => {
      const model = import.meta.env.VITE_HUGGINGFACE_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct'
      return `https://api-inference.huggingface.co/models/${model}/v1/chat/completions`
    },
    model: () => import.meta.env.VITE_HUGGINGFACE_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct',
    validate: (key) => key && key.length > 10,
  },
]

// ── Track exhausted providers for this session ─────────────────────────────
const exhaustedProviders = new Set()

// ── Detect if question is about Rany (skip API, answer locally) ────────────
const RANY_PATTERNS = [
  /\brany\b/i,
  /\bransnotdev\b/i,
  /your (name|stack|skill|project|experience|background|education|location|email|contact|job|work|role|status)/i,
  /who (are you|is rany|is he)/i,
  /tell me about (you|rany|yourself|him)/i,
  /\b(open to work|available|hire|hiring|portfolio|resume|cv)\b/i,
  /\b(project|appointment|weather app|real estate|object detect|computer vision)\b/i,
  /\b(bsit|cavite|philippines|teleperformance|foundever|global strategic|accenture|perpetual help)\b/i,
  /\b(tech stack|html|css|javascript|php|python|mysql|bootstrap|sap|abap)\b/i,
  /\b(contact|email|linkedin|github|instagram|social|reach|connect)\b/i,
  /\b(cert|certification|hackerrank|freecodecamp|codechum)\b/i,
  /how (can i|do i|to) (contact|reach|find|connect|get in touch)/i,
  /where (can i|do i) (find|reach|contact)/i,
  /get in touch/i,
  /give me.*(contact|email|social|link)/i,
  /here.*(contact|email|social|link)/i,
]

function isAboutRany(message) {
  return RANY_PATTERNS.some(p => p.test(message))
}

// ── Detect if question is developer/tech related (allow) ───────────────────
const ALLOWED_TOPICS = [
  // Programming languages & frameworks
  /\b(code|coding|program|programming|developer|development|software|engineer)\b/i,
  /\b(javascript|typescript|python|php|java|c\+\+|c#|ruby|rust|go|swift|kotlin|dart)\b/i,
  /\b(react|vue|angular|svelte|next\.?js|node\.?js|express|django|flask|laravel|spring)\b/i,
  /\b(html|css|sass|scss|tailwind|bootstrap|jquery)\b/i,
  // Tech concepts
  /\b(api|rest|graphql|websocket|http|server|client|frontend|backend|fullstack|full.?stack)\b/i,
  /\b(database|sql|mysql|postgres|mongo|redis|firebase|supabase)\b/i,
  /\b(git|github|gitlab|docker|kubernetes|devops|ci\/cd|deploy|hosting|vercel|netlify)\b/i,
  /\b(algorithm|data.?structure|oop|design.?pattern|solid|dry|kiss|mvc|architecture)\b/i,
  /\b(debug|error|bug|fix|issue|problem|solution|optimize|performance|refactor)\b/i,
  /\b(test|testing|unit.?test|integration|jest|vitest|cypress|selenium)\b/i,
  /\b(variable|function|class|object|array|loop|condition|recursion|async|promise|callback)\b/i,
  /\b(npm|yarn|pnpm|webpack|vite|babel|eslint|prettier|linter)\b/i,
  /\b(linux|terminal|command.?line|bash|shell|powershell)\b/i,
  /\b(cloud|aws|azure|gcp|serverless|lambda|microservice)\b/i,
  /\b(security|auth|authentication|authorization|encryption|token|jwt|oauth)\b/i,
  /\b(machine.?learning|ai|artificial.?intelligence|deep.?learning|neural|nlp|model|llm|gpt)\b/i,
  /\b(sap|erp|abap|fiori|hana)\b/i,
  /\b(mobile|android|ios|flutter|react.?native)\b/i,
  /\b(web|website|app|application|project|build|create|make|develop)\b/i,
  // Career in tech
  /\b(career|job|interview|resume|portfolio|hire|freelance|remote|salary|junior|senior|intern)\b/i,
  /\b(learn|study|course|tutorial|resource|roadmap|beginner|advanced|skill|practice)\b/i,
  /\b(tech|technology|IT|startup|company|team|agile|scrum)\b/i,
  // Generic dev help phrasing
  /\bhow (do|can|to|does|should)\b/i,
  /\bwhat (is|are|does|was)\b/i,
  /\bwhy (does|is|do|should|would)\b/i,
  /\bexplain\b/i,
  /\bdifference between\b/i,
  /\bbest (practice|way|approach|tool|framework|language)\b/i,
  /\btip|advice|suggest|recommend\b/i,
]

// Topics that should be explicitly rejected
const BLOCKED_TOPICS = [
  /\b(recipe|cook|food|restaurant|diet|nutrition|calories)\b/i,
  /\b(movie|film|tv|show|series|anime|manga|netflix|drama)\b/i,
  /\b(sport|football|basketball|soccer|nba|fifa|game score)\b/i,
  /\b(politics|election|president|government|vote|party|democrat|republican)\b/i,
  /\b(religion|god|church|bible|quran|pray|spiritual)\b/i,
  /\b(dating|relationship|love|crush|boyfriend|girlfriend|tinder|marriage)\b/i,
  /\b(gossip|celebrity|kardashian|influencer|scandal|drama)\b/i,
  /\b(lottery|gambling|bet|casino|poker)\b/i,
  /\b(horoscope|zodiac|astrology|fortune|tarot)\b/i,
  /\b(weight.?loss|workout|gym|exercise|bodybuilding)\b/i,
  /\b(music|song|album|artist|concert|spotify|playlist)\b/i,
  /\b(travel|vacation|hotel|flight|tourist|destination)\b/i,
  /\b(fashion|outfit|clothing|brand|makeup|skincare)\b/i,
  /\b(joke|funny|meme|humor|laugh)\b/i,
  /\b(news|headline|breaking|current.?event)\b/i,
  /\b(medical|health|symptom|disease|medicine|doctor|hospital)\b/i,
  /\b(legal|lawyer|law|court|lawsuit|sue)\b/i,
  /\b(crypto|bitcoin|nft|trading|stock|forex|invest)\b/i,
]

const OFF_TOPIC_RESPONSE = `🚫 **Sorry, I can't help with that.**

This chatbot runs on AI tokens that cost real money, so I only answer questions related to:

• **Programming & software development**
• **Tech careers & learning paths**
• **AI tools for developers**
• **About Rany** — skills, projects, experience

For anything else, you're better off searching the internet. Thanks for understanding! 💻`

const OTHER_PEOPLE_RESPONSE = `🚫 **I only have information about Rany Boy Templado.**

I can't answer questions about other people — this is Rany's portfolio assistant. If you want to know about his skills, projects, or experience, I'm happy to help!`

// ── Detect if asking about other people (not Rany) ─────────────────────────
const OTHER_PEOPLE_PATTERNS = [
  /who is (?!rany)(\w+)/i,
  /tell me about (?!rany|you|yourself)(\w+)/i,
  /do you know (?!rany)(\w+)/i,
  /what about (?!rany)(\w+)/i,
  /\b(elon musk|mark zuckerberg|jeff bezos|bill gates|steve jobs|linus torvalds)\b/i,
  /\b(taylor swift|beyonce|drake|kanye|lebron|messi|ronaldo)\b/i,
]

function isAboutOtherPeople(message) {
  return OTHER_PEOPLE_PATTERNS.some(p => p.test(message))
}

function isOffTopic(message) {
  const m = message.toLowerCase().trim()

  // Very short messages (greetings, etc.) — allow
  if (m.length < 4) return false

  // If it matches a blocked topic — reject immediately
  if (BLOCKED_TOPICS.some(p => p.test(m))) return true

  // If it matches an allowed topic — allow
  if (ALLOWED_TOPICS.some(p => p.test(m))) return false

  // If the message is very short and generic (like "hi"), allow
  if (m.length < 15) return false

  // Default: if none of our allowed patterns match and it's longer, reject
  return true
}

const SYSTEM_PROMPT = `You are a Tech Mentor & AI Strategist embedded in Rany Boy Templado's portfolio website. You are an expert Technical Career Coach and Full-Stack Developer.

🎯 YOUR MISSION
Encourage a "Fundamentals-First" mindset while teaching users to leverage AI as a powerful collaborative partner rather than a replacement.

⛔ STRICT SCOPE — DEVELOPER TOPICS ONLY
You MUST ONLY answer questions related to:
- Programming (any language, framework, concept, debugging)
- Software development (architecture, design patterns, best practices)
- Tech careers (interviews, resumes, portfolios, learning paths, freelancing)
- AI/ML for developers (how to use AI as a coding tool)
- About Rany Boy Templado (his skills, projects, experience, availability)

If a user asks about ANYTHING outside these topics (recipes, sports, politics, relationships, entertainment, medical, legal, finance/crypto, etc.), you MUST decline politely:
"Sorry, I can't help with that. This chatbot runs on AI tokens that cost real money, so I only answer developer and tech-related questions. For anything else, you're better off searching the internet!"

If a user asks about OTHER PEOPLE (celebrities, other developers, anyone who isn't Rany), decline with:
"I only have information about Rany Boy Templado. This is his portfolio assistant — ask me about his skills, projects, or experience instead!"

Do NOT answer off-topic questions even if the user insists or reframes them.

🛠️ RESPONSE GUIDELINES
- Prioritize Fundamentals: When asked for help, always explain the WHY and the logic behind the code before providing a solution.
- The AI Partner Philosophy: Remind users that they are the "Architect" and AI is the "Co-pilot."
- Tone: Professional, encouraging, visionary, and slightly witty.
- Formatting: Use clean Markdown and bold key concepts.
- Core Message: "Master the fundamentals first, then use AI as your partner. You are the architect of the future."

When users ask about Rany specifically, answer based on his portfolio data:
${PORTFOLIO_CONTEXT}`

// ── Portfolio-based local responses ────────────────────────────────────────
const LOCAL = {
  greeting:    `Hey! Ask me anything about Rany — his skills, projects, experience, or availability. 👋`,
  who:         `**Rany Boy Templado** — Associate Software Engineer at Accenture & Freelance Web Developer. BSIT graduate from Trece Martires City, Cavite, Philippines.\n\nAlias: **RansnotDEV >_**\n\nHis story: Started coding in 2021 → Graduated BSIT 2025 → Worked in BPO → Now an Associate Software Engineer at Accenture (SAP) + freelancing on the side.\n\n> "Every role was a lesson the next one needed."`,
  stack:       `**Rany's Tech Stack:**\n\n🖥️ **Programming:** JavaScript, PHP, Java, C++, SQL, HTML5, CSS3\n⚙️ **Frontend:** React, Bootstrap\n🗄️ **Database:** MySQL\n🏢 **Enterprise:** SAP, Data Migration, Data Validation, ETL, ABAP Fundamentals\n🛠️ **Tools:** Git, GitHub, VS Code, Vite, REST APIs\n🤖 **AI/ML:** Python, YOLO, OpenCV\n\n💡 *Tip: Master the fundamentals of each layer before jumping to frameworks.*`,
  projects:    `**Rany's Projects:**\n\n1. 🌐 **Personal Portfolio** — React + AI chatbot, deployed on Vercel\n2. 👁️ **Computer Vision Object Detection** — YOLO + OpenCV (Python)\n3. 🏥 **Dental Appointment Management System** — PHP, MySQL, JS\n4. 🏠 **Real Estate Appointment System** — PHP, MySQL\n5. 🌤️ **Weather Forecast Application** — JavaScript, Weather API\n\n💡 *Building real projects is the fastest path to growth.*`,
  experience:  `**Rany's Experience:**\n\n- 💻 Associate Software Engineer — Accenture *(May 2026–Present)*\n- 📊 Data Entry Associate — Global Strategic *(Mar–May 2026)*\n- 📞 Customer Service Rep — Foundever *(Feb–Mar 2026)*\n- 📞 Customer Service Rep — Teleperformance *(Oct 2025–Jan 2026)*\n- 🎓 BSIT — Perpetual Help College *(Aug 2021–Jun 2025)*\n- 🖥️ Freelance Web Developer *(2022–Present)*`,
  education:   `**Education:**\n\nBS Information Technology — **Perpetual Help College of Pangasinan**\nGraduated **June 2025**\n\nAlso a **self-taught developer** — started coding in 2021 through real projects and freelance work.\n\n> Formal education + self-teaching = powerful combination.`,
  available:   `✅ **Rany is open to opportunities!**\n\n- Full-time · Freelance · Remote\n- Roles: Software Engineer, Web Developer, SAP Consultant\n\n📧 ranyboytemplado@gmail.com\n🌐 ransnotdev.vercel.app`,
  contact:     `📧 [ranyboytemplado@gmail.com](mailto:ranyboytemplado@gmail.com)\n💼 [linkedin.com/in/ranyboytemplado](https://linkedin.com/in/ranyboytemplado)\n🐙 [github.com/ranyboytemplado](https://github.com/ranyboytemplado)\n📸 [instagram.com/ranyboytemplado](https://instagram.com/ranyboytemplado)\n🌐 [ransnotdev.vercel.app](https://ransnotdev.vercel.app)`,
  certs:       `**Rany's Certifications:**\n\n🤖 AI Engineer for Developers Associate\n🏆 CodeChum National Programming Challenge 2024 — Participant\n📜 JavaScript (Basics) — HackerRank\n📜 SQL (Basics) — HackerRank\n📜 Java (Basics) — HackerRank\n🎓 Responsive Web Design — freeCodeCamp\n🎓 Front End Development Libraries — freeCodeCamp`,
  location:    `📍 **Trece Martires City, Cavite, Philippines**\n\nOpen to remote work worldwide.`,
  default:     `I can help with:\n\n• **About Rany** — skills, projects, experience, availability\n• **Programming** — web dev, code concepts, best practices\n• **Career advice** — breaking into tech, transitioning roles\n• **AI strategy** — how to use AI tools effectively\n\nWhat would you like to explore?`,
}

function getLocalResponse(message) {
  const m = message.toLowerCase()
  if (/hi|hello|hey|good\s*morning|good\s*evening/.test(m))                return LOCAL.greeting
  if (/who (are you|is rany|is he)|tell me about (you|rany|yourself|him)/.test(m)) return LOCAL.who
  if (/stack|skill|tech|language|tool|html|css|php|python|javascript|sap/.test(m)) return LOCAL.stack
  if (/project|appointment|weather|real.?estate|portfolio|object.?detect|computer.?vision/.test(m)) return LOCAL.projects
  if (/experience|work|job|bpo|call.?center|freelance|career|accenture/.test(m)) return LOCAL.experience
  if (/education|degree|bsit|graduate|study|school|perpetual/.test(m))     return LOCAL.education
  if (/available|hire|open|opportunit|looking|position|role/.test(m))      return LOCAL.available
  if (/cert|certification|hackerrank|freecodecamp|codechum/.test(m))       return LOCAL.certs
  if (/contact|email|reach|linkedin|github|instagram|social|connect|get.?in.?touch|give.*(contact|link)|here.*(contact|link)/.test(m)) return LOCAL.contact
  if (/where|location|city|country|cavite|philippines/.test(m))            return LOCAL.location
  if (/rany|ransnotdev/.test(m))                                            return LOCAL.who
  return LOCAL.default
}

// ── Exhausted message ──────────────────────────────────────────────────────
const EXHAUSTED_NOTE = `\n\n---\n⚡ *All AI providers have been exhausted for this session. I'll answer questions about Rany's portfolio directly from his data. For broader tech questions, check back later!*`

// ── Simulate streaming word by word ───────────────────────────────────────
async function streamWords(text, onChunk, delay = 20) {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    onChunk((i === 0 ? '' : ' ') + words[i])
    await new Promise(r => setTimeout(r, delay))
  }
  return text
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROVIDER CALL FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Call Gemini API (different format from OpenAI-compatible providers)
 */
async function callGemini(provider, messages) {
  const apiKey = provider.key()
  const url = provider.url(apiKey)

  // Convert OpenAI message format to Gemini format
  const contents = []
  let systemInstruction = ''

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemInstruction = msg.content
    } else {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })
    }
  }

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  }

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 429 || response.status === 503) {
    return { exhausted: true }
  }

  if (!response.ok) {
    const errText = await response.text()
    return { error: `Gemini ${response.status}: ${errText}` }
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  if (!text) return { error: 'Empty response from Gemini' }

  return { text }
}

/**
 * Call any OpenAI-compatible provider (Groq, OpenRouter, Cerebras, etc.)
 */
async function callOpenAICompatible(provider, messages) {
  const apiKey = provider.key()
  const url = typeof provider.url === 'function' ? provider.url(apiKey) : provider.url

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    ...(provider.extraHeaders ? provider.extraHeaders() : {}),
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: provider.model(),
      messages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  })

  if (response.status === 429 || response.status === 503) {
    return { exhausted: true }
  }

  if (!response.ok) {
    const errText = await response.text()
    return { error: `${provider.name} ${response.status}: ${errText}` }
  }

  const data = await response.json()
  const text = data?.choices?.[0]?.message?.content ?? ''
  if (!text) return { error: `Empty response from ${provider.name}` }

  return { text }
}

/**
 * Try all providers in order until one succeeds.
 * Returns { text, provider } on success, or null if all fail.
 */
async function tryProviders(messages) {
  for (const provider of PROVIDERS) {
    const apiKey = provider.key()

    // Skip if no key configured or key is invalid
    if (!provider.validate(apiKey)) continue

    // Skip if this provider was exhausted this session
    if (exhaustedProviders.has(provider.name)) continue

    try {
      let result
      if (provider.isGemini) {
        result = await callGemini(provider, messages)
      } else {
        result = await callOpenAICompatible(provider, messages)
      }

      if (result.exhausted) {
        console.warn(`[AI Fallback] ${provider.name} exhausted (429/503), trying next...`)
        exhaustedProviders.add(provider.name)
        continue
      }

      if (result.error) {
        console.warn(`[AI Fallback] ${provider.name} error: ${result.error}, trying next...`)
        continue
      }

      // Success!
      console.info(`[AI] Response from ${provider.name}`)
      return { text: result.text, provider: provider.name }
    } catch (networkErr) {
      console.warn(`[AI Fallback] ${provider.name} network error: ${networkErr.message}, trying next...`)
      continue
    }
  }

  // All providers failed
  return null
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Main send function:
 * 1. If question is about Rany → answer locally (no API call)
 * 2. Try all configured providers in order (fallback chain)
 * 3. If all providers fail → answer locally with exhausted note
 */
export async function sendMessage(history, userMessage, onChunk) {
  // ── Rule 1: Portfolio question → always answer locally ──────────────────
  if (isAboutRany(userMessage)) {
    const response = getLocalResponse(userMessage)
    return streamWords(response, onChunk, 18)
  }

  // ── Rule 2: Asking about other people → reject ──────────────────────────
  if (isAboutOtherPeople(userMessage)) {
    return streamWords(OTHER_PEOPLE_RESPONSE, onChunk, 14)
  }

  // ── Rule 3: Off-topic → reject without using API tokens ─────────────────
  if (isOffTopic(userMessage)) {
    return streamWords(OFF_TOPIC_RESPONSE, onChunk, 14)
  }

  // ── Rule 3: Check if any provider has a valid key ───────────────────────
  const hasAnyKey = PROVIDERS.some(p => p.validate(p.key()) && !exhaustedProviders.has(p.name))

  if (!hasAnyKey) {
    const response = getLocalResponse(userMessage) + EXHAUSTED_NOTE
    return streamWords(response, onChunk, 18)
  }

  // ── Rule 4: Try providers in fallback order ─────────────────────────────
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.text,
    })),
    { role: 'user', content: userMessage },
  ]

  const result = await tryProviders(messages)

  if (result) {
    return streamWords(result.text, onChunk, 18)
  }

  // All providers exhausted — fall back to local
  const fallback = getLocalResponse(userMessage) + EXHAUSTED_NOTE
  return streamWords(fallback, onChunk, 18)
}

/**
 * Get the current status of all providers (for debugging/display)
 */
export function getProviderStatus() {
  return PROVIDERS.map(p => ({
    name: p.name,
    model: p.model(),
    configured: p.validate(p.key()),
    exhausted: exhaustedProviders.has(p.name),
  }))
}
