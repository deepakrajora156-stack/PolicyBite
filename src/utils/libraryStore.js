const KEYS = {
  saved: 'policybite:saved-policy-ids',
  viewed: 'policybite:recently-viewed',
  quizzesCompleted: 'policybite:quizzes-completed',
  streak: 'policybite:daily-streak',
  notes: 'policybite:library-notes',
  policyNotes: 'policybite:policy-notes',
  aiQuestions: 'policybite:ai-questions',
}

export const LIBRARY_EVENT = 'policybite:library-updated'

function emitLibraryUpdated() {
  window.dispatchEvent(new Event(LIBRARY_EVENT))
}

function parseJson(raw, fallback) {
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function localDateKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function yesterdayKey() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return localDateKey(d)
}

export function getSavedPolicyIds() {
  const ids = parseJson(localStorage.getItem(KEYS.saved), [])
  return Array.isArray(ids) ? ids : []
}

export function isPolicySaved(policyId) {
  return getSavedPolicyIds().includes(policyId)
}

export function toggleSavedPolicy(policyId) {
  const prev = getSavedPolicyIds()
  const next = prev.includes(policyId) ? prev.filter((id) => id !== policyId) : [policyId, ...prev]
  localStorage.setItem(KEYS.saved, JSON.stringify(next))
  emitLibraryUpdated()
  return next.includes(policyId)
}

export function getRecentlyViewed(limit = 8) {
  const items = parseJson(localStorage.getItem(KEYS.viewed), [])
  if (!Array.isArray(items)) return []
  return items.slice(0, limit)
}

export function recordViewedPolicy(policyId) {
  const now = Date.now()
  const prev = getRecentlyViewed(64)
  const next = [{ id: policyId, viewedAt: now }, ...prev.filter((item) => item.id !== policyId)].slice(0, 64)
  localStorage.setItem(KEYS.viewed, JSON.stringify(next))
  emitLibraryUpdated()
}

export function getPoliciesReadCount() {
  return new Set(getRecentlyViewed(999).map((v) => v.id)).size
}

export function getQuizzesCompleted() {
  const n = Number(localStorage.getItem(KEYS.quizzesCompleted) || '0')
  return Number.isFinite(n) ? Math.max(0, n) : 0
}

export function incrementQuizzesCompleted() {
  const next = getQuizzesCompleted() + 1
  localStorage.setItem(KEYS.quizzesCompleted, String(next))
  emitLibraryUpdated()
  return next
}

export function getDailyStreak() {
  const streak = parseJson(localStorage.getItem(KEYS.streak), null)
  if (!streak || typeof streak !== 'object') {
    return { current: 0, longest: 0, lastActiveDate: null }
  }
  return {
    current: Number(streak.current) || 0,
    longest: Number(streak.longest) || 0,
    lastActiveDate: streak.lastActiveDate || null,
  }
}

export function touchDailyStreak() {
  const today = localDateKey()
  const yKey = yesterdayKey()
  const prev = getDailyStreak()
  let current = prev.current

  if (prev.lastActiveDate === today) {
    return prev
  }
  if (prev.lastActiveDate === yKey) {
    current += 1
  } else {
    current = 1
  }

  const next = {
    current,
    longest: Math.max(prev.longest, current),
    lastActiveDate: today,
  }
  localStorage.setItem(KEYS.streak, JSON.stringify(next))
  emitLibraryUpdated()
  return next
}

export function getNotes() {
  const notes = parseJson(localStorage.getItem(KEYS.notes), [])
  return Array.isArray(notes) ? notes : []
}

export function addNote(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  const next = [
    { id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, text: trimmed, createdAt: Date.now() },
    ...getNotes(),
  ].slice(0, 30)
  localStorage.setItem(KEYS.notes, JSON.stringify(next))
  emitLibraryUpdated()
}

export function removeNote(noteId) {
  const next = getNotes().filter((n) => n.id !== noteId)
  localStorage.setItem(KEYS.notes, JSON.stringify(next))
  emitLibraryUpdated()
}

export function getPolicyNotes() {
  const notes = parseJson(localStorage.getItem(KEYS.policyNotes), [])
  return Array.isArray(notes) ? notes : []
}

export function getPolicyNote(policyId) {
  return getPolicyNotes().find((note) => note.policyId === policyId) || null
}

export function upsertPolicyNote({ policyId, policyTitle, text }) {
  const trimmedText = String(text || '').trim()
  if (!policyId || !trimmedText) return null

  const prev = getPolicyNotes().filter((note) => note.policyId !== policyId)
  const nextNote = {
    policyId,
    policyTitle: String(policyTitle || 'Policy'),
    text: trimmedText,
    updatedAt: Date.now(),
  }
  const next = [nextNote, ...prev].slice(0, 80)
  localStorage.setItem(KEYS.policyNotes, JSON.stringify(next))
  emitLibraryUpdated()
  return nextNote
}

export function deletePolicyNote(policyId) {
  const next = getPolicyNotes().filter((note) => note.policyId !== policyId)
  localStorage.setItem(KEYS.policyNotes, JSON.stringify(next))
  emitLibraryUpdated()
}

export function getAiQuestions(limit = 30) {
  const items = parseJson(localStorage.getItem(KEYS.aiQuestions), [])
  if (!Array.isArray(items)) return []
  return items.slice(0, limit)
}

export function addAiQuestion({ policyId, policyTitle, question, answer }) {
  const trimmedQ = String(question || '').trim()
  const trimmedA = String(answer || '').trim()
  if (!trimmedQ) return
  const next = [
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      policyId,
      policyTitle: policyTitle || 'Policy',
      question: trimmedQ,
      answer: trimmedA,
      askedAt: Date.now(),
    },
    ...getAiQuestions(80),
  ].slice(0, 80)
  localStorage.setItem(KEYS.aiQuestions, JSON.stringify(next))
  emitLibraryUpdated()
}
