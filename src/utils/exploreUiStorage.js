const Q_KEY = 'policybite:explore-query'
const DEPT_KEY = 'policybite:explore-dept'
const SORT_KEY = 'policybite:explore-sort'

export function readExploreQuery() {
  return sessionStorage.getItem(Q_KEY) ?? ''
}

export function writeExploreQuery(q) {
  sessionStorage.setItem(Q_KEY, q)
}

export function readExploreDepartment() {
  const v = sessionStorage.getItem(DEPT_KEY)
  if (v === null || v === '') return null
  return v
}

export function writeExploreDepartment(dept) {
  if (dept === null || dept === '') sessionStorage.removeItem(DEPT_KEY)
  else sessionStorage.setItem(DEPT_KEY, dept)
}

export function readExploreSort() {
  const v = sessionStorage.getItem(SORT_KEY)
  if (v === 'az' || v === 'latest' || v === 'oldest') return v
  return 'latest'
}

export function writeExploreSort(sortId) {
  if (sortId === 'az' || sortId === 'latest' || sortId === 'oldest') {
    sessionStorage.setItem(SORT_KEY, sortId)
  }
}
