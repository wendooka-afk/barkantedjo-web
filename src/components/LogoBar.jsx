import { PARTNERS, COLORS } from '../lib/constants'

// Répète la liste pour remplir le défilement, tout en gardant le split exact
// 50/50 nécessaire à la boucle marquee (translateX(-50%) sans saut visible).
const REPEATS = 2
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
        <div className="flex w-max animate-marquee gap-4 sm:gap-5">
          {items.map((p, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-3 rounded-xl transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                padding: '10px 18px 10px 10px',
              }}
            >
              {/* Logo — carré clair pour rester lisible quel que soit le fond du fichier */}
              <div
                className="shrink-0 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: '#F5F5F2', width: '44px', height: '44px', padding: '6px' }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* Nom de la structure */}
              <span
                className="font-heading font-bold text-sm whitespace-nowrap"
                style={{ color: COLORS.white }}
              >
                {p.name}
              </span>
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
