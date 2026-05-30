// Seo : balises <head> par page (React 19 hoist natif title/meta/link)
// + injection JSON-LD. Aucune dépendance externe.
// main.jsx retire les balises SEO statiques de index.html avant montage :
// React devient l'unique source du <head> côté client (pas de doublons).
import {
  SITE_URL, SITE_NAME, OG_IMAGE, abs,
  personSchema, websiteSchema, organizationSchema,
} from '../lib/seo'

export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  jsonLd = [],
  baseGraph = true, // entité globale Person/WebSite/Organization sur chaque page
  noindex = false,
}) {
  const url = abs(path)
  const img = abs(image)
  const page = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  const blocks = baseGraph
    ? [personSchema, websiteSchema, organizationSchema, ...page]
    : page

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {/* Données structurées (contenu interne contrôlé, pas d'entrée utilisateur) */}
      {blocks.filter(Boolean).map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block).replace(/</g, '\\u003c')}
        </script>
      ))}
    </>
  )
}
