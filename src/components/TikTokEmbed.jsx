import { useEffect } from 'react'

// Embed officiel TikTok (blockquote + script). Affiche la vraie vidéo.
export default function TikTokEmbed({ videoId, url }) {
  useEffect(() => {
    const SRC = 'https://www.tiktok.com/embed.js'
    // recharge le script pour (re)scanner les blockquotes
    const existing = document.querySelector(`script[src="${SRC}"]`)
    if (existing) existing.remove()
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    document.body.appendChild(s)
    return () => { s.remove() }
  }, [videoId])

  return (
    <blockquote
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ maxWidth: '325px', minWidth: '280px', margin: '0 auto' }}
    >
      <section> </section>
    </blockquote>
  )
}
