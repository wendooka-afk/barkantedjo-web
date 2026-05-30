import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { ROUTE_SEO, routeJsonLd, abs, OG_IMAGE } from './src/lib/seo.js'

// ─────────────────────────────────────────────────────────────
// Pré-rendu SEO : après le build, écrit dist/<route>/index.html avec un
// <head> propre à chaque page (title, meta description, canonical, OG,
// JSON-LD). Résout le problème SPA : chaque route a SES balises dans le
// HTML source (visibles sans JS, pour Google + crawlers IA + view-source).
// ─────────────────────────────────────────────────────────────
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headFor(routePath, meta) {
  const url = abs(routePath)
  const ld = routeJsonLd(routePath)
    .map(
      (b) =>
        `    <script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n')
  return `<!-- Primary -->
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph -->
    <meta property="og:site_name" content="Barkantedjo" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:type" content="${meta.type || 'website'}" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

${ld}`
}

function seoPrerender() {
  return {
    name: 'seo-prerender',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const tplPath = path.join(dist, 'index.html')
      if (!fs.existsSync(tplPath)) return
      const tpl = fs.readFileSync(tplPath, 'utf8')
      const marker = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/

      for (const [routePath, meta] of Object.entries(ROUTE_SEO)) {
        const block = `<!-- SEO:START (généré) -->\n    ${headFor(routePath, meta)}\n    <!-- SEO:END -->`
        const html = tpl.replace(marker, block)
        const outDir = routePath === '/' ? dist : path.join(dist, routePath)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), html)
      }
      // eslint-disable-next-line no-console
      console.log(`✓ SEO prerender: ${Object.keys(ROUTE_SEO).length} routes`)
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    seoPrerender(),
  ],
})
