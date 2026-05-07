import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import policies from '../data/policies'
import { DEPARTMENTS } from '../data/departments'
import { PolicyCard } from '../components/PolicyCard'
import { writeExploreScrollY } from '../utils/exploreScrollStorage'
import {
  readExploreDepartment,
  readExploreQuery,
  readExploreSort,
  writeExploreDepartment,
  writeExploreQuery,
  writeExploreSort,
} from '../utils/exploreUiStorage'

const SORT_OPTIONS = [
  { id: 'az', label: 'A-Z' },
  { id: 'latest', label: 'Latest to Oldest' },
  { id: 'oldest', label: 'Oldest to Latest' },
]

function getSortLabel(sortId) {
  const found = SORT_OPTIONS.find((s) => s.id === sortId)
  return found?.label ?? 'Latest to Oldest'
}

export function ExplorePage() {
  const [selectedDepartment, setSelectedDepartment] = useState(() => readExploreDepartment())
  const [query, setQuery] = useState(() => readExploreQuery())
  const [sortBy, setSortBy] = useState(() => readExploreSort())
  const [isDeptSheetOpen, setIsDeptSheetOpen] = useState(false)
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false)
  const deptMenuRef = useRef(null)
  const sortMenuRef = useRef(null)

  useLayoutEffect(() => {
    return () => {
      writeExploreScrollY(window.scrollY)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const flush = () => {
      writeExploreScrollY(window.scrollY)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        flush()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    writeExploreQuery(query)
  }, [query])

  useEffect(() => {
    writeExploreDepartment(selectedDepartment)
  }, [selectedDepartment])

  useEffect(() => {
    writeExploreSort(sortBy)
  }, [sortBy])

  useEffect(() => {
    function onPointerDown(event) {
      const target = event.target
      if (isDeptSheetOpen && deptMenuRef.current && !deptMenuRef.current.contains(target)) {
        setIsDeptSheetOpen(false)
      }
      if (isSortSheetOpen && sortMenuRef.current && !sortMenuRef.current.contains(target)) {
        setIsSortSheetOpen(false)
      }
    }
    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [isDeptSheetOpen, isSortSheetOpen])

  const filteredPolicies = useMemo(() => {
    let list = selectedDepartment ? policies.filter((p) => p.department === selectedDepartment) : policies
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.one_liner.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q),
      )
    }

    const copy = [...list]
    if (sortBy === 'az') {
      copy.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'oldest') {
      copy.sort((a, b) => (a.launch_year ?? 0) - (b.launch_year ?? 0))
    } else {
      copy.sort((a, b) => (b.launch_year ?? 0) - (a.launch_year ?? 0))
    }
    return copy
  }, [selectedDepartment, query, sortBy])

  return (
    <div className="space-y-8">
      <div className="space-y-2 px-0.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Explore</h1>
        <p className="text-sm leading-relaxed text-neutral-400">
          Pick a department, then scroll policies. Use search anytime.
        </p>
      </div>

      <div>
        <label htmlFor="policy-search" className="sr-only">
          Search policies
        </label>
        <input
          id="policy-search"
          type="search"
          autoComplete="off"
          placeholder="Search title, topic, or department…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white outline-none ring-0 transition placeholder:text-neutral-600 focus:border-violet-400/40 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/30"
        />
      </div>

      <section aria-label="Filter and sort" className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div ref={deptMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsDeptSheetOpen((prev) => !prev)
                setIsSortSheetOpen(false)
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition hover:border-white/20"
              aria-expanded={isDeptSheetOpen}
              aria-haspopup="menu"
            >
              <span className="text-sm font-semibold text-white">
                {selectedDepartment ?? 'All Departments'}
              </span>
              <span className="text-neutral-500" aria-hidden>
                ⌄
              </span>
            </button>
            {isDeptSheetOpen && (
              <div className="absolute left-0 top-[calc(100%+0.45rem)] z-30 w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.85)]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDepartment(null)
                    setIsDeptSheetOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 text-left text-sm text-white transition hover:bg-white/[0.05]"
                >
                  <span>All Departments</span>
                  <span className="text-violet-300">{selectedDepartment === null ? '✓' : ''}</span>
                </button>
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDepartment(d.id)
                      setIsDeptSheetOpen(false)
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 text-left text-sm text-white transition hover:bg-white/[0.05]"
                  >
                    <span>
                      {d.emoji} {d.id}
                    </span>
                    <span className="text-violet-300">{selectedDepartment === d.id ? '✓' : ''}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={sortMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSortSheetOpen((prev) => !prev)
                setIsDeptSheetOpen(false)
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition hover:border-white/20"
              aria-expanded={isSortSheetOpen}
              aria-haspopup="menu"
            >
              <span className="text-sm font-semibold text-white">{getSortLabel(sortBy)}</span>
              <span className="text-neutral-500" aria-hidden>
                ⌄
              </span>
            </button>
            {isSortSheetOpen && (
              <div className="absolute right-0 top-[calc(100%+0.45rem)] z-30 w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.85)]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.id)
                      setIsSortSheetOpen(false)
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 text-left text-sm text-white transition hover:bg-white/[0.05]"
                  >
                    <span>{opt.label}</span>
                    <span className="text-violet-300">{sortBy === opt.id ? '✓' : ''}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedDepartment && (
            <button
              type="button"
              onClick={() => setSelectedDepartment(null)}
              className="rounded-full border border-violet-400/35 bg-violet-500/12 px-3 py-1.5 text-xs font-semibold text-violet-200"
            >
              {selectedDepartment} ✕
            </button>
          )}
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400">
            Sort: {getSortLabel(sortBy)}
          </span>
        </div>
      </section>

      <section className="space-y-4" aria-live="polite">
        <div className="flex items-baseline justify-between gap-2 px-0.5">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {selectedDepartment ?? 'All departments'}
          </h2>
          <span className="text-xs text-neutral-600">
            {filteredPolicies.length} {filteredPolicies.length === 1 ? 'policy' : 'policies'}
          </span>
        </div>
        {filteredPolicies.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
            <p className="text-sm font-medium text-neutral-300">No matches.</p>
            <p className="mt-2 text-xs text-neutral-500">Try another department or clear search.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-6 sm:gap-8">
            {filteredPolicies.map((policy) => (
              <li key={policy.id}>
                <PolicyCard policy={policy} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
