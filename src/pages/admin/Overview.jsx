import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    ;(async () => {
      const counts = async (table, filter) => {
        let q = supabase.from(table).select('*', { count: 'exact', head: true })
        if (filter) q = filter(q)
        const { count } = await q
        return count || 0
      }
      const [leads, nouveaux, news, tour, videos] = await Promise.all([
        counts('bk_leads'),
        counts('bk_leads', (q) => q.eq('status', 'nouveau')),
        counts('bk_newsletter'),
        counts('bk_tour_dates'),
        counts('bk_videos'),
      ])
      setStats({ leads, nouveaux, news, tour, videos })
      const { data } = await supabase
        .from('bk_leads')
        .select('id,nom,type,created_at,status')
        .order('created_at', { ascending: false })
        .limit(5)
      setRecent(data || [])
    })()
  }, [])

  const cards = stats
    ? [
        { label: 'Demandes', value: stats.leads, sub: `${stats.nouveaux} nouvelles`, to: '/admin/leads' },
        { label: 'Newsletter', value: stats.news, sub: 'inscrits', to: '/admin/newsletter' },
        { label: 'Dates tournée', value: stats.tour, sub: 'programmées', to: '/admin/tour' },
        { label: 'Vidéos', value: stats.videos, sub: 'publiées', to: '/admin/videos' },
      ]
    : []

  return (
    <div>
      <h1 style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 32, marginBottom: 24 }}>Vue d’ensemble</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
        {cards.map((c) => (
          <Link key={c.label} to={c.to} style={{ textDecoration: 'none' }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontFamily: 'Anton, sans-serif', color: C.orange, fontSize: 36, lineHeight: 1 }}>{c.value}</div>
              <div style={{ color: C.white, fontWeight: 600, fontSize: 14, marginTop: 8 }}>{c.label}</div>
              <div style={{ color: C.dim, fontSize: 12, marginTop: 2 }}>{c.sub}</div>
            </div>
          </Link>
        ))}
        {!stats && <p style={{ color: C.muted }}>Chargement…</p>}
      </div>

      <h2 style={{ color: C.white, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Dernières demandes</h2>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
        {recent.length === 0 && <p style={{ color: C.dim, padding: 16, fontSize: 14 }}>Aucune demande pour l’instant.</p>}
        {recent.map((r) => (
          <Link key={r.id} to="/admin/leads" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: `1px solid ${C.border}`, textDecoration: 'none' }}>
            <span style={{ color: C.white, fontSize: 14 }}>{r.nom} <span style={{ color: C.dim }}>· {r.type || '—'}</span></span>
            <span style={{ color: C.dim, fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
