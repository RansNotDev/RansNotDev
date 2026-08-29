export const KNOWLEDGE_BASE = [
  {
    id: 'profile', title: 'Profile', keywords: ['rany','about','profile','background','location','role'],
    content: 'Rany Boy Templado is a BS Information Technology graduate and self-taught developer based in Trece Martires City, Cavite, Philippines. He works as an Associate Software Engineer specializing in SAP Data Migration and also builds web applications.'
  },
  {
    id: 'sap', title: 'SAP Data Migration', keywords: ['sap','migration','enterprise','data','validation','etl','abap'],
    content: 'His current engineering focus is SAP Data Migration: source-to-target mapping, data validation, cleansing, ETL concepts, enterprise workflows, and ABAP fundamentals.'
  },
  {
    id: 'skills', title: 'Technical Skills', keywords: ['skills','stack','technology','javascript','react','php','python','java','mysql','api'],
    content: 'Frontend: HTML5, CSS3, JavaScript, React, and Bootstrap. Backend and data: PHP, Python, Java, C++, MySQL, and REST APIs. Workflow: Git, GitHub, VS Code, Vite, DataCamp, and Kiro.'
  },
  {
    id: 'projects', title: 'Projects', keywords: ['projects','portfolio','dental','property','weather','vision','yolo','opencv'],
    content: 'Selected projects include this React portfolio with a scoped AI assistant, a YOLO and OpenCV object-detection workflow, a dental appointment system, a real-estate scheduling platform, and a weather forecast dashboard.'
  },
  {
    id: 'experience', title: 'Experience', keywords: ['experience','career','work','history','support','operations','freelance'],
    content: 'His path includes customer support, data operations, freelance web development, and software engineering. That background contributes practical communication, documentation, data-quality, and problem-solving skills.'
  },
  {
    id: 'education', title: 'Education', keywords: ['education','degree','college','bsit','graduate','school'],
    content: 'He completed a Bachelor of Science in Information Technology in 2025, with study in systems analysis, databases, software development, and web technologies.'
  },
  {
    id: 'certifications', title: 'Certifications', keywords: ['certificate','certification','datacamp','hackerrank','freecodecamp','codechum'],
    content: 'Certifications and learning achievements include AI Engineer for Developers Associate, HackerRank JavaScript, SQL, Java and Problem Solving basics, freeCodeCamp Responsive Web Design and Front End Development Libraries, and CodeChum National Programming Challenge participation.'
  },
  {
    id: 'availability', title: 'Availability', keywords: ['available','hire','opportunity','remote','freelance','contact','email'],
    content: 'Rany is open to suitable software engineering, web development, SAP data, freelance, and remote opportunities. Email: ranyboytemplado@gmail.com. LinkedIn: https://linkedin.com/in/ranyboytemplado. GitHub: https://github.com/ranyboytemplado.'
  },
]

const STOP_WORDS = new Set(['a','an','and','are','about','can','do','for','how','i','in','is','it','me','of','on','or','rany','the','to','what','who','with','you','your'])
const SYNONYMS = { technologies:'skills', technology:'skills', tools:'skills', jobs:'experience', job:'experience', cv:'experience', resume:'experience', reach:'contact', hiring:'available', apps:'projects', application:'projects' }

function tokens(value) {
  return [...new Set(String(value).toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').split(/\s+/).filter(Boolean).map(token => SYNONYMS[token] || token).filter(token => token.length > 1 && !STOP_WORDS.has(token)))]
}

export function retrieveKnowledge(query, limit = 4) {
  const queryTokens = tokens(query)
  if (!queryTokens.length) return /\b(rany|who are you|about you)\b/i.test(String(query)) ? [{ ...KNOWLEDGE_BASE[0], score: 5 }] : []

  return KNOWLEDGE_BASE.map(chunk => {
    const keywordSet = new Set(chunk.keywords)
    const titleSet = new Set(tokens(chunk.title))
    const contentSet = new Set(tokens(chunk.content))
    const overlap = queryTokens.reduce((score, token) => score + (keywordSet.has(token) ? 5 : 0) + (titleSet.has(token) ? 3 : 0) + (contentSet.has(token) ? 1 : 0), 0)
    const phraseBonus = chunk.keywords.some(keyword => String(query).toLowerCase().includes(keyword)) ? 2 : 0
    return { ...chunk, score: overlap + phraseBonus }
  }).filter(chunk => chunk.score > 1).sort((a, b) => b.score - a.score).slice(0, limit)
}

export function formatKnowledge(chunks) {
  return chunks.map(chunk => `[${chunk.title}] ${chunk.content}`).join('\n')
}

export function createGroundedAnswer(query) {
  const results = retrieveKnowledge(query, 3)
  if (!results.length) return null
  const facts = results.map(result => result.content).join('\n\n')
  const sources = results.map(result => result.title).join(', ')
  return `${facts}\n\n**Portfolio sources:** ${sources}`
}

export function buildPortfolioContext() {
  return formatKnowledge(KNOWLEDGE_BASE)
}
