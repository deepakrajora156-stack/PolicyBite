import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { readExploreScrollY, writeExploreScrollY } from '../utils/exploreScrollStorage'
import { readHomeScrollY } from '../utils/homeScrollStorage'
import { resetWindowScrollInstant } from '../utils/resetScroll'

/**
 * Explore: top unless returning from policy (`restoreExploreScroll`).
 * Quiz/Library: always top. Home: restore saved Y.
 */
export function TabScrollManager() {
  const location = useLocation()
  const { pathname, state } = location
  const restoreExploreScroll = state?.restoreExploreScroll === true

  useLayoutEffect(() => {
    if (pathname === '/explore') {
      if (restoreExploreScroll) {
        const y = readExploreScrollY()
        if (y !== null) {
          const root = document.documentElement
          const prev = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          window.scrollTo(0, y)
          root.style.scrollBehavior = prev
        }
      } else {
        resetWindowScrollInstant()
        writeExploreScrollY(0)
      }
      return
    }

    if (pathname === '/quiz' || pathname.startsWith('/library')) {
      resetWindowScrollInstant()
      return
    }

    if (pathname === '/') {
      const y = readHomeScrollY()
      if (y !== null) {
        const root = document.documentElement
        const prev = root.style.scrollBehavior
        root.style.scrollBehavior = 'auto'
        window.scrollTo(0, y)
        root.style.scrollBehavior = prev
      }
    }
  }, [pathname, restoreExploreScroll])

  return null
}
