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

## En-têtes recommandés (optionnel, via reverse proxy)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```
