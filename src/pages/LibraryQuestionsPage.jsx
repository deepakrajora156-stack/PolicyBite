import { Link } from 'react-router-dom'
import { getAiQuestions } from '../utils/libraryStore'

export function LibraryQuestionsPage() {
  const grouped = Object.values(
    getAiQuestions(999).reduce((acc, q) => {
      if (!acc[q.policyId]) {
        acc[q.policyId] = {
          policyId: q.policyId,
          policyTitle: q.policyTitle || 'Policy',
          count: 0,
          latestAskedAt: q.askedAt || 0,
        }
      }
      acc[q.policyId].count += 1
      acc[q.policyId].latestAskedAt = Math.max(acc[q.policyId].latestAskedAt, q.askedAt || 0)
      return acc
    }, {}),
  ).sort((a, b) => b.latestAskedAt - a.latestAskedAt)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-white">My Questions</h1>
        <Link to="/library" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          Back to Library
        </Link>
      </div>

      {grouped.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-sm text-neutral-400">No questions asked yet.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {grouped.map((group) => (
            <li key={group.policyId}>
              <Link
                to={`/library/questions/${group.policyId}`}
                state={{ policyTitle: group.policyTitle }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-3 transition hover:border-white/20"
              >
                <span className="text-sm font-medium text-neutral-100">{group.policyTitle}</span>
                <span className="text-xs text-neutral-500">{group.count} questions</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
