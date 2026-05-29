import { Download, ArrowRight, Quote, Star } from 'lucide-react'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import LogoBar from '../components/LogoBar'
import HeroLayered from '../components/HeroLayered'
import { IMAGES, TESTIMONIALS, GRADIENT, GRADIENT_SOFT, COLORS, HERO, BRAND } from '../lib/constants'

// ─── Partner cards data ────────────────────────────────────────────────────
const PARTNERS_DATA = [
  {
    name: 'Savana Islamic Finance',
    role: 'Brand Ambassador Officiel',
    description:
      'Ambassadeur officiel de Savana, institution de microfinance islamique leader au Nord-Cameroun. Campagnes de communication et représentation premium.',
    category: 'Finance',
    photo: IMAGES.savanaAmbassador,
  },
  {
    name: 'Savana — Signature du contrat',
    role: 'Contrat Ambassadeur',
    description:
      'Signature officielle du partenariat Savana Islamic Finance. Un accord historique qui marque l\'engagement de Barkantedjo envers la finance responsable.',
    category: 'Finance',
    photo: IMAGES.savanaSignature,
  },
  {
    name: 'Savana — La Mecque',
    role: 'Campagne internationale',
    description:
      'Représentation de la carte Savana Visa devant la Tour de l\'Horloge royale à La Mecque. Rayonnement international pour un produit 100 % africain.',
    category: 'Finance',
    photo: IMAGES.savanaMekka,
  },
  {
    name: 'Orange Cameroun',
    role: 'Ambassadeur Télécom',
    description:
      'Présence officielle Orange aux Jeux U 2025 à Maroua. Partenariat stratégique avec le leader télécom en Afrique subsaharienne.',
    category: 'Télécom',
    photo: IMAGES.orangeEvent,
  },
  {
    name: 'Global Gateway / UE',
    role: 'Partenaire Institutionnel',
    description:
      'Collaboration avec le programme Global Gateway de l\'Union Européenne. Ambassadeur pour des initiatives de développement et d\'innovation au Sahel.',
    category: 'Institutionnel',
    photo: IMAGES.aboutPortrait,
  },
  {
    name: 'Canal+ / TATITECH',
    role: 'Médias & Tech',
    description:
      'Africa Stand Up Festival Douala — premier partenariat TATITECH. Couverture Facebook officielle et visibilité médias panafricaine.',
    category: 'Médias',
    photo: null,
  },
]

// ─── Audience & impact stats ───────────────────────────────────────────────
const AUDIENCE_STATS = [
  { value: '292K+', label: 'Barkantéens' },
  { value: '2M+', label: 'Reach mensuel' },
  { value: '8.5%', label: "Taux d'engagement" },
  { value: '3', label: 'Langues couvertes' },
  { value: 'CMR · NG · Diaspora', label: 'Présence géographique' },
  { value: '5 villes', label: 'Explorer Tour Nigeria' },
]

// ─── Category badge colours (orange-translucent only) ─────────────────────
const CATEGORY_STYLE = {
  background: 'rgba(255,107,0,0.15)',
  color: '#FF6B00',
  border: '1px solid rgba(255,107,0,0.3)',
}

// ─── Partner card ──────────────────────────────────────────────────────────
function PartnerCard({ partner, delay }) {
  const initials = partner.name
    .split(/[\s/–—]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <Reveal delay={delay}>
      <div
        className="card-surface rounded-2xl overflow-hidden h-full flex flex-col group"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Photo or avatar */}
        {partner.photo ? (
          <div className="h-48 overflow-hidden shrink-0">
            <img
              src={partner.photo}
              alt={partner.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className="h-48 shrink-0 flex items-center justify-center"
            style={{ background: GRADIENT_SOFT }}
          >
            <span
              className="font-display text-5xl text-gradient select-none"
            >
              {initials}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category badge */}
          <span
            className="self-start text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={CATEGORY_STYLE}
          >
            {partner.category}
          </span>

          {/* Name */}
          <h3
            className="font-heading font-extrabold text-base leading-snug mb-1 text-gradient"
          >
            {partner.name}
          </h3>

          {/* Role */}
          <p
            className="text-sm font-heading font-semibold mb-3"
            style={{ color: COLORS.white }}
          >
            {partner.role}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: COLORS.textMuted }}
          >
            {partner.description}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Testimonial overlay card (Knowledge17 style) ──────────────────────────
function TestimonialCard({ testimonial, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end group"
      >
        {/* Background photo */}
        <img
          src={testimonial.image}
          alt={testimonial.org}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.15) 100%)',
          }}
        />

        {/* Quote content */}
        <div className="relative z-10 p-6 sm:p-8">
          <Quote
            size={28}
            className="mb-3 opacity-80"
            style={{ color: COLORS.orange }}
          />
          <p
            className="font-body italic text-base sm:text-lg leading-relaxed mb-4"
            style={{ color: COLORS.white }}
          >
            "{testimonial.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-0.5 rounded-full"
              style={{ background: GRADIENT }}
            />
            <div>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: COLORS.white }}
              >
                {testimonial.author}
              </p>
              <p
                className="font-body text-xs"
                style={{ color: COLORS.textMuted }}
              >
                {testimonial.org}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ stat, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className="card-surface rounded-2xl p-6 text-center flex flex-col items-center gap-2"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span className="font-display text-3xl sm:text-4xl text-gradient leading-none">
          {stat.value}
        </span>
        <span
          className="font-heading text-xs uppercase tracking-widest"
          style={{ color: COLORS.textMuted }}
        >
          {stat.label}
        </span>
      </div>
    </Reveal>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Partners() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>

      {/* ── HERO — style Oprah, "CONFIANCE" géant, portrait Savana ──────── */}
      <HeroLayered
        bgText={HERO.partners.bgText}
        punchline={HERO.partners.punchline}
        sub={HERO.partners.sub}
        portrait={HERO.partners.portrait}
      >
        <Button variant="primary" size="lg" to="/contact" icon={ArrowRight} iconRight={false}>
          Proposer un partenariat
        </Button>
        <Button variant="outline" size="lg" href="/media-kit.pdf" icon={Download}>
          Media kit
        </Button>
      </HeroLayered>

      {/* ── LOGO BAR ─────────────────────────────────────────────────────── */}
      <LogoBar label="ILS LUI FONT CONFIANCE" />

      {/* ── GRILLE PARTENAIRES ───────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="PARTENARIATS OFFICIELS"
              title="Les marques qui ont choisi le béni"
              subtitle={`De la finance islamique aux télécoms, des institutions européennes aux médias panafricains — des partenariats bâtis sur l'authenticité de ${BRAND.name}, « ${BRAND.meaning} ».`}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERS_DATA.map((partner, i) => (
              <PartnerCard key={partner.name} partner={partner} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES (overlay Knowledge17) ───────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.black }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="CE QU'ILS DISENT"
              title="La parole des marques leaders"
              subtitle={`Des campagnes mémorables. Des résultats mesurables. Des partenariats que des millions de ${BRAND.communitySingular}s ne sont pas près d'oublier.`}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE & IMPACT ────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="AUDIENCE & IMPACT"
              title="Des chiffres qui ne mentent pas"
              subtitle={`292 000 ${BRAND.communitySingular}s. Une communauté engagée, multilingue, répartie entre le Cameroun, le Nigeria et la diaspora africaine. Des millions de personnes. Un seul béni.`}
              align="center"
            />
          </Reveal>

          {/* Star accent */}
          <Reveal delay={80}>
            <div className="flex justify-center gap-2 mt-6 mb-12">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#FF6B00"
                  style={{ color: '#FF6B00' }}
                />
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {AUDIENCE_STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDIA KIT CTA ────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.black }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div
              className="rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden"
              style={{
                backgroundColor: COLORS.card,
                border: '1px solid rgba(255,107,0,0.2)',
                boxShadow: '0 0 80px rgba(255,107,0,0.08)',
              }}
            >
              {/* Glow accent */}
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]"
                style={{ background: GRADIENT }}
              />

              <div className="relative z-10">
                {/* Eyebrow */}
                <p className="eyebrow mb-4">REJOIGNEZ LES MARQUES LEADERS</p>

                <h2
                  className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] mb-5"
                  style={{ color: COLORS.white }}
                >
                  Votre marque mérite{' '}
                  <span className="text-gradient">le béni.</span>
                </h2>

                <p
                  className="font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
                  style={{ color: COLORS.textMuted }}
                >
                  Téléchargez le media kit complet et rejoignez les marques qui
                  ont déjà fait confiance à {BRAND.name} pour toucher des millions
                  de {BRAND.communitySingular}s au Cameroun, au Nigeria et dans la diaspora.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Download}
                    iconRight={false}
                    href="/media-kit.pdf"
                  >
                    Télécharger le media kit
                  </Button>
                  <Button variant="outline" size="lg" to="/contact" icon={ArrowRight}>
                    Discutons ensemble
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
