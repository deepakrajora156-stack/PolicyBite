/** Tailwind gradient class strings for policy cards (must stay in sync with Tailwind content scan). */
export const policyThemes = {
  emerald: 'from-emerald-500/90 via-teal-600/80 to-cyan-900/90',
  rose: 'from-rose-500/90 via-pink-600/75 to-rose-900/85',
  sky: 'from-sky-500/85 via-blue-600/80 to-indigo-900/90',
  fuchsia: 'from-fuchsia-500/85 via-purple-600/75 to-violet-900/90',
  amber: 'from-amber-400/90 via-orange-500/80 to-amber-900/85',
  violet: 'from-violet-500/85 via-purple-600/80 to-slate-900/90',
  lime: 'from-lime-400/85 via-green-600/75 to-emerald-950/90',
  orange: 'from-orange-500/90 via-amber-600/75 to-orange-950/90',
}

export function getPolicyTheme(theme) {
  return policyThemes[theme] ?? policyThemes.violet
}

/** Maps PolicyBite department labels to gradient keys (see policies.json `department`). */
export function themeSlugFromDepartment(department) {
  const d = (department || '').toLowerCase().trim()
  if (d === 'finance') return 'emerald'
  if (d === 'education') return 'violet'
  if (d === 'health') return 'rose'
  if (d === 'agriculture') return 'lime'
  if (d === 'employment') return 'orange'
  if (d === 'digital india') return 'sky'
  return 'fuchsia'
}

export function getPolicyGradient(department) {
  return getPolicyTheme(themeSlugFromDepartment(department))
}
