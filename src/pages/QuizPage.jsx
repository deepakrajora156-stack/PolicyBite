import { useCallback, useState } from 'react'
import policies from '../data/policies'
import { incrementQuizzesCompleted } from '../utils/libraryStore'

const ROUND_SIZE = 8

function shuffle(items) {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildPool() {
  return policies
    .filter((p) => p.quiz?.question && Array.isArray(p.quiz.options) && p.quiz.options.length === 4)
    .map((p) => ({
      policyId: p.id,
      policyTitle: p.title,
      question: p.quiz.question,
      options: p.quiz.options,
      correctIndex: p.quiz.correctIndex,
    }))
}

function nextRoundQuestions() {
  const pool = buildPool()
  return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
}

export function QuizPage() {
  const [questions, setQuestions] = useState(nextRoundQuestions)
  const [step, setStep] = useState(0)
  const [pickedIndex, setPickedIndex] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [phase, setPhase] = useState('playing')

  const total = questions.length
  const current = questions[step]
  const isLast = step >= total - 1
  const finished = phase === 'done'

  const restart = useCallback(() => {
    setQuestions(nextRoundQuestions())
    setStep(0)
    setPickedIndex(null)
    setCorrectCount(0)
    setPhase('playing')
  }, [])

  function handlePick(index) {
    if (pickedIndex !== null || !current) return
    setPickedIndex(index)
    if (index === current.correctIndex) {
      setCorrectCount((c) => c + 1)
    }
  }

  function handleNext() {
    if (isLast) {
      incrementQuizzesCompleted()
      setPhase('done')
      return
    }
    setStep((s) => s + 1)
    setPickedIndex(null)
  }

  if (!total) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-10 text-center text-sm text-neutral-400">
        No quiz questions loaded yet.
      </div>
    )
  }

  if (finished) {
    return (
      <div className="space-y-8">
        <div className="space-y-2 px-0.5">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">Your results</h1>
          <p className="text-sm text-neutral-400">Here’s how you did this round.</p>
        </div>
        <div className="rounded-3xl border border-violet-400/30 bg-violet-500/10 px-6 py-10 text-center shadow-[0_0_40px_-12px_rgba(167,139,250,0.35)]">
          <p className="font-display text-5xl font-bold text-white">{correctCount}</p>
          <p className="mt-2 text-sm font-medium text-violet-200/90">out of {total} correct</p>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-300">
            {correctCount === total
              ? 'Perfect run — nice work! 🔥'
              : correctCount >= total * 0.6
                ? 'Solid score — keep exploring policies in the app.'
                : 'Read a few policy pages and try again — you’ve got this.'}
          </p>
        </div>
        <button
          type="button"
          onClick={restart}
          className="w-full rounded-2xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-neutral-200"
        >
          Play again
        </button>
      </div>
    )
  }

  const showResult = pickedIndex !== null

  return (
    <div className="space-y-6">
      <div className="space-y-2 px-0.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Quiz</h1>
        <p className="text-sm text-neutral-400">Tap the best answer. You’ll see feedback before the next one.</p>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>
          Question {step + 1} / {total}
        </span>
        <span className="truncate pl-2 text-right text-neutral-600">{current.policyTitle}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6">
        <p className="text-[15px] font-medium leading-relaxed text-neutral-100">{current.question}</p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {current.options.map((label, index) => {
            const isCorrect = index === current.correctIndex
            const isPicked = index === pickedIndex
            let cls =
              'w-full rounded-xl border px-4 py-3.5 text-left text-[15px] leading-snug transition-all duration-300 '

            if (!showResult) {
              cls +=
                'border-white/10 bg-white/[0.04] text-neutral-200 hover:border-violet-400/35 hover:bg-white/[0.07]'
            } else if (isCorrect) {
              cls +=
                'border-emerald-400/55 bg-emerald-500/15 text-emerald-50 shadow-[0_0_20px_-6px_rgba(52,211,153,0.35)]'
            } else if (isPicked) {
              cls +=
                'border-rose-400/50 bg-rose-500/15 text-rose-50 shadow-[0_0_16px_-6px_rgba(251,113,133,0.25)]'
            } else {
              cls += 'border-white/[0.06] bg-white/[0.02] text-neutral-500 opacity-60'
            }

            return (
              <li key={index}>
                <button
                  type="button"
                  disabled={showResult}
                  onClick={() => handlePick(index)}
                  className={cls}
                >
                  <span className="mr-2 font-mono text-xs text-neutral-500">{String.fromCharCode(65 + index)}.</span>
                  {label}
                </button>
              </li>
            )
          })}
        </ul>

        {showResult && (
          <div className="mt-5 space-y-4 border-t border-white/[0.08] pt-5">
            <p
              className={`text-center text-sm font-bold ${
                pickedIndex === current.correctIndex ? 'text-emerald-300' : 'text-amber-200'
              }`}
              role="status"
            >
              {pickedIndex === current.correctIndex ? 'Correct! 🔥' : 'Not quite — correct answer is highlighted.'}
            </p>
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-xl border border-white/15 bg-white/[0.08] py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.12]"
            >
              {isLast ? 'See results' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
