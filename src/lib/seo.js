// ─────────────────────────────────────────────────────────────
// SEO / GEO — config centrale + builders de données structurées
// Domaine: barkantedjo.com  ·  FR  ·  Person/Event/VideoObject schemas
// ─────────────────────────────────────────────────────────────
import { SOCIALS, BRAND, TOUR_CITIES, VIDEOS, SERVICES } from './constants'

export const SITE_URL = 'https://barkantedjo.com'
export const SITE_NAME = 'Barkantedjo'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const SAME_AS = [SOCIALS.tiktok, SOCIALS.youtube, SOCIALS.facebook]

export const abs = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

// ── Convertit "12 Juil. 2026" → "2026-07-12" (ISO) pour schema Event ──
const MONTHS = {
  janv: '01', févr: '02', fevr: '02', mars: '03', avr: '04', mai: '05',
  juin: '06', juil: '07', août: '08', aout: '08', sept: '09', oct: '10',
  nov: '11', déc: '12', dec: '12',
}
export function toISODate(fr) {
  // ex: "12 Juil. 2026"
  const m = fr.toLowerCase().replace('.', '').match(/(\d{1,2})\s+([a-zûéèà]+)\.?\s+(\d{4})/i)
  if (!m) return undefined
  const day = m[1].padStart(2, '0')
  const mon = MONTHS[m[2].slice(0, 4)] || MONTHS[m[2].slice(0, 3)] || MONTHS[m[2]]
  return mon ? `${m[3]}-${mon}-${day}` : undefined
}

// ── Person : entité principale (E-E-A-T + GEO entity grounding) ──
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: BRAND.name,
  alternateName: BRAND.realName, // Mohamed Ali
  url: SITE_URL,
  image: OG_IMAGE,
  description:
    "Barkantedjo (« le béni »), de son vrai nom Mohamed Ali, est un humoriste, content creator et digital marketer camerounais originaire de Ngaoundéré. Pionnier de l'humour Fulfulde en format vertical, il réunit plus de 640 000 abonnés (Les Barkantéens) sur TikTok, Facebook et YouTube.",
  jobTitle: BRAND.roles, // Digital Marketer, Content Creator, Comedian
  birthPlace: { '@type': 'Place', name: 'Ngaoundéré, Adamaoua, Cameroun' },
  nationality: { '@type': 'Country', name: 'Cameroun' },
  knowsLanguage: ['Fulfulde', 'Français'],
  knowsAbout: [
    'Humour Fulfulde',
    'Humoriste Cameroun',
    'Humoriste du Grand Nord',
    'Influenceur Cameroun',
    'Créateur de contenu Cameroun',
    'Stand-up africain',
    'Marketing digital',
    'Web-comédie',
  ],
  sameAs: SAME_AS,
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND.name,
  url: SITE_URL,
  logo: OG_IMAGE,
  description: 'Marque et communauté Barkantedjo — Les Barkantéens.',
  founder: { '@id': `${SITE_URL}/#person` },
  sameAs: SAME_AS,
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'fr',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

// ── Fil d'Ariane générique ──
export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

// ── Concerts de l'Explorer Tour → tableau d'Event ──
export function tourEvents() {
  return TOUR_CITIES.map((c) => {
    const start = toISODate(c.date)
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `Barkantedjo — The Explorer Tour · ${c.city}`,
      description: `Spectacle d'humour de Barkantedjo (« le béni ») à ${c.city}, ${c.country}, dans le cadre de The Explorer Tour 2026.`,
      ...(start ? { startDate: `${start}T19:00:00+01:00` } : {}),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: OG_IMAGE,
      url: `${SITE_URL}/explorer-tour`,
      location: {
        '@type': 'Place',
        name: c.venue,
        address: { '@type': 'PostalAddress', addressLocality: c.city, addressCountry: 'NG' },
      },
      performer: { '@type': 'Person', name: BRAND.name, '@id': `${SITE_URL}/#person` },
      organizer: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/explorer-tour`,
        price: '0',
        priceCurrency: 'XOF',
        validFrom: '2026-05-01',
      },
    }
  })
}

// ── VideoObject list (page Vidéos) ──
export function videoListSchema(videos) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vidéos virales de Barkantedjo',
    itemListElement: videos.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: `${v.title} — sketch ${v.category} de Barkantedjo (humour Fulfulde).`,
        thumbnailUrl: abs(v.poster),
        contentUrl: v.url,
        embedUrl: v.url,
        uploadDate: '2025-01-01',
        creator: { '@type': 'Person', name: BRAND.name, '@id': `${SITE_URL}/#person` },
      },
    })),
  }
}

// ── Catalogue de services (OfferCatalog) pour la page /services ──
export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Services de Barkantedjo',
    provider: { '@type': 'Person', name: BRAND.name, '@id': `${SITE_URL}/#person` },
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: ['Cameroun', 'Nigeria', 'Afrique francophone'],
      },
    })),
  }
}

// ── FAQPage (GEO : réponses directes pour les moteurs IA) ──
export function faqSchema(qa) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  }
}

// ─────────────────────────────────────────────────────────────
// SOURCE UNIQUE du SEO par route — consommée par :
//   1) le composant <Seo> dans chaque page (côté client)
//   2) le plugin de pré-rendu (vite.config.js) qui écrit le <head>
//      statique de dist/<route>/index.html (visible sans JS / pour crawlers IA)
// jsonLd = blocs spécifiques à la page (le graph global Person/WebSite/Org
// est ajouté automatiquement, ne pas le répéter ici).
// ─────────────────────────────────────────────────────────────
export const ROUTE_SEO = {
  '/': {
    title: 'Barkantedjo — Humoriste Fulfulde & influenceur camerounais, le béni',
    description:
      "Barkantedjo (Mohamad Ali) : humoriste Fulfulde, influenceur et créateur de contenu camerounais de Ngaoundéré. L'humoriste du Grand Nord, 640 000+ Barkantéens sur TikTok, Facebook et YouTube. Explorer Tour Nigeria 2026.",
    type: 'website',
    jsonLd: [
      faqSchema([
        {
          q: 'Qui est Barkantedjo ?',
          a: "Barkantedjo, de son vrai nom Mohamad Ali, est un humoriste Fulfulde, influenceur et créateur de contenu camerounais né à Ngaoundéré (Adamaoua). Surnommé « l'humoriste du Grand Nord », son nom signifie « le béni » en Fulfulde. Pionnier de l'humour Fulfulde en format vertical, il réunit plus de 640 000 abonnés sur TikTok, Facebook et YouTube.",
        },
        {
          q: 'Que signifie le nom Barkantedjo ?',
          a: "En Fulfulde, la langue de la culture peule du Sahel, Barkantedjo signifie « le béni » — un ange béni venu des cieux.",
        },
        {
          q: "Combien Barkantedjo a-t-il d'abonnés ?",
          a: 'Plus de 640 000 abonnés au total (« Les Barkantéens ») : environ 332 000 sur TikTok, 292 000 sur Facebook et 17 700 sur YouTube.',
        },
        {
          q: "Qu'est-ce que The Explorer Tour ?",
          a: 'The Explorer Tour est la première tournée internationale de Barkantedjo, qui traverse cinq villes du Nigeria (Yola, Gombe, Kano, Kaduna, Abuja) de septembre à octobre 2026.',
        },
      ]),
    ],
  },
  '/about': {
    title: 'À propos de Barkantedjo — Mohamad Ali, « le béni » de Ngaoundéré',
    description:
      "L'histoire de Barkantedjo (Mohamad Ali) : de Ngaoundéré aux scènes du Nigeria. Humoriste Fulfulde, influenceur et créateur de contenu du Grand Nord. Parcours, vision et impact.",
    type: 'profile',
    jsonLd: [
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
    ],
  },
  '/videos': {
    title: 'Vidéos de Barkantedjo — Sketches Fulfulde, TikTok & YouTube',
    description:
      'Les vidéos virales de Barkantedjo : sketches en Fulfulde, série Daaaaaani, collabs et moments cultes. Format vertical 9:16 pensé pour TikTok, Shorts et Reels.',
    type: 'website',
    jsonLd: [
      videoListSchema(VIDEOS),
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Vidéos', path: '/videos' },
      ]),
    ],
  },
  '/explorer-tour': {
    title: 'The Explorer Tour 2026 — Barkantedjo en tournée au Nigeria (5 villes)',
    description:
      'The Explorer Tour : la première tournée internationale de Barkantedjo traverse 5 villes du Nigeria — Yola, Gombe, Kano, Kaduna, Abuja — de septembre à octobre 2026. Dates, lieux et billetterie.',
    type: 'website',
    jsonLd: [
      ...tourEvents(),
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Explorer Tour', path: '/explorer-tour' },
      ]),
      faqSchema([
        {
          q: 'Quelles villes la tournée Explorer Tour de Barkantedjo visite-t-elle ?',
          a: 'The Explorer Tour 2026 passe par cinq villes du Nigeria : Yola (30 septembre), Gombe (2 octobre), Kano (4 octobre), Kaduna (6 octobre) et Abuja (8 octobre 2026).',
        },
        {
          q: 'Quand commence The Explorer Tour ?',
          a: 'La tournée démarre le 30 septembre 2026 à Yola (Yola City Hall), au Nigeria.',
        },
      ]),
    ],
  },
  '/services': {
    title: 'Services — Barkantedjo : influence marketing, UGC & ambassadeur de marque',
    description:
      "Les services de Barkantedjo : influence marketing, ambassadeur de marque, présentation d'événements, publicités vidéo, UGC, campagnes digitales et consultance en communication. 640 000+ Barkantéens au service de ta marque.",
    type: 'website',
    jsonLd: [
      servicesSchema(),
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
      faqSchema([
        {
          q: 'Quels services propose Barkantedjo ?',
          a: "Barkantedjo propose : influence marketing, ambassadeur de marque, présentation d'événements, publicités vidéo, contenu UGC, campagnes digitales et consultance en communication.",
        },
        {
          q: 'Comment collaborer avec Barkantedjo ?',
          a: 'Pour une campagne, un événement, une publicité ou de la consultance, contactez Barkantedjo via la page Contact ou à booking@barkantedjo.com. Réponse garantie sous 48h.',
        },
      ]),
    ],
  },
  '/kit': {
    title: 'Media Kit & Portfolio — Barkantedjo (chiffres, audience, collaborations)',
    description:
      "Le kit média professionnel de Barkantedjo à télécharger : 642 000+ abonnés, 100M+ de vues cumulées, audiences au Cameroun, Nigeria, Tchad, Niger, France et États-Unis. Langues : Fulfulde, français, anglais, haoussa. Demande de collaboration en ligne.",
    type: 'website',
    jsonLd: [
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Media Kit', path: '/kit' },
      ]),
      faqSchema([
        {
          q: "Combien d'abonnés et de vues Barkantedjo cumule-t-il ?",
          a: 'Barkantedjo réunit plus de 642 000 abonnés et plus de 100 millions de vues cumulées sur TikTok, Facebook et YouTube.',
        },
        {
          q: 'Dans quels pays Barkantedjo a-t-il une audience ?',
          a: 'Son audience est présente au Cameroun, au Nigeria, au Tchad, au Niger, en France et aux États-Unis.',
        },
        {
          q: 'Quelles langues Barkantedjo parle-t-il dans ses contenus ?',
          a: 'Il s\'exprime en fulfulde, en français, en anglais et en haoussa.',
        },
      ]),
    ],
  },
  '/partenariats': {
    title: 'Partenariats & Brand Ambassador — Barkantedjo',
    description:
      'Les marques qui font confiance à Barkantedjo : Savana Islamic Finance, Orange Cameroun, Global Gateway, Canal+, TATITECH, Sweet FM. Ambassadeur de marque qui déplace des audiences entières.',
    type: 'website',
    jsonLd: [
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Partenariats', path: '/partenariats' },
      ]),
    ],
  },
  '/contact': {
    title: 'Contact & Booking — Barkantedjo',
    description:
      'Booking, partenariat de marque, média, Explorer Tour : contactez Barkantedjo. Réponse garantie sous 48h. Email booking@barkantedjo.com.',
    type: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact — Barkantedjo',
        url: `${SITE_URL}/contact`,
        mainEntity: {
          '@type': 'Person',
          name: BRAND.name,
          '@id': `${SITE_URL}/#person`,
          email: 'booking@barkantedjo.com',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'booking',
            email: 'booking@barkantedjo.com',
            availableLanguage: ['fr'],
          },
          sameAs: SAME_AS,
        },
      },
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },
}

// Blocs JSON-LD complets (graph global + page) pour une route — utilisé au pré-rendu
export function routeJsonLd(path) {
  const r = ROUTE_SEO[path]
  return [personSchema, websiteSchema, organizationSchema, ...(r?.jsonLd || [])]
}
