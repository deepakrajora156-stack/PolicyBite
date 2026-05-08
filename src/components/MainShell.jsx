import { Link, Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TabScrollManager } from './TabScrollManager'

export function MainShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0a0a0a] font-sans text-neutral-100">
      <TabScrollManager />
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-xl items-center px-4 py-3.5 sm:px-5 sm:py-4">
          <Link to="/" className="min-w-0 transition-opacity hover:opacity-90">
            <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              PolicyBite
            </span>
            <p className="mt-0.5 text-xs leading-snug text-neutral-500 sm:text-[13px]">
              Understand India in 2 minutes a day
            </p>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-28 pt-5 sm:px-5 sm:pb-32">
        <Outlet />
        <footer className="mt-10 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-sm font-medium text-neutral-500">Learn 1 policy daily 🚀</p>
        </footer>
      </main>

      <BottomNav />
    </div>
  )
}
