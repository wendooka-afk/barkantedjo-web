import { Ticket, MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import { tourEvents, breadcrumb, faqSchema } from '../lib/seo'
import HeroLayered from '../components/HeroLayered'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import Countdown from '../components/Countdown'
import TourCity from '../components/TourCity'
import { TOUR_CITIES, TOUR_START, IMAGES, HERO, COLORS, GRADIENT } from '../lib/constants'

// ─── Info mini-cards data ────────────────────────────────────────────
const INFO_CARDS = [
  { icon: MapPin,    label: '5 Villes',           sub: 'Nigeria — de Yola à Abuja' },
  { icon: Calendar, label: 'Juil. – Sept. 2026',  sub: 'Saison historique' },
  { icon: Users,    label: 'Les Barkantéens',      sub: 'Des milliers attendus' },
  { icon: Ticket,   label: 'Billetterie ouverte',  sub: 'Places limitées' },
]

export default function ExplorerTour() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <Seo
        title="The Explorer Tour 2026 — Barkantedjo en tournée au Nigeria (5 villes)"
        description="The Explorer Tour : la première tournée internationale de Barkantedjo traverse 5 villes du Nigeria — Yola, Gombe, Kano, Kaduna, Abuja — de juillet à septembre 2026. Dates, lieux et billetterie."
        path="/explorer-tour"
        jsonLd={[
          ...tourEvents(),
          breadcrumb([
            { name: 'Accueil', path: '/' },
            { name: 'Explorer Tour', path: '/explorer-tour' },
          ]),
          faqSchema([
            {
              q: 'Quelles villes la tournée Explorer Tour de Barkantedjo visite-t-elle ?',
              a: 'The Explorer Tour 2026 passe par cinq villes du Nigeria : Yola (12 juillet), Gombe (19 juillet), Kano (2 août), Kaduna (16 août) et Abuja (6 septembre 2026).',
            },
            {
              q: 'Quand commence The Explorer Tour ?',
              a: 'La tournée démarre le 12 juillet 2026 à Yola (Yola City Hall), au Nigeria.',
            },
          ]),
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          HERO — style Oprah · "NIGERIA" géant derrière le portrait
      ══════════════════════════════════════════════════════════════ */}
      <HeroLayered
        bgText={HERO.tour.bgText}
        punchline={HERO.tour.punchline}
        sub={HERO.tour.sub}
        portrait={HERO.tour.portrait}
      >
        <Button variant="primary" size="lg" href="#dates" icon={Ticket} iconRight={false}>
          Réserver mes places
        </Button>
      </HeroLayered>

      {/* ═══════════════════════════════════════════════════════════
          POSTER (réduit) + INFOS — grille 2 colonnes
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.black }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Affiche officielle — taille réduite */}
            <Reveal>
              <div
                className="rounded-2xl overflow-hidden max-w-[320px] w-full mx-auto"
                style={{
                  border: '1px solid rgba(255,107,0,0.30)',
                  boxShadow: '0 30px 80px rgba(255,107,0,0.18), 0 0 0 1px rgba(255,107,0,0.08)',
                }}
              >
                <img
                  src={IMAGES.explorerTourPoster}
                  alt="The Explorer Tour — Nigeria 2026"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </Reveal>

            {/* Texte + mini-cards */}
            <div className="flex flex-col gap-8">
              <Reveal delay={100}>
                <div>
                  <p className="eyebrow mb-4">Événement historique</p>
                  <h2
                    className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-5"
                    style={{ color: COLORS.white }}
                  >
                    « Le béni » débarque{' '}
                    <span className="text-gradient">au Nigeria</span>
                  </h2>
                  <p
                    className="font-body text-base sm:text-lg leading-relaxed"
                    style={{ color: COLORS.textMuted }}
                  >
                    The Explorer Tour, c'est une première. Barkantedjo traverse cinq villes
                    nigérianes pour porter l'humour sahélien au-delà de toutes les frontières.
                    Du Fulfulde aux rires universels — les Barkantéens du Nigeria ont rendez-vous
                    avec leur propre histoire.
                  </p>
                </div>
              </Reveal>

              {/* 4 mini-cards infos */}
              <Reveal delay={200}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {INFO_CARDS.map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,107,0,0.07) 0%, rgba(224,36,36,0.05) 100%)',
                        border: '1px solid rgba(255,107,0,0.18)',
                      }}
                    >
                      <div
                        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255,107,0,0.15)' }}
                      >
                        <Icon size={18} style={{ color: '#FF6B00' }} />
                      </div>
                      <div>
                        <p
                          className="font-heading font-bold text-sm leading-tight"
                          style={{ color: COLORS.white }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-body text-xs mt-0.5"
                          style={{ color: COLORS.textDim }}
                        >
                          {sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA inline */}
              <Reveal delay={300}>
                <Button variant="primary" size="md" href="#dates" icon={ArrowRight}>
                  Voir toutes les dates
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-fire mx-auto max-w-7xl px-6" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION DATES & VILLES
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="dates"
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-3xl mx-auto px-6">

          <Reveal>
            <div className="mb-14 text-center">
              <SectionTitle
                eyebrow="Programme complet"
                title={<>5 villes.{' '}<span className="text-gradient">Sans frontières.</span></>}
                subtitle="Les Barkantéens du Nigeria — choisissez votre ville, réservez votre place. Le béni arrive près de chez vous."
                align="center"
              />
            </div>
          </Reveal>

          {/* Tour cities list */}
          <div className="flex flex-col gap-4">
            {TOUR_CITIES.map((cityData, i) => (
              <Reveal key={cityData.city} delay={i * 80}>
                <TourCity
                  city={cityData.city}
                  country={cityData.country}
                  date={cityData.date}
                  venue={cityData.venue}
                  index={i}
                />
              </Reveal>
            ))}
          </div>

          {/* Note sous la liste */}
          <Reveal delay={450}>
            <p
              className="text-center font-body text-sm mt-8"
              style={{ color: COLORS.textDim }}
            >
              Nouvelles dates à venir&nbsp;·&nbsp;Abonne-toi pour être le premier Barkantéen informé
            </p>
          </Reveal>

          {/* ── COUNTDOWN — juste sous la liste des villes ── */}
          <Reveal delay={120}>
            <div className="mt-14">
              <p className="eyebrow text-center mb-5">Première à Yola — 12 Juillet 2026</p>
              <div
                className="w-full flex flex-col items-center gap-8 px-6 py-10 sm:py-12 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(224,36,36,0.08) 100%)',
                  border: '1px solid rgba(255,107,0,0.20)',
                  boxShadow: '0 0 60px rgba(255,107,0,0.08), inset 0 1px 0 rgba(255,107,0,0.12)',
                }}
              >
                <Countdown target={TOUR_START} />
                <Button variant="primary" size="lg" href="#dates" icon={Ticket} iconRight={false}>
                  Billets early bird
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL — bande dégradée forte
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ backgroundColor: COLORS.black }}
      >
        {/* Ambient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,107,0,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Top fire line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: GRADIENT }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

          <Reveal>
            <p className="eyebrow mb-5">L'événement de l'année</p>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-6"
              style={{ color: COLORS.white }}
            >
              Un seul béni.{' '}
              <span className="text-gradient">Cinq scènes.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="font-body text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: COLORS.textMuted }}
            >
              Des milliers de Barkantéens réunis pour vivre ce moment unique.
              Places limitées. Quand elles sont parties, elles sont parties.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="#dates" icon={Ticket} iconRight={false}>
                Réserver mes places
              </Button>
              <Button variant="outline" size="lg" href="#dates" icon={MapPin} iconRight={false}>
                Voir les dates
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Bottom fire line */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: GRADIENT }} />
      </section>

    </main>
  )
}
