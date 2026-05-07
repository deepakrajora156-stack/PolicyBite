/**
 * Jump to top without smooth scrolling (avoids conflict with `scroll-behavior: smooth` on html).
 */
export function resetWindowScrollInstant() {
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.scrollTop = 0
  document.body.scrollTop = 0
  root.style.scrollBehavior = prev
}
