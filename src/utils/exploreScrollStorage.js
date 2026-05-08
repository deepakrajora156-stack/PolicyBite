const KEY = 'policybite:explore-scroll-y'

export function readExploreScrollY() {
  const raw = sessionStorage.getItem(KEY)
  if (raw === null) return null
  const n = Number(raw)
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null
}

export function writeExploreScrollY(y) {
  sessionStorage.setItem(KEY, String(Math.max(0, Math.round(y))))
}
