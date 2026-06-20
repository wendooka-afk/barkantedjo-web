import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo'
import { useAuth } from '../../lib/useAuth'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

export default function Login() {
  const { session, isAdmin, signIn, available } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (session && isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email.trim(), password)
    setLoading(false)
    if (err) return setError('Identifiants invalides.')
    navigate('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Seo title="Admin — Barkantedjo" description="Espace d'administration." path="/admin/login" noindex baseGraph={false} />
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
        <div style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 26, letterSpacing: 1 }}>BARKANTEDJO</div>
        <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>Dashboard</div>

        {!available && (
          <p style={{ color: '#FF6B6B', fontSize: 13, marginBottom: 16 }}>Supabase non configuré (.env manquant).</p>
        )}

        <label style={lbl}>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inp} autoComplete="username" />

        <label style={lbl}>Mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inp} autoComplete="current-password" />

        {error && <p style={{ color: '#FF6B6B', fontSize: 13, margin: '4px 0 12px' }}>{error}</p>}

        <button type="submit" disabled={loading || !available} style={{ width: '100%', background: 'linear-gradient(135deg,#B4E701,#056a2b)', color: '#0A0A0A', fontWeight: 700, border: 'none', padding: '12px', borderRadius: 8, cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

const lbl = { display: 'block', color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }
const inp = { width: '100%', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, color: '#fff', padding: '11px 14px', fontSize: 14, marginBottom: 16, outline: 'none' }
