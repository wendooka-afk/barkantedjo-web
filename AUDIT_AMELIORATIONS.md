# Audit général & propositions d'amélioration — Barkantedjo

_Date : 2026-06-02 · Périmètre : site vitrine `barkantedjo-web` + backend/dashboard._

---

## 1. Résumé exécutif

Le site vitrine est **solide** : design abouti, SEO/GEO complet (méta par route, JSON-LD, prerender,
llms.txt). Avant cette session il manquait **tout le back-office** : les formulaires étaient **factices**
(aucun envoi), donc **chaque demande de booking et chaque inscription newsletter était perdue**.

**Livré cette session :**
- ✅ Carte téléphone retirée du Contact (placeholder supprimé, email conservé).
- ✅ `og-image.jpg` 1200×630 brandée (portrait + identité).
- ✅ **Backend Supabase + dashboard admin complet** (`/admin`) — voir §2.

**Risques restants prioritaires :** notification email des leads (P0), optimisation images (P0),
anti-spam formulaires (P0), site public piloté par la base (P1), version anglaise pour le Nigeria (P1).

---

## 2. Backend & dashboard — livré

**Base :** Supabase (PostgreSQL), org Wendooka, projet **Wendooka Digital** (`ywwhzvsqfumzubqehbmf`),
tables préfixées `bk_` (isolation du reste du projet). Région Paris (eu-west-3).

| Table | Rôle | RLS |
|---|---|---|
| `bk_leads` | Demandes du formulaire Contact | INSERT public · lecture/gestion admin |
| `bk_newsletter` | Inscrits newsletter | INSERT public · lecture/suppr. admin |
| `bk_tour_dates` | Dates de tournée | lecture publique · écriture admin |
| `bk_videos` | Vidéos | lecture publique · écriture admin |
| `bk_admins` | Allowlist admin | admin only |

**Sécurité :** RLS sur toutes les tables, écritures admin gardées par `bk_is_admin()` (allowlist
serveur, `search_path` figé, EXECUTE révoqué à `anon`). Clé `publishable` côté client (sûre, RLS protège).
Vérifié : anon peut insérer un lead mais **ne peut PAS lire** les leads ; admin lit après login. ✅

**Dashboard `/admin`** (chunk lazy, n'alourdit pas le site public) :
- Login Supabase Auth · garde d'accès (session + allowlist).
- Vue d'ensemble (compteurs + dernières demandes).
- Demandes : filtrage par statut, détail, changement de statut, réponse email, suppression.
- Newsletter : liste, **export CSV**, suppression.
- Dates de tournée : CRUD complet.
- Vidéos : CRUD complet.

**Formulaires publics câblés en réel :** Contact → `bk_leads`, newsletter (footer) → `bk_newsletter`
(import dynamique de Supabase → 0 impact sur le bundle initial public).

> ⚠️ **Actions immédiates** (voir §7) : changer le mot de passe admin temporaire, et définir les
> variables d'env Supabase sur l'hébergeur (Coolify) pour le build de prod.

---

## 3. Audit SEO / GEO — ✅ conforme

Méta uniques par route (prerender → présentes dans le HTML source), JSON-LD complet
(Person, Event×5, VideoObject, FAQ, Breadcrumb…), `robots.txt` (autorise les bots IA, bloque `/admin`),
`sitemap.xml`, `llms.txt`/`llms-full.txt`, og-image. **Reste (hors code)** : soumettre le sitemap à
Google Search Console + Bing, créer Wikidata, harmoniser les bios réseaux → détail dans
`SEO_GEO_PLAYBOOK.md`.

---

## 4. Performance — ⚠️ à améliorer

| Constat | Sévérité | Détail |
|---|---|---|
| Images non optimisées | **Élevé** | `Barkantedjo home hero.png` 845 Ko, `hero_cutout.png` 603 Ko, un JPG 602 Ko. Pas de WebP/AVIF, pas de `srcset`/`sizes`, pas de `loading="lazy"`. `dist` ≈ 4,6 Mo (quasi tout en images). |
| JS public | OK | 101 Ko gz (correct). Admin + Supabase en chunks séparés (lazy). |
| Polices Google CDN | Faible | Bloquant au rendu (atténué par `display=swap`). Option : self-host. |
| Cache | OK | `_headers` ajouté (assets immuables 1 an). |

**Reco :** convertir les images en **WebP** (gain ~70 %), générer des variantes responsives, ajouter
`loading="lazy"` + `width/height` (anti-CLS). Cible Lighthouse perf > 90 mobile.

---

## 5. Accessibilité — ⚠️ moyen

- ✅ `lang=fr`, 11/11 images avec `alt`, labels de formulaire présents, icônes-boutons avec `aria-label`.
- ⚠️ **Focus clavier** : plusieurs `outline: none` sur inputs sans état focus visible de remplacement.
- ⚠️ **Contraste** : texte `#6B6B6B` (textDim) sur fond noir < 4.5:1 → échec WCAG AA pour petit texte.
- ⚠️ Pas de lien d'évitement ("aller au contenu").
- Reco : ajouter `:focus-visible` visible, remonter les gris faibles, skip-link.

## 6. Sécurité & robustesse — ⚠️ moyen

- ✅ Pas de secret en clair (clé publishable + RLS), `.env` gitignoré, liens ext `rel=noopener`,
  pas de `dangerouslySetInnerHTML` dangereux. En-têtes de base via `_headers`.
- ⚠️ **Anti-spam absent** sur les formulaires publics (insert ouvert par design) → ajouter
  **Cloudflare Turnstile / hCaptcha + honeypot** + limite de débit.
- ⚠️ Pas de **notification email** quand un lead arrive (Barkantedjo doit ouvrir le dashboard) → risque
  de rater un booking. **À corriger en P0** (Edge Function Supabase + Resend, ou EmailJS).
- ⚠️ Pas de **CSP** ni HSTS (à ajouter au reverse proxy).
- ⚠️ Supabase : "leaked password protection" désactivée (activer HIBP) ; mot de passe admin temporaire à changer.
- ⚠️ Pas d'**ErrorBoundary** ni de **page 404** (route inconnue → page vide).

## 7. Code & architecture — ⚠️ dette modérée

- Styles **inline** massifs (objets `style`) mêlés à Tailwind → incohérent, composants verbeux.
- **Désynchronisation données** : le site public lit encore `src/lib/constants.js` (nécessaire au
  prerender SEO) tandis que le dashboard écrit en base → **les modifs du dashboard n'apparaissent pas
  encore sur le site public**. C'est le principal chantier de finition (voir P1).
- Pas de tests, pas de CI, pas d'analytics.
- Backend sur le projet Supabase **partagé** (Wendooka Digital) → migrer vers un projet dédié quand un
  slot gratuit se libère ou via upgrade.

---

## 8. Proposition d'améliorations (priorisée)

### 🔴 P0 — ✅ FAIT (cette session)
1. ✅ **Notification email des leads** : trigger Postgres `bk_leads_notify` → `pg_net` → API Resend
   → email à booking@barkantedjo.com (clé lue dans Vault). Le trigger ne bloque jamais l'insert ;
   no-op tant que la clé n'est pas définie. **Activation (1 étape) :** voir `DEPLOY.md` §Resend.
2. ✅ **Optimisation images** : WebP (`npm run optimize:images`, **−61 %** : 3,9 Mo → 1,5 Mo) +
   `loading="lazy"` + `decoding="async"` sur les images sous la ligne de flottaison.
3. ✅ **Anti-spam** : honeypot + rejet si envoi < 2,5 s (Contact + newsletter), zéro config.

### 🔴 P0 — reste à faire par toi (hors code)
4. **Variables d'env sur Coolify** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) + **changer le mot de
   passe admin**.
5. **Activer Resend** (clé + domaine) pour que les emails de lead partent — `DEPLOY.md` §Resend.
6. (Option) **Turnstile/hCaptcha** : durcir l'anti-spam au-delà du honeypot (nécessite une vérif serveur,
   ex. via Edge Function de soumission). Le honeypot couvre déjà la majorité des bots.

### 🟠 P1 — 2–3 semaines (croissance)
5. **Site public piloté par la base** : lire `bk_tour_dates`/`bk_videos` depuis Supabase + déclencher
   un rebuild (webhook deploy) à chaque modif pour garder le SEO prerender à jour. Rend le dashboard
   réellement utile sans toucher au code.
6. **Version anglaise (EN)** : la tournée vise le **Nigeria anglophone** mais le site est 100 % FR.
   i18n FR/EN = levier d'audience majeur pour l'Explorer Tour.
7. **Accessibilité** (focus visibles, contrastes), **page 404** + **ErrorBoundary**.
8. **Analytics** (Plausible/GA4) — mesurer trafic & conversions.
9. **Media kit téléchargeable** + **liens billetterie** réels sur les dates.

### 🟢 P2 — backlog
10. Migration vers un **projet Supabase dédié** (séparation propre).
11. Newsletter : email de bienvenue + double opt-in (Brevo/Mailchimp).
12. Self-host des polices, CSP/HSTS, tests + CI, refactor styles (tout Tailwind).

---

## 9. Effort estimé

| Lot | Effort |
|---|---|
| P0 (1→4) | ~2–3 jours |
| P1 (5→9) | ~1 semaine |
| P2 | ~1 semaine |
