import { useEffect, useState } from 'react'
import { Trash2, Plus, Save, X, Pencil } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

const EMPTY = { city: '', country: 'Nigeria', venue: '', event_date: '', event_time: '19:00', ticket_url: '', status: 'scheduled', sort: 0 }

export default function TourAdmin() {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null) // id or 'new'
  const [draft, setDraft] = useState(EMPTY)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('bk_tour_dates').select('*').order('sort').order('event_date')
    setRows(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const startNew = () => { setDraft({ ...EMPTY, sort: rows.length + 1 }); setEditing('new') }
  const startEdit = (r) => { setDraft({ ...r, event_date: r.event_date || '' }); setEditing(r.id) }
  const cancel = () => { setEditing(null); setDraft(EMPTY) }

  const save = async () => {
    const payload = {
      city: draft.city.trim(), country: draft.country.trim(), venue: draft.venue.trim() || null,
      event_date: draft.event_date || null, event_time: draft.event_time || null,
      ticket_url: draft.ticket_url.trim() || null, status: draft.status, sort: Number(draft.sort) || 0,
    }
    if (!payload.city) return
    if (editing === 'new') await supabase.from('bk_tour_dates').insert(payload)
    else await supabase.from('bk_tour_dates').update(payload).eq('id', editing)
    cancel(); load()
  }
  const remove = async (id) => {
    if (!confirm('Supprimer cette date ?')) return
    await supabase.from('bk_tour_dates').delete().eq('id', id); load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 32 }}>Dates de tournée</h1>
        {editing == null && <button onClick={startNew} style={primaryBtn}><Plus size={15} /> Ajouter</button>}
      </div>

      {editing === 'new' && <Editor draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />}
      {loading && <p style={{ color: C.muted }}>Chargement…</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r) =>
          editing === r.id ? (
            <Editor key={r.id} draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />
          ) : (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.white, fontSize: 15, fontWeight: 600 }}>{r.city}, {r.country}</div>
                <div style={{ color: C.dim, fontSize: 12 }}>{r.venue || '—'} · {r.event_date || 'date ?'} · {r.status}</div>
              </div>
              <button onClick={() => startEdit(r)} style={iconBtn} aria-label="Éditer"><Pencil size={15} /></button>
              <button onClick={() => remove(r.id)} style={{ ...iconBtn, color: '#FF6B6B' }} aria-label="Supprimer"><Trash2 size={15} /></button>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

function Editor({ draft, setDraft, onSave, onCancel }) {
  const f = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }))
  return (
    <div style={{ background: C.panel, border: '1px solid rgba(255,107,0,0.3)', borderRadius: 12, padding: 16, marginBottom: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
        <Field label="Ville"><input style={inp} value={draft.city} onChange={f('city')} /></Field>
        <Field label="Pays"><input style={inp} value={draft.country} onChange={f('country')} /></Field>
        <Field label="Lieu"><input style={inp} value={draft.venue} onChange={f('venue')} /></Field>
        <Field label="Date"><input type="date" style={inp} value={draft.event_date} onChange={f('event_date')} /></Field>
        <Field label="Heure"><input style={inp} value={draft.event_time} onChange={f('event_time')} /></Field>
        <Field label="Lien billetterie"><input style={inp} value={draft.ticket_url} onChange={f('ticket_url')} placeholder="https://" /></Field>
        <Field label="Statut">
          <select style={inp} value={draft.status} onChange={f('status')}>
            <option value="scheduled">scheduled</option>
            <option value="soldout">soldout</option>
            <option value="cancelled">cancelled</option>
          </select>
        </Field>
        <Field label="Ordre"><input type="number" style={inp} value={draft.sort} onChange={f('sort')} /></Field>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button onClick={onSave} style={primaryBtn}><Save size={15} /> Enregistrer</button>
        <button onClick={onCancel} style={iconBtnText}><X size={15} /> Annuler</button>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', color: C.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}

const inp = { width: '100%', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, color: '#fff', padding: '9px 12px', fontSize: 13, outline: 'none' }
const primaryBtn = { display: 'flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#FF6B00,#E02424)', color: '#0A0A0A', fontWeight: 700, border: 'none', padding: '9px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }
const iconBtn = { background: 'transparent', border: `1px solid ${C.border}`, color: C.white, padding: 8, borderRadius: 8, cursor: 'pointer', display: 'flex' }
const iconBtnText = { display: 'flex', alignItems: 'center', gap: 7, background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, padding: '9px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }
