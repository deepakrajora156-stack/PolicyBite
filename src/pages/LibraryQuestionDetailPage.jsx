import { Link, useLocation, useParams } from 'react-router-dom'
import { getAiQuestions } from '../utils/libraryStore'
import { policyLinkState } from '../utils/policyNavigation'

export function LibraryQuestionDetailPage() {
  const { policyId } = useParams()
  const { state } = useLocation()

  const items = getAiQuestions(999).filter((q) => q.policyId === policyId)
  const title = state?.policyTitle || items[0]?.policyTitle || 'Policy Questions'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-white">{title}</h1>
        <Link to="/library/questions" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          Back to My Questions
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-sm text-neutral-400">No questions for this policy yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => (
            <li key={q.id} className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-violet-200">Q: {q.question}</p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-200">A: {q.answer}</p>
              <Link
                to={`/policy/${q.policyId}`}
                state={policyLinkState('library', { openAiChat: true, aiQuestion: q.question })}
                className="inline-flex text-xs font-semibold text-violet-300 hover:text-violet-200"
              >
                Reopen in chat
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
