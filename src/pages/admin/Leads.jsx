import { useEffect, useState } from 'react'
import { Trash2, ChevronDown } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

const STATUSES = ['nouveau', 'en cours', 'traité', 'archivé']
const statusColor = { nouveau: '#B4E701', 'en cours': '#7FB800', traité: '#3FB950', archivé: '#6B6B6B' }

export default function Leads() {
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('tous')
  const [open, setOpen] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('bk_leads').select('*').order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const setStatus = async (id, status) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
    await supabase.from('bk_leads').update({ status }).eq('id', id)
  }
  const remove = async (id) => {
    if (!confirm('Supprimer cette demande ?')) return
    setRows((r) => r.filter((x) => x.id !== id))
    await supabase.from('bk_leads').delete().eq('id', id)
  }

  const shown = filter === 'tous' ? rows : rows.filter((r) => r.status === filter)

  return (
    <div>
      <h1 style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 32, marginBottom: 8 }}>Demandes</h1>
      <p style={{ color: C.dim, fontSize: 13, marginBottom: 20 }}>{rows.length} demande(s) au total</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {['tous', ...STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{ ...chip, ...(filter === s ? chipActive : {}) }}>
            {s}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: C.muted }}>Chargement…</p>}
      {!loading && shown.length === 0 && <p style={{ color: C.dim }}>Aucune demande.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map((r) => (
          <div key={r.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }} onClick={() => setOpen(open === r.id ? null : r.id)}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: statusColor[r.status] || C.dim, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.white, fontSize: 14, fontWeight: 600 }}>{r.nom} <span style={{ color: C.dim, fontWeight: 400 }}>· {r.type || '—'}</span></div>
                <div style={{ color: C.dim, fontSize: 12 }}>{r.email}{r.telephone ? ` · ${r.telephone}` : ''}</div>
              </div>
              <span style={{ color: C.dim, fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
              <ChevronDown size={16} color={C.dim} style={{ transform: open === r.id ? 'rotate(180deg)' : 'none' }} />
            </div>
            {open === r.id && (
              <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${C.border}` }}>
                {r.budget && <p style={{ color: C.muted, fontSize: 13, marginTop: 12 }}><b style={{ color: C.white }}>Budget :</b> {r.budget}</p>}
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginTop: 12, whiteSpace: 'pre-wrap' }}>{r.message}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                  <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} style={{ background: C.panel, color: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 10px', fontSize: 13 }}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <a href={`mailto:${r.email}`} style={{ ...chip, textDecoration: 'none', color: C.white }}>Répondre par email</a>
                  <button onClick={() => remove(r.id)} style={{ ...chip, color: '#FF6B6B', display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                    <Trash2 size={13} /> Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const chip = { background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, padding: '7px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize' }
const chipActive = { background: 'rgba(180,231,1,0.14)', borderColor: 'rgba(180,231,1,0.4)', color: '#fff' }
