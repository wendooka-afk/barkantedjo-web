import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('ErrorBoundary:', error, info)
    // En prod : brancher ici un Sentry/log si besoin.
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <p style={{ color: '#FF6B00', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>
          Oups
        </p>
        <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 40, margin: '12px 0' }}>
          Une erreur est survenue
        </h1>
        <p style={{ color: '#B8B8B8', maxWidth: 420, marginBottom: 28 }}>
          Quelque chose s'est mal passé. Recharge la page ou reviens à l'accueil.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => window.location.reload()}
            style={{ background: 'linear-gradient(135deg,#FF6B00,#E02424)', color: '#0A0A0A', fontWeight: 700, border: 'none', padding: '12px 20px', borderRadius: 8, cursor: 'pointer' }}
          >
            Recharger
          </button>
          <a
            href="/"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none' }}
          >
            Accueil
          </a>
        </div>
      </div>
    )
  }
}
