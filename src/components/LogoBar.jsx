import { PARTNERS } from '../lib/constants'

export default function LogoBar({ label = 'Ils lui font confiance' }) {
  const items = [...PARTNERS, ...PARTNERS] // duplicate for seamless marquee

  return (
    <div
      className="w-full py-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="eyebrow text-center mb-6" style={{ color: '#8A8A8A' }}>{label}</p>
      <div className="relative">
        <div className="flex w-max animate-marquee gap-12 sm:gap-20">
          {items.map((p, i) => (
            <span
              key={i}
              className="font-heading font-extrabold text-lg sm:text-2xl whitespace-nowrap shrink-0 transition-colors duration-300"
              style={{ color: '#8A8A8A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B4E701')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
            >
              {p.name}
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(270deg, #0A0A0A, transparent)' }} />
      </div>
    </div>
  )
}
