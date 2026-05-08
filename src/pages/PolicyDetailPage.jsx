import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import policies from '../data/policies'
import { getPolicyGradient } from '../data/policyThemes'
import { getDepartmentEmoji } from '../utils/departmentEmoji'
import { DetailBlock } from '../components/DetailBlock'
import { PolicyImageFrame } from '../components/PolicyImageFrame'
import { getPolicyBackTarget } from '../utils/policyNavigation'
import {
  addAiQuestion,
  deletePolicyNote,
  getPolicyNote,
  recordViewedPolicy,
  upsertPolicyNote,
} from '../utils/libraryStore'
import { createMockPolicyAnswer, getSuggestedPolicyQuestions } from '../utils/policyAi'

export function PolicyDetailPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const back = getPolicyBackTarget(state)
  const policy = policies.find((p) => p.id === id)
  const gradient = policy ? getPolicyGradient(policy.department) : getPolicyGradient('Education')
  const openQuestion = state?.openAiChat ? String(state?.aiQuestion || '').trim() : ''
  const suggestedQuestions = getSuggestedPolicyQuestions(policy)
  const seededAnswer = policy && openQuestion ? createMockPolicyAnswer(policy, openQuestion) : ''
  const [isAiOpen, setIsAiOpen] = useState(() => Boolean(openQuestion))
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() =>
    policy && openQuestion
      ? [
          { id: 'seed-q', role: 'user', text: openQuestion },
          { id: 'seed-a', role: 'assistant', text: seededAnswer },
        ]
      : [],
  )
  const msgSeqRef = useRef(messages.length)
  const seededLogRef = useRef('')
  const [editingPolicyId, setEditingPolicyId] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const hasThread = messages.length > 0
  const savedNoteText = policy ? getPolicyNote(policy.id)?.text || '' : ''
  const isEditingNote = Boolean(policy && editingPolicyId === policy.id)

  useEffect(() => {
    if (policy) recordViewedPolicy(policy.id)
  }, [policy])

  function askQuestion(rawQuestion) {
    if (!policy) return
    const question = String(rawQuestion || '').trim()
    if (!question) return
    const answer = createMockPolicyAnswer(policy, question)
    const userId = `m-${msgSeqRef.current++}-u`
    const aiId = `m-${msgSeqRef.current++}-a`
    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', text: question },
      { id: aiId, role: 'assistant', text: answer },
    ])
    addAiQuestion({ policyId: policy.id, policyTitle: policy.title, question, answer })
  }

  function handleSaveNote() {
    if (!policy) return
    const trimmed = noteDraft.trim()
    if (!trimmed) return
    upsertPolicyNote({ policyId: policy.id, policyTitle: policy.title, text: trimmed })
    setEditingPolicyId(null)
  }

  function handleDeleteNote() {
    if (!policy) return
    deletePolicyNote(policy.id)
    setEditingPolicyId(null)
    setNoteDraft('')
  }

  useEffect(() => {
    if (!policy || !openQuestion) return
    const key = `${policy.id}::${openQuestion}`
    if (seededLogRef.current === key) return
    seededLogRef.current = key
    addAiQuestion({
      policyId: policy.id,
      policyTitle: policy.title,
      question: openQuestion,
      answer: seededAnswer || createMockPolicyAnswer(policy, openQuestion),
    })
  }, [policy, openQuestion, seededAnswer])

  const chatHint = useMemo(
    () =>
      hasThread
        ? 'Ask follow-ups and keep it simple.'
        : 'Ask anything about this policy — you can start with suggested prompts.',
    [hasThread],
  )

  if (!policy) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#121212] p-8 text-center">
        <p className="font-display text-lg font-semibold text-white">We couldn’t find that policy.</p>
        <p className="mt-2 text-sm text-neutral-400">The link may be old or mistyped.</p>
        <Link
          to={back.to}
          state={back.state}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          {back.fullLabel}
        </Link>
      </div>
    )
  }

  return (
    <article className="space-y-5 pb-24">
      <div
        className={`overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121212] shadow-[0_12px_48px_-16px_rgba(0,0,0,0.9)]`}
      >
        <div className={`relative h-40 bg-gradient-to-br ${gradient}`}>
          <PolicyImageFrame src={policy.image} alt={policy.title} />
          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
          <span className="absolute bottom-4 left-5 text-5xl drop-shadow-lg" aria-hidden>
            {getDepartmentEmoji(policy.department)}
          </span>
        </div>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {policy.department}
          </p>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-white">
              {policy.title}
            </h1>
            <button
              type="button"
              onClick={() => {
                if (isEditingNote) {
                  setEditingPolicyId(null)
                  return
                }
                setNoteDraft(savedNoteText)
                setEditingPolicyId(policy.id)
              }}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-200 transition hover:border-white/30 hover:bg-white/[0.09]"
              aria-label="Edit note"
              title="Edit note"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="m16.5 3.5 4 4L8 20l-5 1 1-5Z" />
              </svg>
            </button>
          </div>
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium leading-relaxed text-neutral-200">
            {policy.one_liner}
          </p>
        </div>
      </div>

      <DetailBlock title="What is it?">
        <p>{policy.what}</p>
      </DetailBlock>

      <DetailBlock title="Why was it needed?">
        <p>{policy.why}</p>
      </DetailBlock>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.06] bg-[#1a1010] p-4 sm:p-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-rose-400/90">
            Before
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">{policy.before}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#101a14] p-4 sm:p-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-emerald-400/90">
            After
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-300">{policy.after}</p>
        </div>
      </section>

      <DetailBlock title="Real-life style example">
        <p>{policy.example}</p>
      </DetailBlock>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 sm:p-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-emerald-300/90">
            Pros
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-[15px] leading-relaxed text-neutral-200 marker:text-emerald-400/80">
            {policy.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4 sm:p-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-amber-300/90">
            Cons
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-[15px] leading-relaxed text-neutral-200 marker:text-amber-400/80">
            {policy.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-neutral-400">
          Official Government Source
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Launch year: <span className="font-semibold text-neutral-200">{policy.launch_year}</span>
        </p>
        <a
          href={policy.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-violet-400/40 bg-violet-500/15 px-4 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25"
        >
          Open Official Website
        </a>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-neutral-400">
            My Notes
          </h2>
          {!isEditingNote && savedNoteText && (
            <button
              type="button"
              onClick={() => {
                setNoteDraft(savedNoteText)
                setEditingPolicyId(policy.id)
              }}
              className="text-xs font-semibold text-violet-300 transition hover:text-violet-200"
            >
              Edit
            </button>
          )}
        </div>

        {!isEditingNote ? (
          savedNoteText ? (
            <p className="whitespace-pre-line rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm leading-relaxed text-neutral-200">
              {savedNoteText}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => {
                setNoteDraft(savedNoteText)
                setEditingPolicyId(policy.id)
              }}
              className="inline-flex rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-neutral-200 transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              Add note
            </button>
          )
        ) : (
          <div className="space-y-2">
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Write your note about this policy..."
              className="h-28 w-full resize-none rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-violet-400/40"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSaveNote}
                className="rounded-lg border border-white/20 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Save
              </button>
              {savedNoteText && (
                <button
                  type="button"
                  onClick={handleDeleteNote}
                  className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setNoteDraft(savedNoteText)
                  setEditingPolicyId(null)
                }}
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-xs font-semibold text-neutral-300 transition hover:bg-white/[0.06]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <Link
        to={back.to}
        state={back.state}
        className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.1]"
      >
        {back.fullLabel}
      </Link>

      <button
        type="button"
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-4 left-1/2 z-30 w-[min(92vw,28rem)] -translate-x-1/2 rounded-full border border-violet-300/30 bg-violet-500/20 px-5 py-3 text-sm font-semibold text-violet-100 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.55)] backdrop-blur-md transition hover:bg-violet-500/25"
      >
        💬 Ask AI About This Policy
      </button>

      {isAiOpen && (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsAiOpen(false)}
            aria-label="Close AI chat"
          />
          <section className="absolute bottom-0 left-0 right-0 max-h-[84vh] overflow-hidden rounded-t-3xl border-t border-white/10 bg-[#111111] shadow-[0_-18px_50px_-16px_rgba(0,0,0,0.85)]">
            <header className="border-b border-white/10 px-4 pb-3 pt-3.5">
              <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-white/20" />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold text-white">AI Q&A</p>
                  <p className="text-xs text-neutral-500">{chatHint}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiOpen(false)}
                  className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 transition hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>
            </header>

            <div className="max-h-[56vh] space-y-4 overflow-y-auto px-4 py-4">
              {!hasThread && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-neutral-400">
                  Hi! I can explain this policy in simple words.
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-violet-500/20 text-violet-100'
                        : 'border border-white/10 bg-white/[0.04] text-neutral-200'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <footer className="space-y-3 border-t border-white/10 px-4 pb-4 pt-3">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => askQuestion(q)}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-violet-300/35 hover:bg-violet-500/10 hover:text-violet-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="h-11 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-violet-400/40"
                />
                <button
                  type="button"
                  onClick={() => {
                    askQuestion(input)
                    setInput('')
                  }}
                  className="rounded-xl border border-violet-400/40 bg-violet-500/20 px-4 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/30"
                >
                  Send
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </article>
  )
}
