# BARKANTEDJO — Design System v3 "Spotlight"

Refonte totale. Inspiration: **Oprah Winfrey landing** (hero cinématique sombre, nom géant, barre "featured in") + **Knowledge17** (cartes nettes, countdown, témoignages en overlay, alternance sombre/clair).

## Palette (STRICTE — n'utilise QUE ça)

| Token | Hex | Usage |
|-------|-----|-------|
| black | `#0A0A0A` | fond principal |
| charcoal | `#161616` | fond section alterné |
| card | `#1C1C1C` | cartes |
| card-hover | `#242424` | carte au hover |
| orange | `#FF6B00` | accent primaire |
| red | `#E02424` | accent secondaire (fin de dégradé) |
| amber | `#FFA033` | highlight chaud |
| white | `#FFFFFF` | texte principal |
| muted | `#B8B8B8` | texte secondaire |
| dim | `#6B6B6B` | texte tertiaire/labels |
| cream/light | `#F5F5F2` | fond sections CLAIRES (texte devient #0A0A0A) |

**Dégradé signature:** `linear-gradient(135deg, #FF6B00 0%, #E02424 100%)`
Importable: `import { GRADIENT, GRADIENT_SOFT, COLORS } from '../lib/constants'`

INTERDIT: navy, or/gold (#C9A84C), vert (#1A6B3C). Ancienne palette supprimée.

## Typo

- **Display (titres impact / nom géant):** `Anton`, MAJUSCULES. Classe utilitaire `.font-display` (déjà uppercase + letter-spacing). Énorme dans le hero (text-6xl → text-9xl).
- **Heading (sous-titres, labels):** `Archivo` (700-900). `font-family: '"Archivo", sans-serif'`.
- **Body:** `Inter`. Défaut du body.
- **Eyebrow** (petit label au-dessus des titres): classe `.eyebrow` (orange, uppercase, tracking large).

## Classes utilitaires dispo (dans index.css)

- `.text-gradient` — texte en dégradé orange→rouge
- `.bg-gradient-fire` — fond dégradé
- `.card-surface` — carte #1C1C1C + bordure + hover orange
- `.eyebrow` — label orange uppercase
- `.divider-fire` — séparateur dégradé horizontal
- `.reveal` / `.reveal.is-visible` — anim scroll (ajouter/retirer `is-visible`)
- `.pulse-fire` — halo pulsé orange (CTA/live)
- `.animate-marquee` — défilement horizontal (barre logos)

## Pattern d'animation au scroll

Hook existant: `import { useScrollAnimation } from '../hooks/useScrollAnimation'`
Retourne `{ ref, isVisible }`. Applique:
```jsx
const { ref, isVisible } = useScrollAnimation()
<div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>…</div>
```
Ou wrappe avec le composant `Reveal` (voir components/Reveal.jsx).

## Composants partagés (déjà construits — RÉUTILISE, ne recrée pas)

- `components/Navbar.jsx`, `components/Footer.jsx`
- `components/Button.jsx` — `<Button variant="primary|outline|ghost" to="/x" href="#" onClick icon={Icon}>`
  - primary = fond dégradé fire, texte noir
  - outline = bordure blanche translucide
- `components/SectionTitle.jsx` — `<SectionTitle eyebrow="…" title="…" subtitle="…" align="center|left" dark />` (`dark` = pour fond clair)
- `components/Reveal.jsx` — wrapper anim scroll `<Reveal delay={100}>…</Reveal>`
- `components/Countdown.jsx` — `<Countdown target={TOUR_START} />` style Knowledge17 (DAYS/HRS/MINS/SEC)
- `components/StatCard.jsx`, `components/VideoCard.jsx`, `components/TourCity.jsx`
- `components/LogoBar.jsx` — barre "Ils lui font confiance" marquee

## Layout / rythme

- Conteneur: `max-w-7xl mx-auto px-6` (sections larges), `max-w-4xl` (texte).
- Padding vertical section: `py-20 md:py-28`.
- Alterne fonds: black → charcoal → **section claire `#F5F5F2`** (comme Knowledge17) → black.
- Coins: `rounded-2xl` cartes, `rounded-full` pills/CTA arrondis OU `rounded-lg` CTA carrés (style Oprah "LEARN MORE" = rectangle dégradé). Choix: CTA = `rounded-lg`, pills filtres = `rounded-full`.
- Bordures: `1px solid rgba(255,255,255,0.08)`.
- Ombres chaudes: `box-shadow: 0 20px 60px rgba(255,107,0,0.12)` sur éléments clés.

## Hero (style Oprah)

- Plein écran sombre, portrait grand format (droite ou plein fond avec gradient overlay bas).
- Nom **BARKANTEDJO** en `.font-display` géant (text-7xl → text-9xl), blanc, une partie en `.text-gradient`.
- Eyebrow tags: `DIGITAL MARKETER · CONTENT CREATOR · COMEDIAN`.
- Citation/punchline sous le nom.
- 2 CTA: primary dégradé + outline.
- Sous le hero: barre logos partenaires (LogoBar) façon "AS FEATURED IN".
- Photo hero: `IMAGES.heroPortrait`.

## Sections cartes (style Knowledge17)

- Grilles de cartes nettes, image en haut + contenu dessous.
- Témoignages: image de fond + overlay sombre + citation blanche en italique par-dessus (voir TESTIMONIALS dans constants).
- Countdown sur la page Explorer Tour + section tour de la home.

## Responsive (90% mobile)

- Mobile-first. Grilles: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- Hero nom: `text-5xl sm:text-7xl lg:text-8xl`.
- Tester 375px, 768px, 1280px. Pas de débordement horizontal.
- Barres (logos, villes) en scroll horizontal sur mobile si besoin.

## v4 — Héros "Oprah" + Social + Vertical (OBLIGATOIRE)

### HeroLayered (tous les héros de page)
Chaque page démarre par `<HeroLayered>` — style Oprah : NOM GÉANT derrière + PORTRAIT centré devant + texte/CTA devant.
```jsx
import HeroLayered from '../components/HeroLayered'
import { HERO } from '../lib/constants'
<HeroLayered
  bgText={HERO.home.bgText}
  gradientPart="TEDJO"        // sous-chaîne mise en dégradé (optionnel)
  eyebrow={HERO.home.eyebrow}
  punchline={HERO.home.punchline}
  sub={HERO.home.sub}
  portrait={HERO.home.portrait}
  showSocials                  // affiche pastilles TikTok/YouTube (Home, Videos)
>
  <Button variant="primary" size="lg" to="/videos" icon={Play} iconRight={false}>Regarder</Button>
  <Button variant="outline" size="lg" to="/explorer-tour">Explorer Tour 2026</Button>
</HeroLayered>
```
Clés `HERO` dispo: `home, about, videos, tour, partners, contact` (bgText, eyebrow, punchline, sub, portrait). Utilise-les.

### Identité (constants `BRAND`)
- Barkantedjo (singulier) = « le béni ». Communauté = **« Les Barkantéens »** (membre = un Barkantéen).
- Intègre « le béni » et « Barkantéens » dans le copy. Évite « abonnés » → préfère « Barkantéens ».

### Réseaux (constants `SOCIALS`, liens RÉELS)
- `SOCIALS.tiktok`, `SOCIALS.youtube`, `SOCIALS.facebook`. Icônes: `import { YouTubeIcon, TikTokIcon, FacebookIcon } from '../components/BrandIcons'`.
- Toujours `target="_blank" rel="noopener noreferrer"`.

### Contenu VERTICAL (9:16)
- `VideoCard` est désormais vertical 9:16, lien sortant réel, badge plateforme. Grilles vidéos: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` (cartes hautes).
- `VIDEOS` = vraies vidéos (TikTok + YouTube) avec `url`, `platform`, `poster`, `views`, `category`.
- `FEATURED_VIDEO` = vidéo virale → page Videos l'affiche via `<TikTokEmbed videoId={FEATURED_VIDEO.id} url={FEATURED_VIDEO.url} />`.
- `VIDEO_CATEGORIES` = ['Tous','TikTok','YouTube','Sketches Fulfulde','Collaborations']. Filtre par platform OU category.

## Ton / Copywriting

Premium, percutant, énergique. Phrases courtes. Bilingue accents (Fulfulde évoqué). Mots-clés: Explorer, Connecter, Impacter. Éviter le corporate fade. Punchlines de comédien + crédibilité d'ambassadeur de marque.
