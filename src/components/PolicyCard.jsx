import { Link, useLocation } from 'react-router-dom'
import { policyLinkState } from '../utils/policyNavigation'
import { getPolicyGradient } from '../data/policyThemes'
import { getDepartmentEmoji } from '../utils/departmentEmoji'
import { BookmarkAffordance } from './BookmarkAffordance'

export function PolicyCard({ policy, variant = 'default' }) {
  const { pathname } = useLocation()
  const policyOrigin = pathname === '/' ? 'home' : pathname === '/library' ? 'library' : 'explore'
  const gradient = getPolicyGradient(policy.department)
  const deptEmoji = getDepartmentEmoji(policy.department)
  const isFeed = variant === 'feed'

  return (
    <article className={`relative ${isFeed ? 'w-full' : ''}`}>
      <Link
        to={`/policy/${policy.id}`}
        state={policyLinkState(policyOrigin)}
        className={`group relative block w-full overflow-hidden border border-white/[0.12] bg-zinc-950/55 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset] outline-none ring-1 ring-white/[0.04] backdrop-blur-xl transition-all duration-500 ease-out will-change-transform hover:border-white/[0.18] hover:bg-zinc-950/70 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.75),0_0_48px_-12px_rgba(167,139,250,0.22),0_0_0_1px_rgba(255,255,255,0.1)_inset] focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-[0.995] motion-reduce:transition-none motion-reduce:hover:scale-100 ${
          isFeed
            ? 'rounded-2xl hover:scale-[1.01] sm:rounded-[1.35rem]'
            : 'rounded-[1.75rem] hover:scale-[1.03] motion-reduce:hover:scale-100'
        } `}
      >
        <div
          className={`relative bg-gradient-to-br ${gradient} transition-all duration-500 ease-out group-hover:brightness-[1.08] group-hover:saturate-110 ${
            isFeed ? 'h-48 sm:h-52' : 'h-44 sm:h-48'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_80%_0%,rgba(255,255,255,0.28),transparent_50%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div
            className={`absolute flex items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-lg shadow-black/25 backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-white/35 group-hover:bg-white/25 ${
              isFeed
                ? 'bottom-4 right-4 h-12 w-12 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14'
                : 'right-4 top-4 h-14 w-14 sm:right-4 sm:top-4 sm:h-16 sm:w-16'
            }`}
          >
            <span className={`drop-shadow-md ${isFeed ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-[2rem]'}`} aria-hidden>
              {deptEmoji}
            </span>
          </div>
        </div>

        <div
          className={`space-y-2 ${isFeed ? 'px-4 pb-6 pt-4 sm:space-y-3 sm:px-6 sm:pb-7 sm:pt-5' : 'space-y-3 px-5 pb-6 pt-4 sm:px-6 sm:pb-7 sm:pt-5'}`}
        >
          <p
            className={`flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-neutral-500 ${
              isFeed ? 'text-[10px] sm:text-[11px]' : 'text-[11px] text-neutral-400'
            }`}
          >
            <span className={`leading-none ${isFeed ? 'text-sm sm:text-base' : 'text-base'}`} aria-hidden>
              {deptEmoji}
            </span>
            <span>{policy.department}</span>
          </p>
          <h2
            className={`font-display font-bold tracking-tight text-white ${
              isFeed
                ? 'text-[1.35rem] leading-[1.2] sm:text-[1.65rem] sm:leading-tight'
                : 'text-xl font-semibold leading-snug sm:text-2xl'
            }`}
          >
            {policy.title}
          </h2>
          <p
            className={`leading-relaxed text-neutral-300 ${
              isFeed ? 'text-[15px] sm:text-lg' : 'text-[15px] text-neutral-400 sm:text-base'
            }`}
          >
            {policy.one_liner}
          </p>
          <p
            className={`border-t border-white/[0.06] font-medium text-neutral-500 transition-colors duration-300 group-hover:text-violet-300/90 ${
              isFeed ? 'pt-3 text-[11px] uppercase tracking-wider sm:text-xs' : 'pt-3 text-xs'
            }`}
          >
            {isFeed ? 'Tap to read' : 'Tap to learn more'} <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
      {isFeed && <BookmarkAffordance policyId={policy.id} className="absolute right-3 top-3 sm:right-4 sm:top-4" />}
    </article>
  )
}
