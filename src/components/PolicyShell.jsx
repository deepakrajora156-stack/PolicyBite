import { useLayoutEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { resetWindowScrollInstant } from '../utils/resetScroll'
import { getPolicyBackTarget } from '../utils/policyNavigation'

export function PolicyShell() {
  const { pathname, state } = useLocation()
  const back = getPolicyBackTarget(state)

  useLayoutEffect(() => {
    if (pathname.startsWith('/policy/')) {
      resetWindowScrollInstant()
    }
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-[#0a0a0a] font-sans text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <Link
            to={back.to}
            state={back.state}
            className="shrink-0 text-sm font-medium text-violet-300/90 transition-colors hover:text-violet-200"
          >
            {back.label}
          </Link>
          <Link to="/" className="min-w-0 text-right font-display text-sm font-bold text-white">
            PolicyBite
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-10 pt-5 sm:px-5">
        <Outlet />
      </main>
    </div>
  )
}
