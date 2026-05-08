import { Link } from 'react-router-dom'
import { getPolicyNotes } from '../utils/libraryStore'

export function LibraryNotesPage() {
  const notes = getPolicyNotes()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-semibold text-white">My Notes</h1>
        <Link to="/library" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          Back to Library
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-sm text-neutral-400">No policy notes yet.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.policyId}>
              <Link
                to={`/library/notes/${note.policyId}`}
                className="block rounded-xl border border-white/10 bg-black/20 px-3 py-3 transition hover:border-white/20"
              >
                <p className="text-sm font-semibold text-neutral-100">{note.policyTitle}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-400">{note.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
