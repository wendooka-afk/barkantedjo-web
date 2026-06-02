import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '70vh',
        background: '#0A0A0A',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px',
      }}
    >
      <Seo
        title="Page introuvable — Barkantedjo"
        description="Cette page n'existe pas."
        path="/404"
        noindex
        baseGraph={false}
      />
      <p className="eyebrow" style={{ marginBottom: 12 }}>Erreur 404</p>
      <h1 className="font-display" style={{ fontSize: 'clamp(64px,14vw,160px)', lineHeight: 0.9, margin: 0 }}>
        4<span className="text-gradient">0</span>4
      </h1>
      <p style={{ color: '#B8B8B8', maxWidth: 440, margin: '20px 0 28px', fontFamily: 'Inter, sans-serif' }}>
        Cette page n'existe pas ou a été déplacée. Le béni t'invite à revenir sur le bon chemin.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ background: 'linear-gradient(135deg,#FF6B00,#E02424)', color: '#0A0A0A', fontWeight: 700, padding: '12px 22px', borderRadius: 8, textDecoration: 'none' }}>
          Retour à l'accueil
        </Link>
        <Link to="/explorer-tour" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 22px', borderRadius: 8, textDecoration: 'none' }}>
          Explorer Tour 2026
        </Link>
      </div>
    </main>
  )
}
