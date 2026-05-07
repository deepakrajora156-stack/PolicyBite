/**
 * Picks a stable index for "Policy of the Day" based on the user's local calendar date
 * (same policy all day, changes at midnight — feels more like a daily spotlight than pure random).
 */
export function getPolicyOfTheDayIndex(policiesLength) {
  if (policiesLength < 1) return 0
  const d = new Date()
  const seed = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i)
  }
  return Math.abs(hash) % policiesLength
}

export function getTodayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function msUntilNextLocalMidnight(now = new Date()) {
  const next = new Date(now)
  next.setHours(24, 0, 0, 0)
  return Math.max(0, next.getTime() - now.getTime())
}
