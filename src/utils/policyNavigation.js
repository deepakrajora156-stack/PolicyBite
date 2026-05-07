/** @typedef {'home' | 'explore' | 'library'} PolicyOrigin */

export function policyLinkState(origin, extra = undefined) {
  return extra ? { policyOrigin: origin, ...extra } : { policyOrigin: origin }
}

/**
 * @param {unknown} routerState - `location.state` from React Router
 */
export function getPolicyBackTarget(routerState) {
  const fromLibrary = routerState?.policyOrigin === 'library'
  const fromHome = routerState?.policyOrigin === 'home'
  if (fromLibrary) {
    return {
      to: '/library',
      state: undefined,
      label: '← Library',
      fullLabel: '← Back to Library',
    }
  }
  return {
    to: fromHome ? '/' : '/explore',
    state: fromHome ? undefined : { restoreExploreScroll: true },
    label: fromHome ? '← Home' : '← Explore',
    fullLabel: fromHome ? '← Back to Home' : '← Back to Explore',
  }
}
