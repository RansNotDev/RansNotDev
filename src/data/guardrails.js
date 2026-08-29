export const SCOPE_REFUSAL =
  'I only answer questions about Rany’s portfolio, programming, SAP data migration, and software career advice. Please ask something in those areas.'

export const GREETING_REPLY =
  'Hello. I can help with Rany’s portfolio, programming, SAP data migration, and software career advice. What would you like to know?'

const GREETING = /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening)|thanks|thank you|ok|okay)[\s!.]*$/i

const INJECTION = /\b(ignore (all|any|the|previous)|developer message|reveal (your|the) (prompt|secret)|jailbreak|bypass (the )?(rules|guardrails)|act as unrestricted|dan mode|(show|give|print|expose).*(api key|environment variable|system prompt)|you are now)\b/i

const BLOCKED = /\b(recipe|recipes|cook|cooking|politics|election|gambling|casino|dating|girlfriend|boyfriend|crush|hookup|medical diagnosis|symptom|disease|prescription|legal advice|lawsuit|attorney|celebrity|sports score|football|basketball|weather forecast|horoscope|astrology|joke|jokes|funny|meme|poem|poetry|rap verse|song lyrics|bedtime story|roleplay|role play|nsfw|porn|nude|weapon|bomb|drug deal|crypto trading|stock pick|lottery)\b/i

const PORTFOLIO = /\b(rany|templado|ransnotdev|portfolio|your (skills?|projects?|experience|education|contact|email|availability|work|background)|about you|who (are|is) (you|rany)|hire|hiring|open to work|resume|cv|certifications?|sap|abap|data migration|etl)\b/i

const PROGRAMMING = /\b(code|coding|program(?:ming)?|software|developer|engineer(?:ing)?|frontend|backend|full[- ]?stack|javascript|typescript|react|html|css|python|php|java\b|c\+\+|sql|mysql|git|github|api|apis|database|debug|testing|security|vite|vercel|node|web ?dev|algorithm|framework|library|devops|cloud|aws|docker|linux|oop|dsa|leetcode|hackerrank|yolo|opencv|rest(?:ful)?|graphql|bootstrap|abap|fiori|hana)\b/i

const CAREER = /\b(career|interview|job(s)?|intern(?:ship)?|junior|mid[- ]level|roadmap|learn(?:ing)?|study|studying|bootcamp|cover letter|linkedin|salary|compensation|promotion|upskill|switch(?:ing)? to tech|bpo|career (advice|path|change)|how (do|can|should) i (start|become|get|prepare|learn|apply))\b/i

const FOLLOW_UP = /^(what about|and (his|her|the|that|this|your|my)|also|why|how|explain|tell me more|can you (elaborate|explain|clarify)|go on|continue|the (first|second|third)|that one)\b/i

export function evaluateGuardrails(message, history = []) {
  const text = String(message || '').trim()
  if (!text) return { action: 'refuse', reply: SCOPE_REFUSAL }
  if (INJECTION.test(text)) {
    return { action: 'refuse', reply: 'I can help with portfolio, programming, and software career questions, but I cannot change or reveal my operating rules.' }
  }
  if (BLOCKED.test(text)) return { action: 'refuse', reply: SCOPE_REFUSAL }
  if (GREETING.test(text)) return { action: 'greet', reply: GREETING_REPLY }
  if (PORTFOLIO.test(text) || PROGRAMMING.test(text) || CAREER.test(text)) return { action: 'allow' }

  const hasPriorTurn = Array.isArray(history) && history.some(item => item?.role === 'user')
  if (hasPriorTurn && FOLLOW_UP.test(text)) return { action: 'allow' }

  return { action: 'refuse', reply: SCOPE_REFUSAL }
}
