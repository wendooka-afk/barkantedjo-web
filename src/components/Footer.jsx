import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { YouTubeIcon, TikTokIcon, FacebookIcon } from './BrandIcons'
import { NAV_LINKS, SOCIALS } from '../lib/constants'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | ok | err
  const hpRef = useRef('') // honeypot
  const mountRef = useRef(Date.now())

  const subscribe = async (e) => {
    e.preventDefault()
    const value = email.trim()
    if (!value || status === 'loading') return
    // Anti-spam : honeypot ou envoi trop rapide = bot → faux succès
    if (hpRef.current || Date.now() - mountRef.current < 2500) {
      setStatus('ok')
      setEmail('')
      return
    }
    setStatus('loading')
    try {
      const { supabase, hasSupabase } = await import('../lib/supabase')
      if (!hasSupabase) throw new Error('config')
      const { error } = await supabase
        .from('bk_newsletter')
        .insert({ email: value, source: 'footer' })
      // 23505 = email déjà inscrit → on considère ça comme un succès
      if (error && error.code !== '23505') throw error
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="font-display text-3xl tracking-wide" style={{ color: '#FFFFFF' }}>
              BARKANTEDJO
            </Link>
            <p className="font-heading font-bold uppercase tracking-[0.25em] text-xs mt-4 mb-5" style={{ color: '#FF6B00' }}>
              Explorer · Connecter · Impacter
            </p>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#B8B8B8' }}>
              Digital Marketer · Content Creator · Comedian. De Ngaoundéré aux scènes du Nigeria — le béni qui fait rire tout un continent.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: TikTokIcon, label: 'TikTok', href: SOCIALS.tiktok },
                { Icon: YouTubeIcon, label: 'YouTube', href: SOCIALS.youtube },
                { Icon: FacebookIcon, label: 'Facebook', href: SOCIALS.facebook },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold uppercase tracking-widest text-xs mb-5" style={{ color: '#8A8A8A' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm font-heading transition-colors duration-200"
                    style={{ color: '#B8B8B8' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B00')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold uppercase tracking-widest text-xs mb-5" style={{ color: '#8A8A8A' }}>
              Rejoins les Barkantéens
            </h4>
            <p className="text-sm mb-4" style={{ color: '#B8B8B8' }}>
              Dates, vidéos, coulisses. Direct dans ta boîte mail.
            </p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                onChange={(e) => (hpRef.current = e.target.value)}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="flex-1 px-4 py-3 text-sm rounded-lg bg-transparent outline-none"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="S'abonner"
                className="px-4 rounded-lg bg-gradient-fire flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ color: '#0A0A0A', opacity: status === 'loading' ? 0.6 : 1 }}
              >
                <ArrowRight size={20} />
              </button>
            </form>
            {status === 'ok' && (
              <p className="text-xs mt-2" style={{ color: '#FF6B00' }} role="status">
                Bienvenue chez les Barkantéens ! 🎉
              </p>
            )}
            {status === 'err' && (
              <p className="text-xs mt-2" style={{ color: '#FF6B6B' }} role="alert">
                Erreur. Réessaie dans un instant.
              </p>
            )}
          </div>
        </div>

        <div className="divider-fire my-10 opacity-40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#8A8A8A' }}>
            © 2026 Barkantedjo. Tous droits réservés.
          </p>
          <p className="text-xs font-body" style={{ color: '#B8B8B8' }}>
            Conçu avec <span style={{ color: '#E02424' }}>♥</span> par{' '}
            <a
              href="https://wendooka.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            >
              wendooka
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
