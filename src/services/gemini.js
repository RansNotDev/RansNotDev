import { PORTFOLIO_CONTEXT } from '../data/portfolioContext'

const GROQ_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

// ── Track if API quota has been exhausted this session ─────────────────────
let apiExhausted = false

// ── Detect if question is about Rany (skip API, answer locally) ────────────
const RANY_PATTERNS = [
  /\brany\b/i,
  /\bransnotdev\b/i,
  /your (name|stack|skill|project|experience|background|education|location|email|contact|job|work|role|status)/i,
  /who (are you|is rany|is he)/i,
  /tell me about (you|rany|yourself|him)/i,
  /\b(open to work|available|hire|hiring|portfolio|resume|cv)\b/i,
  /\b(project|appointment|weather app|real estate|school club)\b/i,
  /\b(bsit|cavite|philippines|teleperformance|foundever|global strategic)\b/i,
  /\b(tech stack|html|css|javascript|php|python|mysql|bootstrap)\b/i,
  /\b(contact|email|linkedin|github|instagram|social|reach|connect)\b/i,
  /how (can i|do i|to) (contact|reach|find|connect|get in touch)/i,
  /where (can i|do i) (find|reach|contact)/i,
  /get in touch/i,
  /give me.*(contact|email|social|link)/i,
  /here.*(contact|email|social|link)/i,
]

function isAboutRany(message) {
  return RANY_PATTERNS.some(p => p.test(message))
}

const SYSTEM_PROMPT = `You are a Tech Mentor & AI Strategist embedded in Rany Boy Templado's portfolio website. You are an expert Technical Career Coach and Full-Stack Developer.

🎯 YOUR MISSION
Encourage a "Fundamentals-First" mindset while teaching users to leverage AI as a powerful collaborative partner rather than a replacement.

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
  who:         `**Rany Boy Templado** — Self-taught developer & BSIT graduate from Trece Martires City, Cavite, Philippines.\n\nAlias: **RansnotDEV >_**\n\nHis story: Started coding in 2021 → Graduated BSIT 2025 → Worked in BPO → Now transitioning back to tech.\n\n> "Every role was a lesson the next one needed."`,
  stack:       `**Rany's Tech Stack:**\n\n🖥️ **Frontend:** HTML5, CSS3, JavaScript, Bootstrap\n⚙️ **Backend:** PHP, Python, Java, C++, MySQL\n🛠️ **Tools:** VS Code, Git, GitHub, Canva\n\n💡 *Tip: Master the fundamentals of each layer before jumping to frameworks.*`,
  projects:    `**Rany's Projects:**\n\n1. 🏥 **Advanced Appointment System** — Dental clinic scheduling (PHP, MySQL, JS)\n2. 🏠 **Real Estate Appointment System** — Property management dashboard (PHP, MySQL)\n3. 🎓 **School Club Event System** — Event & member management (JS, PHP, MySQL)\n4. 🌤️ **Weather App** — Real-time weather with location detection (JS, HTML, CSS)\n\n💡 *Building real projects is the fastest path to growth.*`,
  experience:  `**Rany's Experience:**\n\n- 📊 Data Entry Specialist — Global Strategic *(2026, current)*\n- 📞 Customer Service Trainee — Foundever Philippines *(2026)*\n- 📞 Customer Service Rep — Teleperformance Philippines *(2025)*\n- 🎓 BSIT Graduate *(2025)*\n- 💼 OJT Intern — Municipal Accounting Office *(2024)*\n- 🖥️ Freelance Web Developer *(2022–present)*\n- 👨‍💻 Hello, World! in C++ *(2021)*`,
  education:   `**Education:**\n\nBS Information Technology — Graduated **2025**, Cavite\n\nAlso a **self-taught developer** — started coding in 2021 through real projects and freelance work.\n\n> Formal education + self-teaching = powerful combination.`,
  available:   `✅ **Rany is open to opportunities!**\n\n- Full-time · Freelance · Remote\n- Roles: Web Developer, Software Engineer, Technical Support\n\n📧 ranyboytemplado001@gmail.com`,
  contact:     `📧 [ranyboytemplado001@gmail.com](mailto:ranyboytemplado001@gmail.com)\n💼 [linkedin.com/in/ranyboytemplado](https://linkedin.com/in/ranyboytemplado)\n🐙 [github.com/ranyboytemplado](https://github.com/ranyboytemplado)\n📸 [instagram.com/ranyboytemplado](https://instagram.com/ranyboytemplado)`,
  location:    `📍 **Trece Martires City, Cavite, Philippines**\n\nOpen to remote work worldwide.`,
  default:     `I can help with:\n\n• **About Rany** — skills, projects, experience, availability\n• **Programming** — web dev, code concepts, best practices\n• **Career advice** — breaking into tech, transitioning roles\n• **AI strategy** — how to use AI tools effectively\n\nWhat would you like to explore?`,
}

function getLocalResponse(message) {
  const m = message.toLowerCase()
  if (/hi|hello|hey|good\s*morning|good\s*evening/.test(m))                return LOCAL.greeting
  if (/who (are you|is rany|is he)|tell me about (you|rany|yourself|him)/.test(m)) return LOCAL.who
  if (/stack|skill|tech|language|tool|html|css|php|python|javascript/.test(m)) return LOCAL.stack
  if (/project|appointment|weather|real.?estate|school.?club/.test(m))     return LOCAL.projects
  if (/experience|work|job|bpo|call.?center|freelance|career/.test(m))     return LOCAL.experience
  if (/education|degree|bsit|graduate|study|school/.test(m))               return LOCAL.education
  if (/available|hire|open|opportunit|looking|position|role/.test(m))      return LOCAL.available
  if (/contact|email|reach|linkedin|github|instagram|social|connect|get.?in.?touch|give.*(contact|link)|here.*(contact|link)/.test(m)) return LOCAL.contact
  if (/where|location|city|country|cavite|philippines/.test(m))            return LOCAL.location
  if (/rany|ransnotdev/.test(m))                                            return LOCAL.who
  return LOCAL.default
}

// ── Exhausted message ──────────────────────────────────────────────────────
const EXHAUSTED_NOTE = `\n\n---\n⚡ *I'm on the **free tier** — my AI quota for general questions has been consumed for now. I'll answer questions about Rany's portfolio and background directly from his data. For broader tech questions, check back later!*`

// ── Simulate streaming word by word ───────────────────────────────────────
async function streamWords(text, onChunk, delay = 20) {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    onChunk((i === 0 ? '' : ' ') + words[i])
    await new Promise(r => setTimeout(r, delay))
  }
  return text
}

/**
 * Main send function:
 * 1. If question is about Rany → answer locally (no API call)
 * 2. If API quota exhausted → answer locally with exhausted note
 * 3. Otherwise → call Groq API
 */
export async function sendMessage(history, userMessage, onChunk) {
  // ── Rule 1: Portfolio question → always answer locally ──────────────────
  if (isAboutRany(userMessage)) {
    const response = getLocalResponse(userMessage)
    return streamWords(response, onChunk, 18)
  }

  // ── Rule 2: API quota exhausted → fallback with note ────────────────────
  if (apiExhausted || !GROQ_KEY || !GROQ_KEY.startsWith('gsk_')) {
    const response = getLocalResponse(userMessage) + (apiExhausted ? EXHAUSTED_NOTE : '')
    return streamWords(response, onChunk, 18)
  }

  // ── Rule 3: General question → call Groq ────────────────────────────────
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.text,
    })),
    { role: 'user', content: userMessage },
  ]

  let response
  try {
    response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    })
  } catch (networkErr) {
    throw new Error(`Network error: ${networkErr.message}`)
  }

  // ── Handle quota exhaustion (429) ────────────────────────────────────────
  if (response.status === 429) {
    apiExhausted = true
    const fallback = getLocalResponse(userMessage) + EXHAUSTED_NOTE
    return streamWords(fallback, onChunk, 18)
  }

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Groq API ${response.status}: ${errText}`)
  }

  const data     = await response.json()
  const fullText = data?.choices?.[0]?.message?.content ?? ''
  if (!fullText) throw new Error('Empty response from Groq')

  return streamWords(fullText, onChunk, 18)
}
