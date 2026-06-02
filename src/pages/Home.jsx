import { Play, ArrowRight, Ticket, Quote, Star } from 'lucide-react'
import Seo from '../components/Seo'
import { ROUTE_SEO } from '../lib/seo'
import HeroLayered from '../components/HeroLayered'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import Countdown from '../components/Countdown'
import LogoBar from '../components/LogoBar'
import StatCard from '../components/StatCard'
import VideoCard from '../components/VideoCard'
import TourCity from '../components/TourCity'
import {
  HERO,
  IMAGES,
  STATS,
  TOUR_START,
  TESTIMONIALS,
  COLORS,
} from '../lib/constants'
import { useTourDates, useVideos } from '../lib/content'

// ─── SECTION 2 · STATS ──────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: COLORS.black }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionTitle
            eyebrow="Impact réel"
            title={<>Les chiffres<br /><span className="text-gradient">ne mentent pas</span></>}
            subtitle="Plus de 640 000 Barkantéens, réunis sur TikTok, Facebook et YouTube. Une voix verticale qui traverse les frontières."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <StatCard value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 3 · À PROPOS TEASER ────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: COLORS.charcoal }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <Reveal delay={0}>
            <div
              className="relative h-[340px] sm:h-[460px] lg:h-[560px] rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={IMAGES.aboutPortrait}
                alt="Barkantedjo portrait"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(22,22,22,0.5) 0%, transparent 60%)',
                }}
              />
            </div>
          </Reveal>

          {/* Texte */}
          <div>
            <Reveal delay={80}>
              <SectionTitle
                eyebrow="À Propos"
                title={<>Le béni,{' '}<br /><span className="text-gradient">c'est lui.</span></>}
                subtitle="Mohamed Ali — né à Ngaoundéré, élevé par la culture Peule. Barkantedjo ne signifie pas seulement un nom. Ça signifie une mission."
                align="left"
              />
            </Reveal>

            <Reveal delay={160}>
              <p
                className="font-body text-base leading-relaxed mt-6 mb-8"
                style={{ color: COLORS.textMuted }}
              >
                En 2020, il prend son téléphone. En 2024, des millions le regardent.
                Pas des abonnés — des Barkantéens. Une communauté qui rit, partage et se reconnaît.
                Ambassadeur Canal+, Orange, Savana. Sur scène à Douala, Lagos, Yola.
                L'humour Fulfulde n'avait jamais voyagé aussi loin.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <Button variant="primary" size="md" to="/about" icon={ArrowRight}>
                Son histoire
              </Button>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── SECTION 4 · VIDÉOS PREVIEW (verticales 9:16) ───────────────────────────
function VideosSection() {
  const { videos } = useVideos()
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: COLORS.light }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionTitle
            eyebrow="Format Vertical · 9:16"
            title={<>Pensé pour<br /><span style={{ color: COLORS.orange }}>ton écran</span></>}
            subtitle="Sketches Fulfulde, collabs, moments cultes. Tout en vertical — comme TikTok, Shorts et Reels le demandent."
            align="center"
            dark
          />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
          {videos.slice(0, 4).map((video, i) => (
            <Reveal key={video.id} delay={i * 80}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="flex justify-center mt-12">
            <Button variant="primary" size="md" to="/videos" icon={ArrowRight}>
              Tout voir
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SECTION 5 · EXPLORER TOUR TEASER ───────────────────────────────────────
function TourSection() {
  const tourCities = useTourDates()
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Halo dégradé ambiant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,107,0,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <SectionTitle
            eyebrow="Tournée Internationale 2026"
            title={<>Explorer Tour<br /><span className="text-gradient">Nigeria</span></>}
            subtitle="Cinq villes. Un seul béni. Zéro frontière. L'humour sahélien débarque sur la plus grande scène d'Afrique de l'Ouest."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-14 items-center">

          {/* Affiche — taille réduite */}
          <Reveal delay={0}>
            <div
              className="rounded-2xl overflow-hidden max-w-[300px] w-full mx-auto"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(255,107,0,0.12)',
              }}
            >
              <img
                src={IMAGES.explorerTourPoster}
                alt="Explorer Tour Nigeria 2026"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover block"
              />
            </div>
          </Reveal>

          {/* Toutes les villes */}
          <Reveal delay={60}>
            <div className="space-y-3">
              {tourCities.map((city, i) => (
                <TourCity
                  key={city.city}
                  city={city.city}
                  country={city.country}
                  date={city.date}
                  venue={city.venue}
                  ticketUrl={city.ticketUrl}
                  index={i}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Countdown sous la liste des villes ── */}
        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="eyebrow mb-4">Première à Yola — 12 Juillet 2026</p>
              <Countdown target={TOUR_START} dark={false} />
            </div>
            <Button variant="primary" size="lg" to="/explorer-tour" icon={Ticket} iconRight={false}>
              Réserver ma place
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SECTION 6 · TÉMOIGNAGES ─────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: COLORS.charcoal }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionTitle
            eyebrow="Partenaires · Témoignages"
            title={<>Quand les marques<br /><span className="text-gradient">choisissent le béni</span></>}
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                className="group relative overflow-hidden rounded-2xl"
                style={{
                  minHeight: '340px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Image de fond */}
                <img
                  src={t.image}
                  alt={t.org}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay sombre dégradé */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.70) 55%, rgba(10,10,10,0.30) 100%)',
                  }}
                />

                {/* Contenu */}
                <div className="relative z-10 flex flex-col justify-end h-full p-7" style={{ minHeight: '340px' }}>
                  {/* Étoiles */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        size={14}
                        fill={COLORS.orange}
                        style={{ color: COLORS.orange }}
                      />
                    ))}
                  </div>

                  {/* Icône guillemet */}
                  <Quote
                    size={28}
                    style={{ color: COLORS.orange, marginBottom: '10px', opacity: 0.85 }}
                    aria-hidden
                  />

                  {/* Citation */}
                  <blockquote
                    className="font-body italic text-base sm:text-lg leading-relaxed mb-5"
                    style={{ color: COLORS.white }}
                  >
                    "{t.quote}"
                  </blockquote>

                  {/* Auteur */}
                  <div>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: COLORS.white }}
                    >
                      {t.author}
                    </p>
                    <p
                      className="font-body text-xs mt-0.5"
                      style={{ color: COLORS.orange }}
                    >
                      {t.org}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 7 · PARTENAIRES (LogoBar plein) ─────────────────────────────────
// LogoBar gère son propre rendu — section implicite via le composant.

// ─── SECTION 8 · CTA FINAL ───────────────────────────────────────────────────
function ContactCTASection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Halo centré */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Ligne dégradé en haut */}
      <div className="absolute top-0 left-0 right-0 divider-fire" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Reveal delay={0}>
          <p
            className="font-heading font-bold text-xs uppercase tracking-[0.25em] mb-6"
            style={{ color: COLORS.orange }}
          >
            Collaboration · Partenariat · Scène
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-6"
            style={{ color: COLORS.white }}
          >
            TON PROJET.
            <br />
            <span className="text-gradient">SON IMPACT.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p
            className="font-body text-base sm:text-lg leading-relaxed mb-4"
            style={{ color: COLORS.textMuted }}
          >
            Marque, organisateur, média, festival — Barkantedjo est l'ambassadeur
            qui déplace des audiences entières. 292 000 Barkantéens t'attendent.
          </p>
          <p
            className="font-heading font-semibold text-sm mb-10"
            style={{ color: COLORS.white }}
          >
            Brand Deal · Spectacle · Interview · Activation digitale
          </p>
        </Reveal>

        <Reveal delay={240}>
          <Button variant="primary" size="lg" to="/contact" icon={ArrowRight}>
            Travaillons ensemble
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Seo path="/" {...ROUTE_SEO['/']} />
      {/* 1. HERO — HeroLayered style Oprah */}
      <HeroLayered
        bgText={HERO.home.bgText}
        crowdBg={HERO.home.crowdBg}
        punchline={HERO.home.punchline}
        sub={HERO.home.sub}
        portrait={HERO.home.portrait}
        showSocials
      >
        <Button variant="primary" size="lg" to="/videos" icon={Play} iconRight={false}>
          Regarder les vidéos
        </Button>
        <Button variant="outline" size="lg" to="/explorer-tour">
          Explorer Tour 2026
        </Button>
      </HeroLayered>

      {/* 2. LOGO BAR — fond noir (géré en interne par LogoBar) */}
      <LogoBar label="Ils lui font confiance" />

      {/* 3. STATS — fond noir */}
      <StatsSection />

      {/* 4. À PROPOS — fond charbon */}
      <AboutSection />

      {/* 5. VIDÉOS verticales 9:16 — fond clair */}
      <VideosSection />

      {/* 6. EXPLORER TOUR + Countdown — fond noir */}
      <TourSection />

      {/* 7. TÉMOIGNAGES — fond charbon */}
      <TestimonialsSection />

      {/* 8. PARTENAIRES — LogoBar pied de section */}
      <LogoBar label="Partenaires officiels" />

      {/* 9. CTA FINAL — fond noir */}
      <ContactCTASection />
    </main>
  )
}
