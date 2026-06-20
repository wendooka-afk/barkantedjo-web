# SEO / GEO — Barkantedjo

Objectif : ranker sur Google **et** être cité par les IA (ChatGPT, Perplexity, Gemini, Claude).
Domaine : `https://barkantedjo.com`.

---

## ✅ FAIT (on-page, dans le code)

| Élément | Détail |
|---|---|
| Meta par page | `<title>`, `description`, `canonical`, OG, Twitter — uniques sur les 6 pages (composant `src/components/Seo.jsx`, React 19 head natif) |
| Repli sans JS | `index.html` contient meta + JSON-LD + `<noscript>` (les crawlers IA sans JS voient le contenu) |
| Données structurées | `Person` (Mohamad Ali), `WebSite`, `Organization`, `ProfilePage`, `Event` ×5 (tournée), `VideoObject`, `BreadcrumbList`, `FAQPage`, `ContactPage` |
| `robots.txt` | Autorise explicitement GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc. |
| `sitemap.xml` | 6 URLs |
| `llms.txt` + `llms-full.txt` | Fiche entité complète pour les moteurs IA (GEO) |
| `site.webmanifest`, `_headers` | PWA + en-têtes sécurité/cache |
| `og-image.jpg` | Image de partage social |
| **Pré-rendu par route** | Plugin `seoPrerender` dans `vite.config.js` → écrit `dist/<route>/index.html` avec le `<head>` propre à chaque page. **Chaque route a SA meta description / title / canonical / JSON-LD dans le HTML source** (visible sans JS, view-source, crawlers IA). |

**Source de vérité unique** : `src/lib/seo.js` → `ROUTE_SEO` (consommé par le composant `Seo`
côté client ET par le pré-rendu au build). `index.html` = gabarit (bloc `<!-- SEO:START/END -->`
régénéré par route). Côté client, `main.jsx` retire les balises statiques et `Seo` reprend la main
(aucun doublon — vérifié : 1 seule description/canonical par route).

### ⚠️ À finaliser dans le code
- [ ] **`public/og-image.jpg`** : actuellement une photo portrait. La remplacer par une vraie carte
  **1200×630 px** (portrait + nom + logo) pour un meilleur rendu des partages.
- [ ] Confirmer le **téléphone booking** (`Contact.jsx` = placeholder `+237 XXX`) → mettre le vrai numéro.

> Note hébergement : le pré-rendu suppose que le host sert le fichier de dossier
> (`/about` → `/about/index.html`) avant le repli SPA. OK sur Coolify/Nginx (`try_files $uri $uri/ /index.html`),
> Cloudflare Pages et Netlify. `vite preview` (dev) renvoie toujours l'accueil — c'est normal, pas le comportement prod.

---

## 🔗 OFF-PAGE — à exécuter (hors code, J+0 → J+3)

### 1. Indexation immédiate (J+0)
- [ ] **Google Search Console** : ajouter la propriété `barkantedjo.com`, vérifier, **soumettre le sitemap**
  (`https://barkantedjo.com/sitemap.xml`), puis « Inspection d'URL » → Demander l'indexation des 6 pages.
- [ ] **Bing Webmaster Tools** : ajouter le site + sitemap (Bing alimente ChatGPT/Copilot).
- [ ] Tester le rendu : [Rich Results Test](https://search.google.com/test/rich-results) sur chaque URL.

### 2. Entité & citations (le levier GEO n°1)
Les IA citent les entités **cohérentes et corroborées sur plusieurs sources**. Faire correspondre
partout le même bloc : *Barkantedjo / Mohamad Ali / humoriste camerounais / Ngaoundéré / lien site*.
- [ ] **Wikidata** : créer un élément « Barkantedjo (Mohamad Ali) », occupation = humoriste, pays =
  Cameroun, comptes TikTok/YouTube/Facebook, site officiel. (Gratuit, très lu par les IA.)
- [ ] **Google Knowledge Panel** : revendiquer via une entité claim après la création Wikidata + presse.
- [ ] **Bios réseaux** : mettre `barkantedjo.com` en lien dans TikTok, YouTube (À propos), Facebook,
  Instagram — avec la même formulation que le site.
- [ ] **IMDb / AfricaComedy / annuaires d'artistes** : fiche avec le lien site.

### 3. Backlinks (autorité)
- [ ] Communiqué de presse « Explorer Tour Nigeria 2026 » → médias camerounais/nigérians
  (Vision 4, Sweet FM, presse en ligne) avec lien vers `/explorer-tour`.
- [ ] Pages partenaires (Savana, Orange, TATITECH) : demander un lien retour vers le site.
- [ ] Articles invités / interviews (podcasts, blogs humour & culture africaine) avec backlink.
- [ ] Référencer la billetterie (quand l'URL est confirmée) ↔ lien croisé avec `/explorer-tour`.

### 4. Profil Google Business / lieux
- [ ] Si pertinence locale (Ngaoundéré/Douala) : fiche établissement « artiste/humoriste » liée au site.

---

## 🤖 GEO — être cité par les IA

1. **`llms.txt`** (fait) : la fiche de référence que les moteurs IA lisent en priorité.
2. **FAQ structurées** (fait) : « Qui est Barkantedjo ? », « Que signifie le nom ? », dates de tournée —
   formulées en réponses directes que les IA peuvent citer mot pour mot.
3. **Corroboration** : Wikidata + bios réseaux + presse = l'IA recoupe et gagne en confiance.
4. **Fraîcheur** : mettre à jour `sitemap.xml` (`lastmod`) et `llms.txt` à chaque nouvelle date/vidéo.
5. **Vérification** : après indexation, demander à ChatGPT/Perplexity « Qui est Barkantedjo ? » et
   corriger les écarts en renforçant la source la plus citée.

---

## 📅 Plan 3 jours

- **J0** : déployer le site ; Search Console + Bing + sitemap ; demander indexation ; Rich Results Test.
- **J1** : Wikidata ; harmoniser toutes les bios réseaux ; lancer le communiqué de presse.
- **J2** : backlinks partenaires + annuaires ; remplacer `og-image.jpg` 1200×630 ; vraie ligne téléphone.
- **J3** : vérifier l'indexation (`site:barkantedjo.com`), tester les réponses des IA, ajuster.
