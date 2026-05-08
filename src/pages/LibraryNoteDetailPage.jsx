import { Link, useParams } from 'react-router-dom'
import { getPolicyNote } from '../utils/libraryStore'

export function LibraryNoteDetailPage() {
  const { policyId } = useParams()
  const note = policyId ? getPolicyNote(policyId) : null

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-white">{note?.policyTitle || 'My Note'}</h1>
        <Link to="/library/notes" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          Back to My Notes
        </Link>
      </div>

      {!note ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-sm text-neutral-400">This note is not available anymore.</p>
        </div>
      ) : (
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-neutral-200">Full Note</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-200">{note.text}</p>
        </article>
      )}
    </div>
  )
}
