import { useEffect, useState } from 'react'
import { LIBRARY_EVENT, isPolicySaved, toggleSavedPolicy } from '../utils/libraryStore'

export function BookmarkAffordance({ policyId, className = '' }) {
  const [saved, setSaved] = useState(() => (policyId ? isPolicySaved(policyId) : false))

  useEffect(() => {
    if (!policyId) return
    const sync = () => setSaved(isPolicySaved(policyId))
    window.addEventListener(LIBRARY_EVENT, sync)
    return () => window.removeEventListener(LIBRARY_EVENT, sync)
  }, [policyId])

  return (
    <button
      type="button"
      className={`pointer-events-auto z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-white/35 hover:bg-black/55 active:scale-95 ${className}`}
      aria-label={saved ? 'Remove from saved policies' : 'Save policy'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!policyId) return
        setSaved(toggleSavedPolicy(policyId))
      }}
    >
      <svg
        className={`h-5 w-5 ${saved ? 'text-amber-300' : ''}`}
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 4v15l6-4 6 4V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2Z" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
