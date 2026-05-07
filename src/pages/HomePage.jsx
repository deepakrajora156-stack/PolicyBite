import { useEffect, useLayoutEffect, useState } from 'react'
import policies from '../data/policies'
import { PolicyCard } from '../components/PolicyCard'
import { PolicyOfTheDay } from '../components/PolicyOfTheDay'
import { FeedItem } from '../components/FeedItem'
import { getPolicyOfTheDayIndex, getTodayKey, msUntilNextLocalMidnight } from '../utils/policyOfTheDay'
import { writeHomeScrollY } from '../utils/homeScrollStorage'

const MUST_KNOW_IDS = [
  'pm-jan-dhan-yojana',
  'ayushman-bharat-pmjay',
  'national-education-policy-2020',
  'mgnrega',
  'digital-india-programme',
]

export function HomePage() {
  const [todayKey, setTodayKey] = useState(() => getTodayKey())

  useEffect(() => {
    const delay = msUntilNextLocalMidnight() + 250
    const timerId = window.setTimeout(() => {
      setTodayKey(getTodayKey())
    }, delay)
    return () => window.clearTimeout(timerId)
  }, [todayKey])

  /** Save Y before unmount / route change — runs before other tabs reset the window scroll (avoids saving 0). */
  useLayoutEffect(() => {
    return () => {
      writeHomeScrollY(window.scrollY)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const flush = () => {
      writeHomeScrollY(window.scrollY)
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
      /* Do not flush here: runs after paint when the next page may already have scrollY === 0 */
    }
  }, [])

  const featured = policies[getPolicyOfTheDayIndex(policies.length)]

  const mustKnowPolicies = MUST_KNOW_IDS.map((id) => policies.find((p) => p.id === id))
    .filter(Boolean)
    .filter((p) => p.id !== featured.id)
    .slice(0, 5)

  return (
    <div className="flex flex-col">
      <div className="mb-6 px-1 sm:mb-10 sm:px-0">
        <h1 className="whitespace-nowrap font-display text-[clamp(1.08rem,4.6vw,1.85rem)] font-bold tracking-[-0.015em] text-white sm:tracking-tight">
          Understand India&apos;s biggest policies — simply.
        </h1>
      </div>

      {/* Full-bleed feed on small screens (Instagram-style edge-to-edge cards) */}
      <div className="-mx-4 flex flex-col gap-3 sm:mx-0 sm:gap-4">
        <FeedItem>
          <PolicyOfTheDay policy={featured} />
        </FeedItem>

        <div className="px-4 pt-2 sm:px-0 sm:pt-4">
          <h2
            id="must-know-heading"
            className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
          >
            Must know
          </h2>
        </div>

        <ul className="flex flex-col gap-3 sm:gap-4" aria-labelledby="must-know-heading">
          {mustKnowPolicies.map((policy) => (
            <li key={policy.id} className="px-4 sm:px-0">
              <FeedItem>
                <PolicyCard policy={policy} variant="feed" />
              </FeedItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
