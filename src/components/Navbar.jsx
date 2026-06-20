import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Ferme le menu mobile à chaque changement de route
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [location])

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-wide" style={{ color: '#FFFFFF' }}>
            BARKANTEDJO
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => {
              const active = location.pathname === l.path
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  className="font-heading font-semibold text-sm transition-colors duration-200 relative"
                  style={{ color: active ? '#B4E701' : '#FFFFFF' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B4E701')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? '#B4E701' : '#FFFFFF')}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link
              to="/contact"
              className="font-heading font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-lg bg-gradient-fire transition-transform duration-200 hover:scale-105"
              style={{ color: '#0A0A0A' }}
            >
              Me Booker
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            style={{ color: '#FFFFFF' }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,10,10,0.7)' }} onClick={() => setOpen(false)} />
        <div
          className="absolute top-0 right-0 h-full w-[280px] pt-24 px-8 flex flex-col gap-2"
          style={{
            backgroundColor: '#161616',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(.16,1,.3,1)',
          }}
        >
          {NAV_LINKS.map((l) => {
            const active = location.pathname === l.path
            return (
              <Link
                key={l.path}
                to={l.path}
                className="font-heading font-semibold text-lg py-3"
                style={{ color: active ? '#B4E701' : '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            className="mt-6 text-center font-heading font-bold uppercase tracking-wide py-3.5 rounded-lg bg-gradient-fire"
            style={{ color: '#0A0A0A' }}
          >
            Me Booker
          </Link>
        </div>
      </div>
    </>
  )
}
