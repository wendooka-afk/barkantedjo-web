import { ArrowRight, Quote, Star, ChevronRight } from 'lucide-react'
import Seo from '../components/Seo'
import { SITE_URL, breadcrumb } from '../lib/seo'
import HeroLayered from '../components/HeroLayered'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import { YouTubeIcon, TikTokIcon } from '../components/BrandIcons'
import { IMAGES, COLORS, GRADIENT, SOCIALS, HERO } from '../lib/constants'

// ─── Timeline data ─────────────────────────────────────────────────────────────
const MILESTONES = [
  {
    year: '2020',
    label: 'L\'étincelle',
    text: 'Confinement mondial. Pendant que le monde s\'arrête, Mohamed Ali allume sa caméra. Ses premiers sketches en Fulfulde sur TikTok explosent en quelques semaines. Une communauté naît.',
  },
  {
    year: '2022',
    label: 'Africa Stand Up Festival',
    text: 'Institut Français de Douala. Diffusion Canal+. Une scène nationale. Barkantedjo monte — et la salle ne s\'en remet pas.',
  },
  {
    year: '2022',
    label: 'Les grands noms',
    text: 'Aux côtés de Oumar Manet, Valery Ndongo et Joris Takam. La confirmation que l\'humour Fulfulde tient sa place tout en haut.',
  },
  {
    year: '2023',
    label: 'Série "Daaaaaani"',
    text: '8 épisodes. Des personnages cultes. Un format web-comédie qui redéfinit le genre au Nord Cameroun. Des millions de vues cumulées.',
  },
  {
    year: '2024',
    label: 'Collabs & Écosystème',
    text: 'Kaou Iya, Bappa Tourtounga — les créateurs nordistes s\'unissent. Un écosystème humoristique se structure autour de sa vision.',
  },
  {
    year: '2025',
    label: 'TATITECH Ambassador',
    text: 'Partenariat officiel avec TATITECH. La tech rencontre la comédie. Une ambassadorship qui prouve la puissance de son influence.',
  },
  {
    year: '2026',
    label: 'The Explorer Tour — Nigeria',
    text: 'Yola. Gombe. Kano. Kaduna. Abuja. Cinq villes. Une tournée historique. L\'humour Fulfulde traverse les frontières.',
  },
]

// ─── Style & Positionnement cards ──────────────────────────────────────────────
const STYLE_CARDS = [
  {
    icon: '🎙️',
    title: 'Humour Fulfulde Unique',
    desc: 'Le seul à porter l\'humour peul sur la scène numérique africaine. Satire sociale, personnages du quotidien nordiste, authenticité brute — un territoire que personne d\'autre n\'occupe.',
  },
  {
    icon: '📲',
    title: 'Web Comédie Format Court',
    desc: 'Natif des algorithmes : TikTok, Reels, Shorts. Maîtrise du 60 secondes qui capte, retient et fait partager. Chaque vidéo est conçue pour devenir virale.',
  },
  {
    icon: '🎯',
    title: 'Triple Casquette',
    desc: 'Digital Marketer + Content Creator + Comedian. Une combinaison rare sur le continent — qui attire autant les marques que le grand public.',
  },
  {
    icon: '⭐',
    title: 'Influences & Héritage',
    desc: 'Formé à l\'école de Moustik Karismatik, Valery Ndongo et Tik Dengue. Ancré dans la grande tradition africaine du stand-up, projeté dans les formats de demain.',
  },
]

export default function About() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <Seo
        title="À propos de Barkantedjo — Mohamed Ali, « le béni » de Ngaoundéré"
        description="L'histoire de Barkantedjo (Mohamed Ali) : de Ngaoundéré aux scènes du Nigeria. Pionnier de l'humour Fulfulde, Digital Marketer, Content Creator et Comedian. Parcours, vision et impact."
        path="/about"
        type="profile"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: 'À propos de Barkantedjo',
            mainEntity: { '@id': `${SITE_URL}/#person` },
          },
          breadcrumb([
            { name: 'Accueil', path: '/' },
            { name: 'À Propos', path: '/about' },
          ]),
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Style Oprah : "LE BÉNI" géant derrière, portrait centré
      ═══════════════════════════════════════════════════════════ */}
      <HeroLayered
        bgText={HERO.about.bgText}
        punchline={HERO.about.punchline}
        sub={HERO.about.sub}
        portrait={HERO.about.portrait}
      />

      {/* ═══════════════════════════════════════════════════════════
          ORIGINES — Fond charcoal, image droite
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte gauche */}
            <div>
              <Reveal delay={0}>
                <SectionTitle
                  eyebrow="Origines"
                  title="Ange béni venu des cieux"
                  align="left"
                />
              </Reveal>

              <Reveal delay={120}>
                <p
                  className="mt-7 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  <strong style={{ color: COLORS.white }}>Barkantedjo</strong> — ce n'est pas un pseudonyme.
                  C'est une identité. En Fulfulde, la langue de la culture peule du Sahel, ce mot signifie{' '}
                  <span
                    className="font-bold"
                    style={{ color: COLORS.orange }}
                  >
                    « le béni » — un ange béni venu des cieux
                  </span>
                  . Une promesse portée dès le nom.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p
                  className="mt-5 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  Son vrai nom :{' '}
                  <strong style={{ color: COLORS.white }}>Mohamed Ali</strong>. Né à{' '}
                  <strong style={{ color: COLORS.white }}>Ngaoundéré</strong>, capitale de l'Adamaoua,
                  là où le plateau camerounais rencontre le ciel saharien. Bercé dès l'enfance par le
                  Fulfulde et la culture peule — ses récits, ses rythmes, ses personnages du quotidien.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <p
                  className="mt-5 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  Cette richesse culturelle — longtemps invisible sur les écrans — il va en faire son arme.
                  Son identité. Son avantage absolu.
                </p>
              </Reveal>
            </div>

            {/* Image droite */}
            <Reveal delay={100}>
              <div className="relative">
                <div
                  className="rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
                  style={{
                    boxShadow: '0 30px 80px rgba(255,107,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={IMAGES.aboutPortrait}
                    alt="Barkantedjo — portrait"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{
                      background: 'linear-gradient(to top, rgba(22,22,22,0.8) 0%, transparent 100%)',
                    }}
                  />
                </div>
                {/* Badge décoratif */}
                <div
                  className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl"
                  style={{
                    background: GRADIENT,
                    boxShadow: '0 10px 30px rgba(255,107,0,0.3)',
                  }}
                >
                  <p className="font-display text-black text-2xl leading-none">NGÉ</p>
                  <p className="text-black text-xs font-bold tracking-widest uppercase">Ngaoundéré</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LE DÉBUT — Fond noir, image gauche
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.black }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image gauche — ordre inversé sur mobile */}
            <Reveal delay={100} className="order-2 lg:order-1">
              <div className="relative">
                <div
                  className="rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-md mx-auto"
                  style={{
                    boxShadow: '0 30px 80px rgba(255,107,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <img
                    src={IMAGES.aboutPortrait2}
                    alt="Barkantedjo — début"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge année */}
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: GRADIENT,
                    boxShadow: '0 10px 30px rgba(255,107,0,0.4)',
                  }}
                >
                  <span className="font-display text-black text-xl leading-none">2020</span>
                </div>
              </div>
            </Reveal>

            {/* Texte droite */}
            <div className="order-1 lg:order-2">
              <Reveal delay={0}>
                <SectionTitle
                  eyebrow="Le Début"
                  title="Un téléphone. Un confinement. Une vocation."
                  align="left"
                />
              </Reveal>

              <Reveal delay={120}>
                <p
                  className="mt-7 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  Nous sommes en{' '}
                  <strong style={{ color: COLORS.white }}>2020</strong>. Le monde entier est à l'arrêt.
                  Mohamed Ali, lui, appuie sur Enregistrer. Ses premiers sketches en Fulfulde
                  surgissent sur TikTok comme une bouffée d'air frais dans un monde confiné.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p
                  className="mt-5 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  Les chiffres décollent. Mais au-delà des vues, quelque chose de plus profond se passe.
                  Pour des milliers de Peuls et d'Africains du Nord Cameroun, c'est{' '}
                  <span style={{ color: COLORS.orange }} className="font-semibold">
                    la première fois qu'ils se voient vraiment représentés
                  </span>{' '}
                  dans le contenu digital.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <p
                  className="mt-5 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  L'ennui du confinement se transforme en mission. Le content creator est né.
                  Il ne s'arrêtera plus.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          L'ASCENSION — Fond clair (Knowledge17 style)
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.light }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delay={0}>
            <SectionTitle
              eyebrow="L'Ascension"
              title="Quand le Nord monte sur scène"
              subtitle="Africa Stand Up. Canal+. Les grands noms. La série. En quelques années, Barkantedjo passe du téléphone à la scène nationale."
              align="center"
              dark
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎤',
                year: '2022',
                title: 'Africa Stand Up Festival',
                body: 'Institut Français de Douala. Diffusion Canal+. Une scène, des projecteurs, et une salle conquise. Le passage obligé du vrai comedian.',
              },
              {
                icon: '🤝',
                year: '2022',
                title: 'Les Grands Noms',
                body: 'Oumar Manet. Valery Ndongo. Joris Takam. Les légendes de la scène africaine à ses côtés — la consécration d\'un talent reconnu par ses pairs.',
              },
              {
                icon: '🎬',
                year: '2023',
                title: 'Série "Daaaaaani"',
                body: '8 épisodes et plus. Des personnages cultes. Un format web-comédie qui redéfinit le genre. Des millions de vues cumulées sur les réseaux.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{
                    backgroundColor: COLORS.white,
                    boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase font-heading"
                    style={{ color: COLORS.orange }}
                  >
                    {card.year}
                  </span>
                  <h3
                    className="font-heading font-bold text-lg mt-2 mb-3"
                    style={{ color: COLORS.black }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-body" style={{ color: '#4A4A4A' }}>
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          AUJOURD'HUI — Fond charcoal, stats + texte
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte */}
            <div>
              <Reveal delay={0}>
                <SectionTitle
                  eyebrow="Aujourd'hui"
                  title="Trois casquettes. Zéro compromis."
                  align="left"
                />
              </Reveal>

              <Reveal delay={120}>
                <p
                  className="mt-7 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  <strong style={{ color: COLORS.white }}>Digital Marketer</strong> qui comprend les
                  algorithmes.{' '}
                  <strong style={{ color: COLORS.white }}>Content Creator</strong> qui maîtrise les
                  formats.{' '}
                  <strong style={{ color: COLORS.white }}>Comedian</strong> qui touche les cœurs.
                  Rarement une seule personne réunit les trois avec autant de cohérence.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p
                  className="mt-5 text-base sm:text-lg leading-relaxed font-body"
                  style={{ color: COLORS.textMuted }}
                >
                  Ambassadeur{' '}
                  <span style={{ color: COLORS.orange }} className="font-semibold">Savana Islamic Finance</span>,{' '}
                  <span style={{ color: COLORS.orange }} className="font-semibold">Orange Cameroun</span>{' '}
                  et{' '}
                  <span style={{ color: COLORS.orange }} className="font-semibold">Global Gateway</span>{' '}
                  — des marques qui lui font confiance parce qu'il atteint une audience que personne
                  d'autre ne peut toucher.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex items-center gap-3">
                  <Star size={18} style={{ color: COLORS.orange }} />
                  <p
                    className="font-heading font-bold text-sm tracking-wide"
                    style={{ color: COLORS.white }}
                  >
                    642K+ Barkantéens · 332K TikTok · 292K Facebook · 17.7K YouTube
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '642K+', label: 'Barkantéens', sub: 'toutes plateformes' },
                { value: '332K', label: 'TikTok', sub: '@barkantedjo0' },
                { value: '292K', label: 'Facebook', sub: 'abonnés' },
                { value: '17.7K', label: 'YouTube', sub: '@barkantedjo7294' },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      backgroundColor: COLORS.card,
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 10px 40px rgba(255,107,0,0.06)',
                    }}
                  >
                    <span
                      className="font-display text-4xl sm:text-5xl"
                      style={{
                        background: GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-heading font-bold text-sm mt-2"
                      style={{ color: COLORS.white }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="font-body text-xs mt-1"
                      style={{ color: COLORS.textDim }}
                    >
                      {stat.sub}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          VISION — Fond noir, citation géante
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: COLORS.black }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal delay={0}>
            <p className="eyebrow mb-8">La Vision</p>
          </Reveal>

          <Reveal delay={100}>
            <Quote
              size={48}
              className="mx-auto mb-6"
              style={{ color: COLORS.orange, opacity: 0.4 }}
            />
          </Reveal>

          <Reveal delay={180}>
            <blockquote
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ color: COLORS.white }}
            >
              L'humour Fulfulde doit rayonner{' '}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                sur tout le continent.
              </span>
            </blockquote>
          </Reveal>

          <Reveal delay={260}>
            <p
              className="mt-8 text-lg leading-relaxed font-body max-w-2xl mx-auto"
              style={{ color: COLORS.textMuted }}
            >
              Explorer. Connecter. Impacter. Barkantedjo ne fait pas que raconter des blagues —
              il construit un pont entre la culture peule du Sahel et les générations connectées
              d'Afrique centrale, de l'Ouest et au-delà.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TIMELINE — Fond charcoal, ligne dégradée verticale
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delay={0}>
            <SectionTitle
              eyebrow="Parcours"
              title="Les faits marquants"
              subtitle="De TikTok à la scène nigériane — une trajectoire sans compromis."
              align="center"
            />
          </Reveal>

          <div className="mt-16 relative max-w-3xl mx-auto">
            {/* Ligne centrale dégradée — visible seulement md+ */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
              style={{ background: GRADIENT }}
            />
            {/* Ligne gauche mobile */}
            <div
              className="block md:hidden absolute left-4 top-0 bottom-0 w-0.5"
              style={{ background: GRADIENT }}
            />

            <div className="space-y-8 md:space-y-12">
              {MILESTONES.map((m, i) => {
                const isRight = i % 2 === 0
                return (
                  <Reveal key={i} delay={i * 80}>
                    {/* Mobile layout */}
                    <div className="flex md:hidden gap-6 items-start pl-10">
                      <div
                        className="absolute left-4 -translate-x-1/2 w-2 h-2 rounded-full mt-2"
                        style={{ background: GRADIENT }}
                      />
                      <div
                        className="rounded-2xl p-5 flex-1"
                        style={{
                          backgroundColor: COLORS.card,
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <span
                          className="font-display text-xl"
                          style={{
                            background: GRADIENT,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {m.year}
                        </span>
                        <h3
                          className="font-heading font-bold text-sm mt-1 mb-2"
                          style={{ color: COLORS.white }}
                        >
                          {m.label}
                        </h3>
                        <p
                          className="text-xs leading-relaxed font-body"
                          style={{ color: COLORS.textMuted }}
                        >
                          {m.text}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout alternée gauche/droite */}
                    <div
                      className={`hidden md:flex items-start gap-8 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div
                        className="flex-1 rounded-2xl p-6"
                        style={{
                          backgroundColor: COLORS.card,
                          border: '1px solid rgba(255,255,255,0.06)',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                          textAlign: isRight ? 'right' : 'left',
                        }}
                      >
                        <span
                          className="font-display text-2xl"
                          style={{
                            background: GRADIENT,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {m.year}
                        </span>
                        <h3
                          className="font-heading font-bold text-base mt-1 mb-2"
                          style={{ color: COLORS.white }}
                        >
                          {m.label}
                        </h3>
                        <p
                          className="text-sm leading-relaxed font-body"
                          style={{ color: COLORS.textMuted }}
                        >
                          {m.text}
                        </p>
                      </div>

                      <div className="relative flex-none flex flex-col items-center" style={{ width: 24 }}>
                        <div
                          className="w-4 h-4 rounded-full mt-4"
                          style={{
                            background: GRADIENT,
                            boxShadow: '0 0 12px rgba(255,107,0,0.5)',
                          }}
                        />
                      </div>

                      <div className="flex-1" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STYLE & POSITIONNEMENT — Fond clair
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.light }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Reveal delay={0}>
            <SectionTitle
              eyebrow="Style & Positionnement"
              title="Ce qui le rend inimitable"
              subtitle="Quatre atouts qui font de Barkantedjo une force unique sur le continent."
              align="center"
              dark
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STYLE_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div
                  className="rounded-2xl p-7 h-full group transition-all duration-300"
                  style={{
                    backgroundColor: COLORS.white,
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="text-4xl mb-5">{card.icon}</div>
                  <h3
                    className="font-heading font-bold text-lg mb-3"
                    style={{ color: COLORS.black }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                    {card.desc}
                  </p>
                  <div
                    className="mt-5 flex items-center gap-2 text-xs font-bold font-heading uppercase tracking-widest"
                    style={{ color: COLORS.orange }}
                  >
                    <span>Explorer</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          REJOINS LES BARKANTÉENS — Fond noir, liens sociaux réels
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: COLORS.black }}
      >
        {/* Glow bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,107,0,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal delay={0}>
            <p className="eyebrow mb-6">Communauté</p>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ color: COLORS.white }}
            >
              REJOINS LES{' '}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BARKANTÉENS
              </span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p
              className="font-body text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: COLORS.textMuted }}
            >
              292 000 Barkantéens et le chiffre continue de croître. Rejoins la communauté — abonne-toi,
              regarde, partage. Parce que le béni n'a pas fini de faire rire le continent.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-heading font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:opacity-90 w-full sm:w-auto justify-center"
                style={{
                  background: GRADIENT,
                  color: COLORS.black,
                  boxShadow: '0 10px 30px rgba(255,107,0,0.25)',
                }}
              >
                <TikTokIcon size={20} color={COLORS.black} />
                TikTok
              </a>

              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-heading font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto justify-center"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: COLORS.white,
                }}
              >
                <YouTubeIcon size={20} color={COLORS.white} />
                YouTube
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL — Fond charcoal, collaboration
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,107,0,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal delay={0}>
            <p className="eyebrow mb-6">Prêt à collaborer ?</p>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ color: COLORS.white }}
            >
              TRAVAILLONS{' '}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ENSEMBLE
              </span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p
              className="font-body text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: COLORS.textMuted }}
            >
              Ambassadorship, campagne digitale, content co-création, événement scène —
              si votre marque veut toucher le cœur de l'Afrique sahélienne, la conversation commence ici.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" to="/contact" icon={ArrowRight}>
                Travaillons ensemble
              </Button>
              <Button variant="outline" size="lg" to="/partenariats">
                Voir les partenariats
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
