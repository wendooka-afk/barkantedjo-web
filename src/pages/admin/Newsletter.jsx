import { useEffect, useState } from 'react'
import { Trash2, Download } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

export default function Newsletter() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('bk_newsletter').select('*').order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!confirm('Retirer cet inscrit ?')) return
    setRows((r) => r.filter((x) => x.id !== id))
    await supabase.from('bk_newsletter').delete().eq('id', id)
  }

  const exportCsv = () => {
    const csv = ['email,date,source', ...rows.map((r) => `${r.email},${new Date(r.created_at).toISOString()},${r.source || ''}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `barkantedjo-newsletter-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 10 }}>
        <h1 style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 32 }}>Newsletter</h1>
        <button onClick={exportCsv} disabled={!rows.length} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${C.border}`, color: C.white, padding: '9px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', opacity: rows.length ? 1 : 0.5 }}>
          <Download size={15} /> Exporter CSV
        </button>
      </div>
      <p style={{ color: C.dim, fontSize: 13, marginBottom: 20 }}>{rows.length} inscrit(s)</p>

      {loading && <p style={{ color: C.muted }}>Chargement…</p>}
      {!loading && rows.length === 0 && <p style={{ color: C.dim }}>Aucun inscrit.</p>}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
        {rows.map((r) => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: `1px solid ${C.border}` }}>
            <span style={{ flex: 1, color: C.white, fontSize: 14 }}>{r.email}</span>
            <span style={{ color: C.dim, fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
            <button onClick={() => remove(r.id)} style={{ background: 'transparent', border: 'none', color: '#FF6B6B', cursor: 'pointer' }} aria-label="Supprimer">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
