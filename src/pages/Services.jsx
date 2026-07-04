import {
  ArrowRight,
  Megaphone,
  BadgeCheck,
  Mic,
  Video,
  Clapperboard,
  Rocket,
  Lightbulb,
} from 'lucide-react'
import Seo from '../components/Seo'
import { ROUTE_SEO } from '../lib/seo'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import LogoBar from '../components/LogoBar'
import HeroLayered from '../components/HeroLayered'
import { SERVICES, GRADIENT, COLORS, HERO, BRAND } from '../lib/constants'

// Résolution nom d'icône (string en constants) → composant lucide
const ICONS = { Megaphone, BadgeCheck, Mic, Video, Clapperboard, Rocket, Lightbulb }

// ─── Service card ──────────────────────────────────────────────────────────
function ServiceCard({ service, delay }) {
  const Icon = ICONS[service.icon] || Megaphone
  return (
    <Reveal delay={delay}>
      <div
        className="card-surface rounded-2xl p-7 h-full flex flex-col group transition-transform duration-300 hover:-translate-y-1"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Icône */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: 'rgba(180,231,1,0.12)',
            border: '1px solid rgba(180,231,1,0.25)',
          }}
        >
          <Icon size={26} style={{ color: COLORS.orange }} />
        </div>

        {/* Titre */}
        <h3 className="font-heading font-extrabold text-lg leading-snug mb-3 text-gradient">
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{ color: COLORS.textMuted }}
        >
          {service.description}
        </p>
      </div>
    </Reveal>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <Seo path="/services" {...ROUTE_SEO['/services']} />

      {/* ── HERO — style Oprah, "SERVICES" géant ─────────────────────────── */}
      <HeroLayered
        bgText={HERO.services.bgText}
        punchline={HERO.services.punchline}
        sub={HERO.services.sub}
        portrait={HERO.services.portrait}
      >
        <Button variant="primary" size="lg" to="/contact" icon={ArrowRight} iconRight={false}>
          Demander un devis
        </Button>
      </HeroLayered>

      {/* ── LOGO BAR ─────────────────────────────────────────────────────── */}
      <LogoBar label="ILS M'ONT FAIT CONFIANCE" />

      {/* ── GRILLE SERVICES ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.charcoal }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="CE QUE JE PROPOSE"
              title={<>Des services taillés pour{' '}<span className="text-gradient">l'impact</span></>}
              subtitle={`De l'influence marketing à la consultance, ${BRAND.name} met sa créativité et sa communauté au service des marques qui veulent toucher l'Afrique francophone et le Sahel.`}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.black }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div
              className="rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden"
              style={{
                backgroundColor: COLORS.card,
                border: '1px solid rgba(180,231,1,0.2)',
                boxShadow: '0 0 80px rgba(180,231,1,0.08)',
              }}
            >
              {/* Glow accent */}
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]"
                style={{ background: GRADIENT }}
              />

              <div className="relative z-10">
                <p className="eyebrow mb-4">UN PROJET EN TÊTE&nbsp;?</p>

                <h2
                  className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] mb-5"
                  style={{ color: COLORS.white }}
                >
                  Travaillons{' '}
                  <span className="text-gradient">ensemble.</span>
                </h2>

                <p
                  className="font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
                  style={{ color: COLORS.textMuted }}
                >
                  Campagne, événement, publicité ou consultance — parle-moi de ton ambition.
                  Réponse garantie sous 48h.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="primary" size="lg" to="/contact" icon={ArrowRight}>
                    Me contacter
                  </Button>
                  <Button variant="outline" size="lg" to="/partenariats">
                    Voir les partenariats
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
