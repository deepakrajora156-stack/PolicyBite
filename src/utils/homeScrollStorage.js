const KEY = 'policybite:home-scroll-y'

export function readHomeScrollY() {
  const raw = sessionStorage.getItem(KEY)
  if (raw === null) return null
  const n = Number(raw)
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null
}

export function writeHomeScrollY(y) {
  sessionStorage.setItem(KEY, String(Math.max(0, Math.round(y))))
}
