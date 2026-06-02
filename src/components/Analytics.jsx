import { useEffect } from 'react'

// Analytics Plausible — léger, sans cookie. Activé seulement si
// VITE_PLAUSIBLE_DOMAIN est défini (sinon no-op). Compte requis sur plausible.io.
export default function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
    if (!domain) return
    if (document.querySelector('script[data-plausible]')) return
    const s = document.createElement('script')
    s.defer = true
    s.dataset.domain = domain
    s.dataset.plausible = '1'
    s.src = import.meta.env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
  }, [])
  return null
}
