import { useMemo, useState } from 'react'

const FALLBACK_BG = '#1f2937'

function parseHex(hex) {
  const value = (hex || '').replace('#', '')
  if (value.length !== 6) return null
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  if ([r, g, b].some((n) => Number.isNaN(n))) return null
  return { r, g, b }
}

function toCssColor({ r, g, b }) {
  return `rgb(${r} ${g} ${b})`
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

export function PolicyImageFrame({ src, alt }) {
  const [failed, setFailed] = useState(false)
  const [bgColor, setBgColor] = useState(FALLBACK_BG)
  const [hasTransparency, setHasTransparency] = useState(false)

  const showPlaceholder = failed || !src
  const effectiveBg = hasTransparency ? '#ffffff' : bgColor
  const containerStyle = useMemo(() => ({ backgroundColor: effectiveBg }), [effectiveBg])
  const edgeBlendStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, ${effectiveBg} 0%, transparent 14%, transparent 86%, ${effectiveBg} 100%), linear-gradient(to bottom, ${effectiveBg} 0%, transparent 14%, transparent 86%, ${effectiveBg} 100%)`,
    }),
    [effectiveBg],
  )
  const maskStyle = useMemo(
    () => ({
      WebkitMaskImage:
        'radial-gradient(ellipse 90% 86% at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0) 100%)',
      maskImage:
        'radial-gradient(ellipse 90% 86% at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0) 100%)',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
    }),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden" style={containerStyle}>
      {showPlaceholder ? (
        <div className="flex h-full w-full items-center justify-center bg-[#111827] p-5">
          <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-300">Policy Image</p>
            <p className="mt-1 text-sm text-neutral-400">Unavailable</p>
          </div>
        </div>
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center p-3 sm:p-4 ${
            hasTransparency ? 'bg-white' : ''
          }`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={maskStyle}
            onError={() => setFailed(true)}
            onLoad={(event) => {
              try {
                const img = event.currentTarget
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d', { willReadFrequently: true })
                if (!ctx) return
                const w = 26
                const h = 26
                canvas.width = w
                canvas.height = h
                ctx.drawImage(img, 0, 0, w, h)
                const { data } = ctx.getImageData(0, 0, w, h)

                let r = 0
                let g = 0
                let b = 0
                let count = 0
                let transparent = 0

                for (let i = 0; i < data.length; i += 4) {
                  const alpha = data[i + 3]
                  if (alpha < 240) {
                    transparent += 1
                    continue
                  }
                  r += data[i]
                  g += data[i + 1]
                  b += data[i + 2]
                  count += 1
                }

                const totalPx = w * h
                setHasTransparency(transparent > totalPx * 0.08)
                if (count > 0) {
                  const tone = {
                    r: clamp(Math.round(r / count), 20, 236),
                    g: clamp(Math.round(g / count), 20, 236),
                    b: clamp(Math.round(b / count), 20, 236),
                  }
                  setBgColor(toCssColor(tone))
                  return
                }
                const parsed = parseHex(FALLBACK_BG)
                if (parsed) setBgColor(toCssColor(parsed))
              } catch {
                setBgColor(FALLBACK_BG)
              }
            }}
            className="h-full w-full object-contain p-1 sm:p-2"
          />
          <div className="pointer-events-none absolute inset-0 opacity-60" style={edgeBlendStyle} />
        </div>
      )}
    </div>
  )
}
