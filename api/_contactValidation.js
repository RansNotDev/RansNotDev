// Zero-trust, rule-based validation for contact-form submissions.
//
// Pure functions (no I/O except the optional async MX check in contact.js),
// so this module is easy to unit-test. Returns a structured verdict:
//
//   {
//     is_valid: boolean,
//     status_code: 'ACCEPTED' | 'REJECTED_INVALID_EMAIL'
//                | 'REJECTED_TEST_SPAM' | 'REJECTED_MALICIOUS',
//     reason: string,
//     sanitized_payload: { name, email, intent, message } | null
//   }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Names / usernames that signal a throwaway or test submission.
const TEST_NAMES = new Set([
  'test', 'testing', 'tester', 'asdf', 'asdfasdf', 'qwer', 'qwerty',
  'admin', 'administrator', 'user', 'name', 'sample', 'demo',
  '123', '1234', '12345', 'abc', 'abcd', 'xxx', 'null', 'undefined', 'na', 'n/a',
])

// Email local-part prefixes that are instantly rejected.
const BLOCKED_EMAIL_PREFIXES = [
  'test', 'testing', 'admin', 'asdf', 'qwer', '1234', 'qwerty',
  'sample', 'noreply', 'no-reply', 'fake', 'temp', 'abc',
]
// Exact local-parts that are too generic to be real (short ones we block fully).
const BLOCKED_EMAIL_EXACT = new Set(['a', 'abc', 'test', 'temp', 'fake'])

// Known disposable / temporary email providers.
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'guerrillamail.info',
  'mailinator.com', '10minutemail.com', '10minutemail.net', 'trashmail.com',
  'throwawaymail.com', 'yopmail.com', 'getnada.com', 'maildrop.cc',
  'sharklasers.com', 'dispostable.com', 'fakeinbox.com', 'mailnesia.com',
  'tempinbox.com', 'mohmal.com', 'emailondeck.com', 'mintemail.com',
  'spam4.me', 'tempr.email', 'discard.email', 'burnermail.io',
])

// Obvious gibberish / placeholder phrases.
const GIBBERISH_PATTERNS = [
  /asdfgh/i, /qwerty/i, /zxcvb/i, /lorem ipsum/i,
  /\btest(ing)?\s*\d*\b/i, /hello\s+test/i, /\basdf+\b/i, /\bhjkl+\b/i,
]

// Spam / crypto / phishing / adult signals.
const SPAM_PATTERNS = [
  /\b(viagra|cialis|porn|xxx|escort|casino|betting|loan offer)\b/i,
  /\b(crypto|bitcoin|btc|ethereum|forex|binary option)\b.{0,40}\b(invest|profit|double|guaranteed|earn)\b/i,
  /\b(invest|profit|double|guaranteed|earn)\b.{0,40}\b(crypto|bitcoin|btc|ethereum|forex)\b/i,
  /\bseo\b.{0,30}\b(service|ranking|backlink)\b/i,
  /\b(buy|cheap)\b.{0,20}\b(followers|likes|views)\b/i,
  /(https?:\/\/[^\s]+){3,}/i, // 3+ links = almost always spam
  /\b(click here|act now|limited offer|work from home|make money fast)\b/i,
]

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ))
}

function cleanText(value, max) {
  return String(value || '').trim().replace(/[\u0000-\u001f]/g, ' ').slice(0, max)
}

// User-facing messages are intentionally non-technical: they tell the visitor
// this form is for genuine, professional contact — not testing or spam.
// The detailed `reason` is kept for server logs only.
const USER_MESSAGES = {
  REJECTED_INVALID_EMAIL:
    'Please use a real, working email address. This contact form is for genuine professional inquiries so Rany can reply to you directly.',
  REJECTED_TEST_SPAM:
    'This contact form is intended for formal, professional use only — not for testing, placeholder text, or spam. Please share a real message and Rany will get back to you.',
  REJECTED_MALICIOUS:
    'This message couldn’t be sent. Please keep it professional and relevant — this form is for genuine inquiries, collaborations, and opportunities only.',
}

function reject(status_code, reason) {
  return {
    is_valid: false,
    status_code,
    reason,
    userMessage: USER_MESSAGES[status_code] || USER_MESSAGES.REJECTED_TEST_SPAM,
    sanitized_payload: null,
  }
}

// Detects long runs of a single char or a tiny alphabet (keyboard mashing).
function looksLikeMashing(text) {
  const lower = text.toLowerCase().replace(/\s+/g, '')
  if (lower.length < 8) return false
  // 5+ identical chars in a row: "aaaaa"
  if (/(.)\1{4,}/.test(lower)) return true
  // Very low character diversity across a longish string
  const unique = new Set(lower).size
  if (lower.length >= 12 && unique <= 4) return true
  // Almost no vowels in a long alphabetic string → gibberish
  const letters = lower.replace(/[^a-z]/g, '')
  if (letters.length >= 12) {
    const vowels = (letters.match(/[aeiou]/g) || []).length
    if (vowels / letters.length < 0.12) return true
  }
  return false
}

/**
 * Validate a submission. Format/rule checks only — the async MX-record check
 * lives in the handler and runs after this passes.
 *
 * @param {object} raw  { name, email, intent, subject, message }
 * @returns verdict object (see module header)
 */
export function validateSubmission(raw) {
  const name = cleanText(raw?.name, 120)
  const email = cleanText(raw?.email, 200).toLowerCase()
  const intent = cleanText(raw?.intent || raw?.subject, 200)
  const message = cleanText(raw?.message, 2000)

  // ── 1. Name ──
  if (name.length < 2 || name.length > 50) {
    return reject('REJECTED_TEST_SPAM', 'Name must be between 2 and 50 characters.')
  }
  if (TEST_NAMES.has(name.toLowerCase())) {
    return reject('REJECTED_TEST_SPAM', `Name "${name}" is a generic test value.`)
  }
  if (!/[a-zA-ZÀ-ÿñÑ]/.test(name)) {
    return reject('REJECTED_TEST_SPAM', 'Name must contain letters.')
  }

  // ── 2. Email ──
  if (!email) {
    return reject('REJECTED_INVALID_EMAIL', 'Email is required.')
  }
  if (!EMAIL_PATTERN.test(email)) {
    return reject('REJECTED_INVALID_EMAIL', 'Email is not a valid address format.')
  }

  const [localRaw, domain] = email.split('@')
  const local = localRaw || ''
  const localNoDots = local.replace(/\./g, '')

  // Disposable / temporary providers
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return reject('REJECTED_INVALID_EMAIL', `Disposable email domain "${domain}" is not allowed.`)
  }

  // Blocked test prefixes (exact or prefix match)
  if (BLOCKED_EMAIL_EXACT.has(localNoDots)) {
    return reject('REJECTED_TEST_SPAM', `Email uses a blocked test value "${local}".`)
  }
  for (const prefix of BLOCKED_EMAIL_PREFIXES) {
    if (localNoDots === prefix || localNoDots.startsWith(prefix)) {
      return reject('REJECTED_TEST_SPAM', `Email uses a blocked test prefix "${prefix}".`)
    }
  }

  // Gmail-specific: username (minus dots) must be >= 6 chars
  if (domain === 'gmail.com' && localNoDots.length < 6) {
    return reject('REJECTED_INVALID_EMAIL', 'Gmail usernames must be at least 6 characters long.')
  }

  // ── 3. Message ──
  if (message.length < 15 || message.length > 2000) {
    return reject('REJECTED_TEST_SPAM', 'Message must be between 15 and 2,000 characters.')
  }

  // Malicious / spam first (higher severity)
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(message)) {
      return reject('REJECTED_MALICIOUS', 'Message flagged as spam, crypto, or phishing content.')
    }
  }

  // Gibberish / placeholder / keyboard mashing
  for (const pattern of GIBBERISH_PATTERNS) {
    if (pattern.test(message)) {
      return reject('REJECTED_TEST_SPAM', 'Message body contains test or placeholder gibberish.')
    }
  }
  if (looksLikeMashing(message)) {
    return reject('REJECTED_TEST_SPAM', 'Message body looks like keyboard mashing or gibberish.')
  }

  // Needs at least a couple of real words
  const words = message.split(/\s+/).filter(w => /[a-zA-ZÀ-ÿñÑ]{2,}/.test(w))
  if (words.length < 3) {
    return reject('REJECTED_TEST_SPAM', 'Message does not contain enough coherent text.')
  }

  // ── Passed ──
  return {
    is_valid: true,
    status_code: 'ACCEPTED',
    reason: 'Payload passed all validation and content security checks.',
    sanitized_payload: {
      name,
      email,
      intent: intent || 'General',
      message: escapeHtml(message),
    },
  }
}

export { escapeHtml, cleanText }
