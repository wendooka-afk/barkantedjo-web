import { PARTNERS } from '../lib/constants'

// Répète la liste pour remplir le défilement, tout en gardant le split exact
// 50/50 nécessaire à la boucle marquee (translateX(-50%) sans saut visible).
const REPEATS = 3
const half = Array.from({ length: REPEATS }, () => PARTNERS).flat()

export default function LogoBar({ label = "Ils m'ont fait confiance" }) {
  const items = [...half, ...half]

  return (
    <div
      className="w-full py-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="eyebrow text-center mb-6" style={{ color: '#8A8A8A' }}>{label}</p>
      <div className="relative">
        <div className="flex w-max animate-marquee gap-6 sm:gap-8">
          {items.map((p, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center rounded-xl transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: '#F5F5F2',
                height: '64px',
                width: '160px',
                padding: '10px 20px',
              }}
            >
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(270deg, #0A0A0A, transparent)' }} />
      </div>
    </div>
  )
}
