import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LIBRARY_EVENT,
  getAiQuestions,
  getDailyStreak,
  getPoliciesReadCount,
  getPolicyNotes,
  getQuizzesCompleted,
  getSavedPolicyIds,
  touchDailyStreak,
} from '../utils/libraryStore'

export function LibraryPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    touchDailyStreak()
    const onChange = () => setRefreshKey((k) => k + 1)
    window.addEventListener(LIBRARY_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(LIBRARY_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const streak = getDailyStreak()
  const policiesRead = getPoliciesReadCount()
  const quizzesCompleted = getQuizzesCompleted()
  const savedCount = getSavedPolicyIds().length
  const questionCount = getAiQuestions(999).length
  const noteCount = getPolicyNotes().length

  return (
    <div className="space-y-6" key={refreshKey}>
      <div className="space-y-2 px-0.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Library</h1>
        <p className="text-sm text-neutral-400">Pick a section to continue your learning.</p>
      </div>

      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Policies read</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{policiesRead}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Quizzes completed</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{quizzesCompleted}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">
          Daily streak
        </h2>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-3xl font-bold text-amber-300">Streak: {streak.current} days</p>
          <p className="text-xs text-neutral-500">Longest: {streak.longest}</p>
        </div>
      </section>

      <section className="space-y-3">
        <Link
          to="/library/saved"
          className="block rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <p className="font-display text-base font-semibold text-white">Saved Policies</p>
          <p className="mt-1 text-sm text-neutral-500">{savedCount} saved</p>
        </Link>

        <Link
          to="/library/questions"
          className="block rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <p className="font-display text-base font-semibold text-white">My Questions</p>
          <p className="mt-1 text-sm text-neutral-500">{questionCount} asked</p>
        </Link>

        <Link
          to="/library/notes"
          className="block rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <p className="font-display text-base font-semibold text-white">My Notes</p>
          <p className="mt-1 text-sm text-neutral-500">{noteCount} policies with notes</p>
        </Link>
      </section>

    </div>
  )
}
