// The single fixed reply for anything outside the allowed scope.
export const SCOPE_REFUSAL =
  'API Cost is expensive you can use chatgpt gemini grok and claude for free in thier respective websites'

export const GREETING_REPLY =
  'Hello. I can help with Rany’s portfolio and software / tech career advice. What would you like to know?'

const GREETING = /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening)|thanks|thank you|ok|okay)[\s!.]*$/i

// Attempts to change or extract the operating rules are always refused.
const INJECTION = /\b(ignore (all|any|the|previous)|developer message|reveal (your|the) (prompt|secret)|jailbreak|bypass (the )?(rules|guardrails)|act as unrestricted|dan mode|(show|give|print|expose).*(api key|environment variable|system prompt)|you are now)\b/i

// (1) Anything about Rany / the portfolio itself.
const PORTFOLIO = /\b(rany|templado|ransnotdev|portfolio|project|projects|skills?|tech stack|experience|education|background|certifications?|credentials?|availability|resume|cv|about (you|rany|him)|who (are|is) (you|rany|he)|hire|hiring|open to work|available for|reach (you|him)|contact|sap|data migration|abap|migration cockpit|chatbot|object detection|yolo|opencv|dental|real estate|weather (forecast|dashboard))\b/i

// (2) Software / tech career advice.
const CAREER = /\b(career|interview|job(s)?|intern(?:ship)?|resume|cv|cover letter|portfolio tips?|junior|entry[- ]level|mid[- ]level|senior|roadmap|learn(?:ing)? (path|to code)|study plan|bootcamp|self[- ]taught|upskill|switch(?:ing)? (careers?|to tech)|break into tech|get(?:ting)? (a|my first) (job|role|internship)|land(?:ing)? (a|my first)|how (do|can|should) i (start|become|get|prepare|learn|apply|transition|switch)|tech (career|industry)|software (career|engineer(?:ing)? career)|salary|promotion|which (language|framework|skill) should i learn|what should i learn)\b/i

const FOLLOW_UP = /^(what about|and (his|her|the|that|this|your|my)|also|why|how (so|come)|tell me more|can you (elaborate|explain|clarify)|go on|continue|the (first|second|third)|that one)\b/i

export function evaluateGuardrails(message, history = []) {
  const text = String(message || '').trim()
  if (!text) return { action: 'refuse', reply: SCOPE_REFUSAL }

  // Never let a message rewrite or leak the rules.
  if (INJECTION.test(text)) return { action: 'refuse', reply: SCOPE_REFUSAL }

  // Greetings get a friendly nudge toward the allowed topics.
  if (GREETING.test(text)) return { action: 'greet', reply: GREETING_REPLY }

  // Allow only portfolio questions and tech-career advice.
  if (PORTFOLIO.test(text) || CAREER.test(text)) return { action: 'allow' }

  // Short follow-ups are allowed only if the previous turn was in scope.
  const hasPriorTurn = Array.isArray(history) && history.some(item => item?.role === 'user')
  if (hasPriorTurn && FOLLOW_UP.test(text)) return { action: 'allow' }

  // Everything else falls outside the scope.
  return { action: 'refuse', reply: SCOPE_REFUSAL }
}
