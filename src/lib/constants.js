// ─────────────────────────────────────────────────────────────
// BARKANTEDJO — Design System v3 "Spotlight"
// Palette: Orange→Red gradient · Black/charcoal · White/cream
// Inspiration: Oprah cinematic hero + Knowledge17 cards/countdown
// ─────────────────────────────────────────────────────────────

export const COLORS = {
  black: '#0A0A0A',
  charcoal: '#161616',
  card: '#1C1C1C',
  cardHover: '#242424',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',
  orange: '#FF6B00',
  red: '#E02424',
  amber: '#FFA033',
  white: '#FFFFFF',
  textMuted: '#B8B8B8',
  textDim: '#8A8A8A', // remonté pour contraste WCAG AA
  light: '#F5F5F2',
  lightCard: '#FFFFFF',
}

// Fond "foule / audience" commun à tous les héros (effet salle de comédie)
export const CROWD_BG = 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80'

// Reusable inline-style helpers (agents can import these)
export const GRADIENT = 'linear-gradient(135deg, #FF6B00 0%, #E02424 100%)'
export const GRADIENT_SOFT = 'linear-gradient(135deg, rgba(255,107,0,0.15) 0%, rgba(224,36,36,0.15) 100%)'

// ─── Identité / communauté ───────────────────────────────────
// "Barkantedjo" (singulier) = « le béni » en français.
// La communauté = « Les Barkantéens ».
export const BRAND = {
  name: 'Barkantedjo',
  realName: 'Mohamed Ali',
  meaning: 'le béni', // « ange béni venu des cieux »
  community: 'Les Barkantéens',
  communitySingular: 'Barkantéen',
  motto: 'Explorer · Connecter · Impacter',
  origin: 'Ngaoundéré, Adamaoua',
  roles: ['Digital Marketer', 'Content Creator', 'Comedian'],
}

// ─── Réseaux sociaux (liens réels) ───────────────────────────
export const SOCIALS = {
  youtube: 'https://www.youtube.com/@barkantedjo7294',
  tiktok: 'https://www.tiktok.com/@barkantedjo0',
  facebook: 'https://www.facebook.com/barkantedjo',
}

// Images optimisées WebP (générées par `npm run optimize:images`, -61% de poids)
export const IMAGES = {
  heroPortrait: '/hero-portrait.webp',
  aboutPortrait: '/about-portrait.webp',
  aboutPortrait2: '/about-portrait-2.webp',
  explorerTourPoster: '/explorer-poster.webp',
  savanaAmbassador: '/savana-ambassador.webp',
  savanaSignature: '/savana-signature.webp',
  savanaMekka: '/savana-mekka.webp',
  orangeEvent: '/orange-event.webp',
  // Portraits détourés (fond transparent, alpha WebP) pour les héros
  homeHero: '/home-hero.webp',
  heroCutout: '/hero-cutout.webp',
  aboutCutout: '/about-cutout.webp',
  savanaCutout: '/savana-cutout.webp',
}

// "Featured in" logo bar (Oprah-style)
export const PARTNERS = [
  { name: 'Canal+' },
  { name: 'Savana' },
  { name: 'Orange' },
  { name: 'Global Gateway' },
  { name: 'TATITECH' },
  { name: 'Sweet FM' },
]

export const TOUR_CITIES = [
  { city: 'Yola', country: 'Nigeria', date: '12 Juil. 2026', venue: 'Yola City Hall' },
  { city: 'Gombe', country: 'Nigeria', date: '19 Juil. 2026', venue: 'Gombe Arena' },
  { city: 'Kano', country: 'Nigeria', date: '02 Août 2026', venue: 'Kano Convention Center' },
  { city: 'Kaduna', country: 'Nigeria', date: '16 Août 2026', venue: 'Kaduna Theatre' },
  { city: 'Abuja', country: 'Nigeria', date: '06 Sept. 2026', venue: 'Abuja International' },
]

// Countdown target — first show
export const TOUR_START = '2026-07-12T19:00:00'

// Audience réelle par réseau (mai 2026)
// TikTok 332.2K + Facebook 292K + YouTube 17.7K = 641.9K ≈ 642K Barkantéens
export const STATS = [
  { value: '642K+', label: 'Barkantéens' },
  { value: '332K', label: 'TikTok' },
  { value: '292K', label: 'Facebook' },
  { value: '17.7K', label: 'YouTube' },
]

// ─── Copy des héros (style Oprah : mot géant DERRIÈRE le portrait) ───
// bgText = le grand mot/nom placé derrière le portrait.
// front = eyebrow + punchline + sub affichés DEVANT (au-dessus de la photo).
export const HERO = {
  home: {
    bgText: 'Barkantedjo',
    crowdBg: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80',
    eyebrow: 'Digital Marketer · Content Creator · Comedian',
    punchline: 'Le béni qui fait rire tout un continent.',
    sub: "Plus de 640 000 Barkantéens. Du Fulfulde au français, des écrans verticaux aux scènes du Nigeria — un rire qui ne connaît aucune frontière.",
    portrait: IMAGES.homeHero,
  },
  about: {
    bgText: 'Le Béni',
    eyebrow: 'À Propos',
    punchline: 'Barkantedjo, « le béni ».',
    sub: "Envoyé pour soigner les maux de la société par le rire. De Ngaoundéré aux scènes internationales, l'humour Fulfulde porté partout où il peut toucher un cœur.",
    portrait: IMAGES.aboutCutout,
  },
  videos: {
    bgText: 'Vertical',
    eyebrow: 'Le Contenu',
    punchline: 'Pensé pour ton écran. Filmé à la verticale.',
    sub: "Sketches en Fulfulde, série culte Daaaaaani, lives et collabs. Format 9:16, fait pour TikTok, Shorts et Reels.",
    portrait: IMAGES.heroCutout,
  },
  tour: {
    bgText: 'Nigeria',
    eyebrow: 'Tournée Internationale 2026',
    punchline: 'Cinq villes. Un seul béni. Zéro frontière.',
    sub: "The Explorer Tour traverse le Nigeria. L'humour sahélien débarque sur la plus grande scène d'Afrique de l'Ouest.",
    portrait: IMAGES.heroCutout,
  },
  partners: {
    bgText: 'Confiance',
    eyebrow: 'Brand Ambassadorship',
    punchline: 'Les marques qui ont choisi le béni.',
    sub: "De la finance islamique aux télécoms, des institutions européennes aux médias panafricains — des partenariats qui touchent des millions de personnes.",
    portrait: IMAGES.savanaCutout,
  },
  contact: {
    bgText: 'Contact',
    eyebrow: 'Travaillons ensemble',
    punchline: 'Un projet à la hauteur de ton ambition.',
    sub: "Spectacle, festival, partenariat de marque, média. Réponse garantie sous 48h.",
    portrait: IMAGES.heroCutout,
  },
}

export const VIDEO_CATEGORIES = ['Tous', 'TikTok', 'YouTube', 'Sketches Fulfulde', 'Collaborations']

// ─── Vidéos VIRALES réelles (liens réels TikTok + YouTube) ───
// Contenu vertical 9:16. Posters TikTok = vraies photos artiste (thumbs CDN TikTok expirent).
// YouTube = thumbnail stable img.youtube.com/vi/<id>/hqdefault.jpg.
// FEATURED = vidéo virale fournie, intégrée en embed officiel TikTok.
export const FEATURED_VIDEO = {
  platform: 'tiktok',
  id: '7507713541391043896',
  url: 'https://www.tiktok.com/@barkantedjo0/video/7507713541391043896',
  title: 'La vidéo qui a enflammé tout le TikTok camerounais',
  category: 'TikTok',
}

const yt = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

export const VIDEOS = [
  // ── TikTok (lien réel, poster = photo artiste) ──
  { id: 't1', platform: 'tiktok', videoId: '7507713541391043896', url: 'https://www.tiktok.com/@barkantedjo0/video/7507713541391043896', title: 'Le sketch qui a tout déclenché', category: 'Sketches Fulfulde', views: '1.2M', poster: IMAGES.heroPortrait },
  { id: 't2', platform: 'tiktok', videoId: '7578611181993135371', url: 'https://www.tiktok.com/@barkantedjo0/video/7578611181993135371', title: 'Quand le Nord parle, tout le monde rit', category: 'Sketches Fulfulde', views: '845K', poster: IMAGES.aboutPortrait2 },
  { id: 't3', platform: 'tiktok', videoId: '7566746480002747659', url: 'https://www.tiktok.com/@barkantedjo0/video/7566746480002747659', title: 'Le quotidien à la sauce Barkantedjo', category: 'Sketches Fulfulde', views: '612K', poster: IMAGES.aboutPortrait },
  { id: 't4', platform: 'tiktok', videoId: '7556932955256540472', url: 'https://www.tiktok.com/@barkantedjo0/video/7556932955256540472', title: 'Personne ne fait ça comme lui', category: 'Sketches Fulfulde', views: '534K', poster: IMAGES.heroPortrait },
  { id: 't5', platform: 'tiktok', videoId: '7544366875262684422', url: 'https://www.tiktok.com/@barkantedjo0/video/7544366875262684422', title: 'La punchline en Fulfulde', category: 'Sketches Fulfulde', views: '498K', poster: IMAGES.aboutPortrait2 },
  { id: 't6', platform: 'tiktok', videoId: '7525531653607787781', url: 'https://www.tiktok.com/@barkantedjo0/video/7525531653607787781', title: 'Ce moment culte', category: 'Sketches Fulfulde', views: '421K', poster: IMAGES.aboutPortrait },
  { id: 't7', platform: 'tiktok', videoId: '7540741326615088440', url: 'https://www.tiktok.com/@barkantedjo0/video/7540741326615088440', title: 'Le béni en action', category: 'Sketches Fulfulde', views: '389K', poster: IMAGES.heroPortrait },
  { id: 't8', platform: 'tiktok', videoId: '7585601816474225941', url: 'https://www.tiktok.com/@barkantedjo0/video/7585601816474225941', title: 'Trop drôle pour être vrai', category: 'Sketches Fulfulde', views: '356K', poster: IMAGES.aboutPortrait2 },
  // ── YouTube (thumbnail réel stable) ──
  { id: 'y1', platform: 'youtube', videoId: 'Ce_6h1QYLs8', url: 'https://www.youtube.com/watch?v=Ce_6h1QYLs8', title: 'Le grand Babanguida Tourti 🤣', category: 'Sketches Fulfulde', views: '210K', poster: yt('Ce_6h1QYLs8') },
  { id: 'y2', platform: 'youtube', videoId: 'gk2GhUbKHnc', url: 'https://www.youtube.com/watch?v=gk2GhUbKHnc', title: 'Barkantedjo souffre avec Kaou Iya', category: 'Collaborations', views: '178K', poster: yt('gk2GhUbKHnc') },
  { id: 'y3', platform: 'youtube', videoId: 'mZhL0BWxduU', url: 'https://www.youtube.com/watch?v=mZhL0BWxduU', title: 'Barkantedjo en vacances à Ngaoundéré', category: 'Sketches Fulfulde', views: '143K', poster: yt('mZhL0BWxduU') },
]

export const TESTIMONIALS = [
  {
    quote: "Barkantedjo a transformé notre campagne. Son authenticité touche un public que personne d'autre n'atteint.",
    author: 'Direction Marketing',
    org: 'Savana Islamic Finance',
    image: IMAGES.savanaSignature,
  },
  {
    quote: "Un talent rare : il fait rire le Nord comme le Sud, en Fulfulde comme en français. Une vraie force de frappe digitale.",
    author: 'Équipe Événementiel',
    org: 'Orange Cameroun',
    image: IMAGES.orangeEvent,
  },
]

export const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'À Propos', path: '/about' },
  { label: 'Vidéos', path: '/videos' },
  { label: 'Explorer Tour', path: '/explorer-tour' },
  { label: 'Partenariats', path: '/partenariats' },
  { label: 'Contact', path: '/contact' },
]
