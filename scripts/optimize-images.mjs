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
  // Nouvelles photos studio HQ (juin 2026) — remplacent les anciennes photos floues
  'Barkantedjo ok.webp': 'hero-portrait.webp',
  'Barkantedjo portrait.webp': 'about-portrait.webp',
  'Barkantedjo Portrait 2.webp': 'about-portrait-2.webp',
  'home-hero-cutout.png': 'home-hero.webp', // détouré (rembg u2net_human_seg) depuis "Barkantedjo Homepage Hero .webp"
  '702335791_1638591624767698_4256854148893593688_n.jpg': 'explorer-poster.webp',
  '494436155_1299386162021581_6417945347941286688_n.jpg': 'savana-ambassador.webp',
  '489620915_1278824757411055_8825267190285617854_n.jpg': 'savana-signature.webp',
  '624819192_18097830625924718_8563925762396941071_n.jpg': 'savana-mekka.webp',
  '502710711_18073628245924718_801480654107278068_n.jpg': 'orange-event.webp',
  // Cutouts héros (autres pages) — nouvelles photos HQ détourées (rembg u2net_human_seg), juin 2026
  'hero-cutout-src.png': 'hero-cutout.webp',     // "Barkantedjo portrait" → Vidéos/Tour/Kit/Contact
  'about-cutout-src.png': 'about-cutout.webp',   // "Barkantedjo ok" (pouce levé) → About
  'savana-cutout-src.png': 'savana-cutout.webp', // "Barkantedjo Portrait 2" → Services/Partenariats
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
