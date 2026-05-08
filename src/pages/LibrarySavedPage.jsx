import { Link } from 'react-router-dom'
import policies from '../data/policies'
import { getSavedPolicyIds } from '../utils/libraryStore'
import { policyLinkState } from '../utils/policyNavigation'

export function LibrarySavedPage() {
  const byId = new Map(policies.map((p) => [p.id, p]))
  const saved = getSavedPolicyIds().map((id) => byId.get(id)).filter(Boolean)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-white">Saved Policies</h1>
        <Link to="/library" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          Back to Library
        </Link>
      </div>

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-sm text-neutral-400">No saved policies yet.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {saved.map((policy) => (
            <li key={policy.id}>
              <Link
                to={`/policy/${policy.id}`}
                state={policyLinkState('library')}
                className="block rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/20"
              >
                {policy.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
