/**
 * Maps ministry / department names to category emojis for card UI.
 */
export function getDepartmentEmoji(department) {
  if (!department || typeof department !== 'string') return '🏛️'
  const d = department.toLowerCase()

  if (d.includes('finance')) return '💰'
  if (d.includes('health')) return '🏥'
  if (d.includes('education')) return '🎓'
  if (d.includes('agriculture') || d.includes('farmers')) return '🌾'
  if (d.includes('employment') || d.includes('labour') || d.includes('labor')) return '💼'
  if (
    d.includes('electronics') ||
    d.includes('digital') ||
    d.includes('information technology') ||
    (d.includes('it') && d.includes('ministry'))
  ) {
    return '💻'
  }

  return '🏛️'
}
