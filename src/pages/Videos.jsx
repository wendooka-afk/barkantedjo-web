import { useState } from 'react'
import { ArrowRight, PlayCircle, Flame } from 'lucide-react'
import Seo from '../components/Seo'
import { ROUTE_SEO } from '../lib/seo'
import HeroLayered from '../components/HeroLayered'
import VideoCard from '../components/VideoCard'
import TikTokEmbed from '../components/TikTokEmbed'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { YouTubeIcon, TikTokIcon } from '../components/BrandIcons'
import {
  HERO,
  SOCIALS,
  VIDEO_CATEGORIES,
  GRADIENT,
  COLORS,
  BRAND,
} from '../lib/constants'
import { useVideos } from '../lib/content'

export default function Videos() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const { videos, featured } = useVideos()

  const filtered =
    activeFilter === 'Tous'
      ? videos
      : activeFilter === 'TikTok' || activeFilter === 'YouTube'
      ? videos.filter((v) => v.platform.toLowerCase() === activeFilter.toLowerCase())
      : videos.filter((v) => v.category === activeFilter)

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <Seo path="/videos" {...ROUTE_SEO['/videos']} />

      {/* ── 1. HERO LAYERED ── */}
      <HeroLayered
        bgText={HERO.videos.bgText}
        punchline={HERO.videos.punchline}
        sub={HERO.videos.sub}
        portrait={HERO.videos.portrait}
        showSocials
      >
        <Button
          variant="primary"
          size="lg"
          href={SOCIALS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          iconRight={false}
        >
          <TikTokIcon size={18} />
          Suivre sur TikTok
        </Button>
        <Button
          variant="outline"
          size="lg"
          href={SOCIALS.youtube}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chaîne YouTube
        </Button>
      </HeroLayered>

      {/* ── 2. À LA UNE — texte gauche / vidéo droite ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.charcoal }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Texte — gauche */}
            <Reveal>
              <div>
                <p className="eyebrow mb-4">À la une</p>
                <h2
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-5"
                  style={{ color: COLORS.white }}
                >
                  La vidéo qui{' '}
                  <span className="text-gradient">enflamme</span>
                </h2>
                <span className="eyebrow text-xs">{featured.category}</span>
                <h3
                  className="font-heading font-extrabold text-lg sm:text-xl mt-2 leading-snug"
                  style={{ color: COLORS.white }}
                >
                  {featured.title}
                </h3>
                <p className="font-body text-base leading-relaxed mt-4 mb-8" style={{ color: COLORS.textMuted }}>
                  Le béni en pleine forme. Ce sketch a fait trembler tout le TikTok camerounais — et au-delà.{' '}
                  <span style={{ color: COLORS.amber }}>Des millions de Barkantéens</span> l'ont regardée. À toi de jouer.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={Flame}
                    iconRight={false}
                  >
                    Voir sur TikTok
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    href={SOCIALS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rejoindre {BRAND.community}
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Vidéo — droite */}
            <Reveal delay={120}>
              <div
                className="card-surface rounded-2xl p-5 sm:p-6 flex justify-center"
                style={{ boxShadow: '0 20px 60px rgba(255,107,0,0.12)' }}
              >
                <TikTokEmbed videoId={featured.id} url={featured.url} />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── 3. FILTRES + GRILLE ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.black }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <Reveal>
            <div className="mb-10">
              <SectionTitle
                eyebrow="CATALOGUE"
                title="Tout le contenu"
                subtitle="Format 9:16, fait pour ton pouce. Explore le meilleur du béni."
                align="center"
              />
            </div>
          </Reveal>

          {/* Pills filtres */}
          <Reveal delay={60}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {VIDEO_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="rounded-full px-5 py-2 text-sm font-heading font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer hover:scale-105"
                    style={
                      isActive
                        ? {
                            background: GRADIENT,
                            color: '#0A0A0A',
                            border: 'none',
                            boxShadow: '0 6px 20px rgba(255,107,0,0.35)',
                          }
                        : {
                            background: 'transparent',
                            color: COLORS.white,
                            border: '1.5px solid rgba(255,255,255,0.2)',
                          }
                    }
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Grille verticale 9:16 */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((video, i) => (
                <Reveal key={video.id} delay={i * 50}>
                  <VideoCard video={video} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div
                className="flex flex-col items-center justify-center py-24 rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.06)', backgroundColor: COLORS.charcoal }}
              >
                <PlayCircle size={48} style={{ color: COLORS.textDim }} className="mb-4" />
                <p className="font-heading font-bold text-lg mb-2" style={{ color: COLORS.textMuted }}>
                  Aucune vidéo dans cette catégorie.
                </p>
                <p className="text-sm mb-6" style={{ color: COLORS.textDim }}>
                  Du contenu arrive. Le béni ne s'arrête jamais.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFilter('Tous')}
                  icon={ArrowRight}
                >
                  Voir tout le contenu
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 4. CTA BAS — REJOINS LES BARKANTÉENS ── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="eyebrow mb-4">Communauté</p>
            <h2
              className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] uppercase mb-6"
              style={{ color: COLORS.white }}
            >
              Rejoins les{' '}
              <span className="text-gradient">Barkantéens</span>
            </h2>
            <p
              className="font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: COLORS.textMuted }}
            >
              292&nbsp;000 Barkantéens et le mouvement ne fait que commencer.
              Chaque sketch, chaque live, chaque collab — tu es le premier à voir.
              C'est ça, être un Barkantéen.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={false}
              >
                <TikTokIcon size={20} />
                Suivre sur TikTok
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={false}
              >
                <YouTubeIcon size={20} />
                Chaîne YouTube
              </Button>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="font-body text-sm mt-8" style={{ color: COLORS.textDim }}>
              Barkantedjo — <em>{BRAND.meaning}</em>. Ange béni venu des cieux.
            </p>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
