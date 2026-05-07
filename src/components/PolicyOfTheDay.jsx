import { Link } from 'react-router-dom'
import { policyLinkState } from '../utils/policyNavigation'
import { getPolicyGradient } from '../data/policyThemes'
import { getDepartmentEmoji } from '../utils/departmentEmoji'
import { BookmarkAffordance } from './BookmarkAffordance'

export function PolicyOfTheDay({ policy }) {
  const gradient = getPolicyGradient(policy.department)
  const deptEmoji = getDepartmentEmoji(policy.department)

  return (
    <section aria-labelledby="policy-of-the-day-heading" className="relative w-full space-y-3">
      <h2
        id="policy-of-the-day-heading"
        className="text-center font-display text-sm font-bold uppercase tracking-[0.18em] text-amber-200/95 sm:text-base"
      >
        🔥 Daily Policy
      </h2>

      <div className="relative w-full rounded-[1.9rem] bg-gradient-to-br from-amber-400/90 via-violet-500/75 to-fuchsia-600/80 p-[2px] shadow-[0_0_64px_-8px_rgba(251,191,36,0.45),0_12px_40px_-12px_rgba(0,0,0,0.75)]">
        <article>
          <Link
            to={`/policy/${policy.id}`}
            state={policyLinkState('home')}
            className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/90 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-xl transition-all duration-500 ease-out will-change-transform hover:scale-[1.01] hover:border-white/20 hover:ring-white/20 hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.35)] focus-visible:ring-2 focus-visible:ring-amber-300/80 active:scale-[0.995] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <div
              className={`relative h-52 bg-gradient-to-br ${gradient} transition-all duration-500 ease-out group-hover:brightness-[1.1] group-hover:saturate-110 sm:h-60`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_70%_0%,rgba(255,255,255,0.35),transparent_55%)] opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md sm:left-5 sm:top-5 sm:px-3.5 sm:py-1.5 sm:text-xs">
                Today&apos;s Policy
              </div>

              <div className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-white/45 group-hover:bg-white/30 sm:bottom-5 sm:right-5 sm:h-16 sm:w-16">
                <span className="text-3xl drop-shadow-lg sm:text-[2.75rem]" aria-hidden>
                  {deptEmoji}
                </span>
              </div>
            </div>

            <div className="space-y-2 px-5 pb-7 pt-5 sm:space-y-3 sm:px-7 sm:pb-8 sm:pt-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/90 sm:text-[11px]">
                <span className="text-base leading-none sm:text-lg" aria-hidden>
                  {deptEmoji}
                </span>
                <span className="text-neutral-400">{policy.department}</span>
              </p>
              <h3 className="font-display text-[1.45rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[1.75rem] sm:leading-tight">
                {policy.title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-200 sm:text-lg">{policy.one_liner}</p>
              <p className="border-t border-white/[0.08] pt-4 text-[11px] font-semibold uppercase tracking-wider text-amber-200/90 transition-colors duration-300 group-hover:text-amber-100 sm:text-xs">
                Open today’s spotlight <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        </article>
        <BookmarkAffordance policyId={policy.id} className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5" />
      </div>
    </section>
  )
}
