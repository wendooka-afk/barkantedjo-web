import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Inbox, Mail, CalendarDays, Clapperboard, LogOut } from 'lucide-react'
import { useAuth } from '../../lib/useAuth'

const NAV = [
  { to: '/admin', label: 'Vue d’ensemble', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Demandes', icon: Inbox },
  { to: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { to: '/admin/tour', label: 'Dates de tournée', icon: CalendarDays },
  { to: '/admin/videos', label: 'Vidéos', icon: Clapperboard },
]

const C = {
  bg: '#0A0A0A',
  panel: '#161616',
  card: '#1C1C1C',
  border: 'rgba(255,255,255,0.08)',
  orange: '#FF6B00',
  white: '#FFFFFF',
  muted: '#B8B8B8',
  dim: '#6B6B6B',
}

export default function AdminShell() {
  const { session, isAdmin, loading, available, signOut } = useAuth()
  const navigate = useNavigate()

  if (!available)
    return (
      <Centered>
        <p style={{ color: C.muted }}>
          Supabase non configuré. Renseigne <code>.env</code> (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
        </p>
      </Centered>
    )
  if (loading) return <Centered><p style={{ color: C.muted }}>Chargement…</p></Centered>
  if (!session) return <Navigate to="/admin/login" replace />
  if (!isAdmin)
    return (
      <Centered>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: C.white, marginBottom: 12 }}>Accès non autorisé pour ce compte.</p>
          <button onClick={() => signOut()} style={btn}>Se déconnecter</button>
        </div>
      </Centered>
    )

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: C.panel,
          borderRight: `1px solid ${C.border}`,
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 22, letterSpacing: 1, marginBottom: 4 }}>
          BARKANTEDJO
        </div>
        <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 28 }}>
          Dashboard
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 14,
                textDecoration: 'none',
                color: isActive ? C.white : C.muted,
                background: isActive ? 'rgba(255,107,0,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(255,107,0,0.3)' : '1px solid transparent',
              })}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={async () => { await signOut(); navigate('/admin/login') }}
          style={{ ...btn, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}
        >
          <LogOut size={15} /> Déconnexion
        </button>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '32px 28px', maxWidth: 1100 }}>
        <Outlet />
      </main>
    </div>
  )
}

function Centered({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {children}
    </div>
  )
}

const btn = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#fff',
  padding: '9px 14px',
  borderRadius: 8,
  fontSize: 13,
  cursor: 'pointer',
}

export { C as ADMIN_COLORS }
