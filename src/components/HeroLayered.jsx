import { SOCIALS, CROWD_BG } from '../lib/constants'
import { YouTubeIcon, TikTokIcon, FacebookIcon } from './BrandIcons'

/**
 * Hero style "Oprah Winfrey" :
 *  - bgText : mot/nom GÉANT placé DERRIÈRE le portrait (z-0)
 *  - portrait : sujet détouré (PNG transparent) au centre, sur fond noir (z-10)
 *  - eyebrow / punchline / sub / CTA : DEVANT (z-20)
 *
 * Props:
 *  bgText, gradientPart, eyebrow, punchline, sub, portrait, portraitPos,
 *  children (CTAs), showSocials, compact,
 *  cutout (true = image déjà détourée, pas de masque radial)
 */
export default function HeroLayered({
  bgText,
  punchline,
  sub,
  portrait,
  portraitPos = 'center top',
  crowdBg = CROWD_BG,
  children,
  showSocials = false,
  compact = false,
  cutout = true,
}) {
  const socials = [
    { Icon: TikTokIcon, label: 'TikTok', href: SOCIALS.tiktok },
    { Icon: YouTubeIcon, label: 'YouTube', href: SOCIALS.youtube },
    { Icon: FacebookIcon, label: 'Facebook', href: SOCIALS.facebook },
  ]

  return (
    <section
      className={`relative ${compact ? 'min-h-[78vh]' : 'min-h-screen'} flex flex-col justify-end overflow-hidden`}
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* ── LAYER -1 · FOULE en fond (audience) ── */}
      {crowdBg && (
        <>
          <img
            src={crowdBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
            style={{ opacity: 0.65, filter: 'grayscale(20%) contrast(1.1)' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 35%, rgba(10,10,10,0.8) 100%)' }}
          />
        </>
      )}

      {/* Glow ambiant */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(180,231,1,0.14) 0%, transparent 65%)' }}
      />

      {/* ── NOM GÉANT derrière (style Oprah : casse mixte, bien visible) ──
          Mobile : remonté au niveau tête/épaules pour rester lisible autour du sujet.
          Desktop : niveau torse. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] -translate-y-[32%] sm:-translate-y-[4%]">
        <span
          className="whitespace-nowrap leading-none text-center"
          style={{
            fontFamily: '"Archivo", sans-serif',
            fontWeight: 900,
            color: '#FFFFFF',
            opacity: 0.95,
            fontSize: 'clamp(3.25rem, 12vw, 12rem)',
            letterSpacing: '-0.04em',
            textShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          {bgText}
        </span>
      </div>

      {/* ── LAYER 1 · PORTRAIT détouré, au centre, devant le nom ── */}
      {portrait && (
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-10"
          style={{ height: compact ? '86%' : '96%' }}
        >
          <img
            src={portrait}
            alt="Barkantedjo"
            className="h-full w-auto object-contain object-bottom"
            style={
              cutout
                ? { filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.6))', objectPosition: portraitPos }
                : {
                    objectPosition: portraitPos,
                    WebkitMaskImage: 'radial-gradient(62% 70% at 50% 40%, #000 58%, transparent 100%)',
                    maskImage: 'radial-gradient(62% 70% at 50% 40%, #000 58%, transparent 100%)',
                  }
            }
          />
        </div>
      )}

      {/* Fonte vers le noir en bas (lisibilité texte devant) — renforcée */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0A0A0A 22%, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.55) 68%, transparent 100%)' }}
      />

      {/* Vignette haut (lisibilité navbar) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.92), transparent)' }}
      />


      {/* ── LAYER 2 · Contenu devant, en bas (titre abaissé ~niveau ventre) ── */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 pb-10 sm:pb-14 text-center w-full">
        {punchline && (
          <h2
            className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3"
            style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(0,0,0,0.85)' }}
          >
            {punchline}
          </h2>
        )}
        {sub && (
          <p
            className="font-body text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6"
            style={{ color: '#D8D8D8', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
          >
            {sub}
          </p>
        )}

        {children && <div className="flex flex-wrap gap-4 justify-center">{children}</div>}

        {showSocials && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                style={{ border: '1px solid rgba(255,255,255,0.22)', color: '#FFFFFF', backgroundColor: 'rgba(10,10,10,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B4E701'; e.currentTarget.style.color = '#B4E701' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#FFFFFF' }}
              >
                <Icon size={16} />
                <span className="font-heading font-bold text-xs">{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Divider bas */}
      <div className="absolute bottom-0 inset-x-0 divider-fire z-20" />
    </section>
  )
}
