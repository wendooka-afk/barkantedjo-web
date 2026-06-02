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

## Backend / Dashboard (Supabase)
Le dashboard `/admin` et les formulaires (Contact, newsletter) utilisent Supabase.
- **Variables d'env REQUISES au build** (sinon formulaires + admin inactifs ; `.env` est gitignoré) :
  - `VITE_SUPABASE_URL=https://ywwhzvsqfumzubqehbmf.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=sb_publishable_...` (clé publishable, sûre côté client — RLS protège)
  - Sur **Coolify** : Settings → Environment Variables (build-time).
- Projet Supabase : « Wendooka Digital », tables préfixées `bk_`. RLS active.
- Accès admin : `/admin/login` (email dans l'allowlist `bk_admins`). **Changer le mot de passe temporaire.**
- `/admin` est `Disallow` dans robots.txt + `noindex`.
- Détails & axes d'amélioration : `AUDIT_AMELIORATIONS.md`.

## Resend — emails de notification des leads
À chaque nouvelle demande Contact, un trigger Postgres (`bk_leads_notify`) envoie un email à
`booking@barkantedjo.com` via Resend. **Inactif tant que la clé n'est pas posée** (n'altère pas l'insert).

Activation (une fois) :
1. Créer un compte sur [resend.com], récupérer une clé API (`re_...`).
2. (Recommandé) Vérifier le domaine `barkantedjo.com` chez Resend (DNS) pour un `from` pro et la
   délivrabilité. Sans domaine, Resend n'envoie qu'à l'adresse du compte (mode test).
3. Poser les secrets dans Supabase (SQL editor du projet `ywwhzvsqfumzubqehbmf`) :
```sql
select vault.create_secret('re_VOTRE_CLE', 'RESEND_API_KEY');
-- après vérif du domaine :
select vault.create_secret('Barkantedjo <booking@barkantedjo.com>', 'RESEND_FROM');
```
4. Tester : envoyer une demande via /contact → l'email doit arriver.

## Images
WebP générés via `npm run optimize:images` (sharp, dev-dep). Relancer après ajout d'images, puis
mettre à jour `src/lib/constants.js` (`IMAGES`).

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
