// ─────────────────────────────────────────────────────────────
// BARKANTEDJO — Design System v3 "Spotlight"
// Palette: Lime→Vert foncé gradient (#B4E701 → #056a2b) · Black/charcoal · White/cream
// NB: les clés COLORS.orange/red/amber conservent leur nom mais portent
//     désormais les teintes vertes (évite de renommer text-orange partout).
// Inspiration: Oprah cinematic hero + Knowledge17 cards/countdown
// ─────────────────────────────────────────────────────────────

export const COLORS = {
  black: '#0A0A0A',
  charcoal: '#161616',
  card: '#1C1C1C',
  cardHover: '#242424',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',
  orange: '#B4E701',
  red: '#056a2b',
  amber: '#7FB800',
  white: '#FFFFFF',
  textMuted: '#B8B8B8',
  textDim: '#8A8A8A', // remonté pour contraste WCAG AA
  light: '#F5F5F2',
  lightCard: '#FFFFFF',
}

// Fond "foule / audience" commun à tous les héros (effet salle de comédie)
export const CROWD_BG = 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80'

// Reusable inline-style helpers (agents can import these)
export const GRADIENT = 'linear-gradient(135deg, #B4E701 0%, #056a2b 100%)'
export const GRADIENT_SOFT = 'linear-gradient(135deg, rgba(180,231,1,0.15) 0%, rgba(5,106,43,0.15) 100%)'

// ─── Identité / communauté ───────────────────────────────────
// "Barkantedjo" (singulier) = « le béni » en français.
// La communauté = « Les Barkantéens ».
export const BRAND = {
  name: 'Barkantedjo',
  realName: 'Mohamad Ali',
  meaning: 'le béni', // « ange béni venu des cieux »
  community: 'Les Barkantéens',
  communitySingular: 'Barkantéen',
  motto: 'Explorer · Connecter · Impacter',
  origin: 'Ngaoundéré, Adamaoua',
  roles: ['Humoriste Fulfulde', 'Influenceur', 'Créateur de contenu', 'Digital Marketer'],
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
// Un seul partenaire = un seul logo présent dans public/. Retiré si le fichier
// logo n'existe pas encore (TATITECH, Sweet FM en attente).
export const PARTNERS = [
  { name: 'Canal+', logo: '/CANAL+.jpg' },
  { name: 'Savana', logo: '/SAVANA.jpg' },
  { name: 'MTN', logo: '/MTN.jpg' },
  { name: 'Sodecoton', logo: '/SODECOTON.jpg' },
  { name: 'Minsanté', logo: '/MINSANTE.jpg' },
  { name: 'Azur S.A.', logo: '/AZUR SA.jpg' },
  { name: 'ASK Travel & Services', logo: '/ASK TRAVEL.jpg' },
  { name: 'Global Gateway / UE', logo: '/UE.jpg' },
]

export const TOUR_CITIES = [
  { city: 'Yola', country: 'Nigeria', date: '30 Sept. 2026', venue: 'Yola City Hall' },
  { city: 'Gombe', country: 'Nigeria', date: '02 Oct. 2026', venue: 'Gombe Arena' },
  { city: 'Kano', country: 'Nigeria', date: '04 Oct. 2026', venue: 'Kano Convention Center' },
  { city: 'Kaduna', country: 'Nigeria', date: '06 Oct. 2026', venue: 'Kaduna Theatre' },
  { city: 'Abuja', country: 'Nigeria', date: '08 Oct. 2026', venue: 'Abuja International' },
]

// Countdown target — first show
export const TOUR_START = '2026-09-30T19:00:00'

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
    eyebrow: 'Humoriste Fulfulde · Influenceur · Créateur de contenu',
    punchline: 'Le béni qui fait rire et découvrir le continent.',
    sub: "De Ngaoundéré pour la conquête du monde. Plus de 640 000 Barkantéens, du Fulfulde au français, des écrans verticaux aux scènes du Nigeria — un rire qui ne connaît aucune frontière.",
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
    sub: "Le génie créateur de Barkantedjo nous fera découvrir plusieurs villes du Nigeria, mais aussi des cultures, traditions, ethnies et commerces comme on n'en a jamais vu.",
    portrait: IMAGES.heroCutout,
  },
  services: {
    bgText: 'Services',
    eyebrow: 'Collaborations de marque',
    punchline: 'Le béni au service de ta marque.',
    sub: "Influence marketing, ambassadeur de marque, présentation d'événements, publicités vidéo, UGC, campagnes digitales et consultance — la force de frappe de 640 000 Barkantéens au service de tes objectifs.",
    portrait: IMAGES.savanaCutout,
  },
  kit: {
    bgText: 'Media Kit',
    eyebrow: 'Portfolio & Media Kit',
    punchline: 'Le dossier pro du béni.',
    sub: "Audience, chiffres à impact, formats et collaborations — tout ce qu'une marque doit savoir sur Barkantedjo, réuni dans un kit média professionnel à télécharger.",
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
  { label: 'Services', path: '/services' },
  { label: 'Media Kit', path: '/kit' },
  { label: 'Partenariats', path: '/partenariats' },
  { label: 'Contact', path: '/contact' },
]

// ─── Services proposés (page /services) ──────────────────────
// icon = nom d'icône lucide-react (résolu dans la page Services).
export const SERVICES = [
  {
    icon: 'Megaphone',
    title: 'Influence marketing',
    description:
      "Des campagnes d'influence qui touchent 640 000 Barkantéens engagés. Sketches sponsorisés, intégrations natives et formats viraux pensés pour convertir.",
  },
  {
    icon: 'BadgeCheck',
    title: 'Ambassadeur de marque',
    description:
      'Représentation premium et long terme. Le béni porte ton image avec la même authenticité qui a séduit Savana, Orange et Canal+.',
  },
  {
    icon: 'Mic',
    title: "Présentation d'événements",
    description:
      "Animation de soirées, lancements, galas et festivals. Une présence de scène qui captive le public, du Cameroun au Nigeria.",
  },
  {
    icon: 'Video',
    title: 'Publicités vidéo',
    description:
      'Spots publicitaires créatifs, scénarisés et produits en Fulfulde ou en français. Le format court qui fait vendre et rester en mémoire.',
  },
  {
    icon: 'Clapperboard',
    title: 'UGC',
    description:
      "Contenu authentique (User-Generated Content) filmé à la verticale, calibré pour TikTok, Reels et Shorts. Le ton vrai qui performe sur les algorithmes.",
  },
  {
    icon: 'Rocket',
    title: 'Campagnes digitales',
    description:
      "Stratégie, création et diffusion multiplateformes. Du concept au reporting, des campagnes digitales pilotées par un vrai digital marketer.",
  },
  {
    icon: 'Lightbulb',
    title: 'Consultance en communication',
    description:
      "Conseil en communication, positionnement de marque et stratégie de contenu pour percer auprès des audiences d'Afrique centrale et de l'Ouest.",
  },
]
