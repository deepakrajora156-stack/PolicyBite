export function DetailBlock({ title, children, className = '' }) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.06] bg-[#141414] p-4 sm:p-5 ${className}`}
    >
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
        {title}
      </h2>
      <div className="mt-3 text-[15px] leading-relaxed text-neutral-300">{children}</div>
    </section>
  )
}
