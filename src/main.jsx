import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Le <head> statique de index.html sert de repli SEO pour les crawlers sans JS.
// Côté client, React (composant Seo) prend la main : on retire les balises
// statiques gérées par page pour éviter tout doublon (canonical, description…).
;[
  'meta[name="description"]',
  'meta[name="keywords"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
].forEach((sel) =>
  document.head.querySelectorAll(sel).forEach((el) => el.remove()),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
