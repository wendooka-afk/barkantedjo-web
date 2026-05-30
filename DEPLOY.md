# Déploiement — Barkantedjo

Stack : React + Vite (site statique). Build → dossier `dist/`.

## Build
```bash
npm ci
npm run build      # génère dist/
```

## Coolify (recommandé, cf. PRD)
- Type : **Static Site**
- Build command : `npm run build`
- Publish directory : `dist`
- Domaine : `barkantedjo.com` (SSL Let's Encrypt auto via Traefik)

## IMPORTANT — SPA fallback (routing React Router)
Les routes `/about`, `/videos`, etc. doivent renvoyer `index.html` (sinon 404 au refresh).

- Netlify / Cloudflare Pages : `public/_redirects` déjà présent (`/* /index.html 200`).
- **Nginx** (Coolify custom) : ajouter
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Sécurité / perf (vérifié)
- Aucun secret dans le code, pas de `.env` commité (gitignore OK).
- Liens externes : `target="_blank" rel="noopener noreferrer"`.
- Pas de `dangerouslySetInnerHTML` ni `eval`.
- Images héros optimisées (PNG détourés compressés).
- Bundle : ~97 KB JS gz, ~6 KB CSS gz.

## SEO / GEO
Stack complet en place — voir `SEO_GEO_PLAYBOOK.md`.
- Meta par page + JSON-LD via `src/components/Seo.jsx` (React 19, sans dépendance).
- Statiques servis depuis `public/` : `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`,
  `site.webmanifest`, `_headers`, `og-image.jpg`.
- **Après déploiement** : soumettre `sitemap.xml` à Google Search Console + Bing (étapes dans le playbook).
- `_headers` (Netlify/Cloudflare) couvre déjà sécurité + cache. Pour Nginx, reporter ces en-têtes.

## En-têtes recommandés (optionnel, via reverse proxy)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```
