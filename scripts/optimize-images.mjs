// Convertit les images lourdes de public/ en WebP (qualité 80, max 1600px de large).
// Conserve les originaux (référencés par la base bk_videos / og-image).
// Lancer : node scripts/optimize-images.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')

// source -> nom WebP de sortie
const MAP = {
  '621253415_18097279492924718_3691284739478424428_n.jpg': 'hero-portrait.webp',
  '691583760_1632161675410693_977315285687019278_n.jpg': 'about-portrait.webp',
  '504242303_1330506035576260_2553521985165676926_n.jpg': 'about-portrait-2.webp',
  '702335791_1638591624767698_4256854148893593688_n.jpg': 'explorer-poster.webp',
  '494436155_1299386162021581_6417945347941286688_n.jpg': 'savana-ambassador.webp',
  '489620915_1278824757411055_8825267190285617854_n.jpg': 'savana-signature.webp',
  '624819192_18097830625924718_8563925762396941071_n.jpg': 'savana-mekka.webp',
  '502710711_18073628245924718_801480654107278068_n.jpg': 'orange-event.webp',
  'Barkantedjo home hero.png': 'home-hero.webp',
  'hero_cutout.png': 'hero-cutout.webp',
  'about_cutout.png': 'about-cutout.webp',
  'savana_cutout.png': 'savana-cutout.webp',
}

let before = 0, after = 0
for (const [src, out] of Object.entries(MAP)) {
  const inPath = path.join(pub, src)
  const outPath = path.join(pub, out)
  if (!fs.existsSync(inPath)) { console.warn('skip (introuvable):', src); continue }
  const b = fs.statSync(inPath).size
  await sharp(inPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath)
  const a = fs.statSync(outPath).size
  before += b; after += a
  console.log(`${out.padEnd(24)} ${(b / 1024 | 0)}Ko -> ${(a / 1024 | 0)}Ko`)
}
console.log(`\nTotal ${(before / 1024 | 0)}Ko -> ${(after / 1024 | 0)}Ko (-${(100 - after / before * 100) | 0}%)`)
