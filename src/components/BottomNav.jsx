import { NavLink, useLocation } from 'react-router-dom'
import { writeExploreScrollY } from '../utils/exploreScrollStorage'
import { resetWindowScrollInstant } from '../utils/resetScroll'

const tabClass =
  'flex min-w-[4.5rem] flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold tracking-wide text-neutral-500 transition-colors duration-200 hover:text-neutral-300'

const activeClass = 'text-violet-300'

export function BottomNav() {
  const location = useLocation()

  /** Re-tapping a tab while already there should jump to top (mobile expectation). */
  function onTabClick(targetPath) {
    if (location.pathname === targetPath) {
      requestAnimationFrame(() => {
        resetWindowScrollInstant()
        if (targetPath === '/explore') writeExploreScrollY(0)
      })
    }
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/92 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-xl justify-stretch px-2 sm:px-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${tabClass} ${isActive ? activeClass : ''}`}
        >
          <span className="text-xl leading-none" aria-hidden>
            🏠
          </span>
          Home
        </NavLink>
        <NavLink
          to="/explore"
          onClick={() => onTabClick('/explore')}
          className={({ isActive }) => `${tabClass} ${isActive ? activeClass : ''}`}
        >
          <span className="text-xl leading-none" aria-hidden>
            🔎
          </span>
          Explore
        </NavLink>
        <NavLink
          to="/quiz"
          onClick={() => onTabClick('/quiz')}
          className={({ isActive }) => `${tabClass} ${isActive ? activeClass : ''}`}
        >
          <span className="text-xl leading-none" aria-hidden>
            🧠
          </span>
          Quiz
        </NavLink>
        <NavLink
          to="/library"
          onClick={() => onTabClick('/library')}
          className={({ isActive }) => `${tabClass} ${isActive ? activeClass : ''}`}
        >
          <span className="text-xl leading-none" aria-hidden>
            📚
          </span>
          Library
        </NavLink>
      </div>
    </nav>
  )
}
