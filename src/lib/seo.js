// ─────────────────────────────────────────────────────────────
// SEO / GEO — config centrale + builders de données structurées
// Domaine: barkantedjo.com  ·  FR  ·  Person/Event/VideoObject schemas
// ─────────────────────────────────────────────────────────────
import { SOCIALS, BRAND, TOUR_CITIES } from './constants'

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
  knowsAbout: ['Humour Fulfulde', 'Stand-up africain', 'Création de contenu', 'Marketing digital', 'Web-comédie'],
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
