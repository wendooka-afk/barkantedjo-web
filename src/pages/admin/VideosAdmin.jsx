import { useEffect, useState } from 'react'
import { Trash2, Plus, Save, X, Pencil, Star } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ADMIN_COLORS as C } from '../../components/admin/AdminShell'

const EMPTY = { platform: 'tiktok', video_id: '', url: '', title: '', category: 'Sketches Fulfulde', views: '', poster: '', featured: false, sort: 0 }

export default function VideosAdmin() {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(EMPTY)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('bk_videos').select('*').order('sort')
    setRows(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const startNew = () => { setDraft({ ...EMPTY, sort: rows.length + 1 }); setEditing('new') }
  const startEdit = (r) => { setDraft({ ...r }); setEditing(r.id) }
  const cancel = () => { setEditing(null); setDraft(EMPTY) }

  const save = async () => {
    const payload = {
      platform: draft.platform, video_id: draft.video_id.trim() || null, url: draft.url.trim(),
      title: draft.title.trim(), category: draft.category.trim() || null, views: draft.views.trim() || null,
      poster: draft.poster.trim() || null, featured: Boolean(draft.featured), sort: Number(draft.sort) || 0,
    }
    if (!payload.url || !payload.title) return
    if (editing === 'new') await supabase.from('bk_videos').insert(payload)
    else await supabase.from('bk_videos').update(payload).eq('id', editing)
    cancel(); load()
  }
  const remove = async (id) => {
    if (!confirm('Supprimer cette vidéo ?')) return
    await supabase.from('bk_videos').delete().eq('id', id); load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'Anton, sans-serif', color: C.white, fontSize: 32 }}>Vidéos</h1>
        {editing == null && <button onClick={startNew} style={primaryBtn}><Plus size={15} /> Ajouter</button>}
      </div>

      {editing === 'new' && <Editor draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />}
      {loading && <p style={{ color: C.muted }}>Chargement…</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r) =>
          editing === r.id ? (
            <Editor key={r.id} draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />
          ) : (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 16px' }}>
              {r.poster ? <img src={r.poster} alt="" style={{ width: 42, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} /> : null}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.white, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {r.featured && <Star size={13} fill="#FF6B00" color="#FF6B00" />}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
                </div>
                <div style={{ color: C.dim, fontSize: 12 }}>{r.platform} · {r.category || '—'} · {r.views || '—'} vues</div>
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
        <Field label="Plateforme">
          <select style={inp} value={draft.platform} onChange={f('platform')}>
            <option value="tiktok">tiktok</option>
            <option value="youtube">youtube</option>
          </select>
        </Field>
        <Field label="ID vidéo"><input style={inp} value={draft.video_id} onChange={f('video_id')} /></Field>
        <Field label="URL"><input style={inp} value={draft.url} onChange={f('url')} placeholder="https://" /></Field>
        <Field label="Titre"><input style={inp} value={draft.title} onChange={f('title')} /></Field>
        <Field label="Catégorie"><input style={inp} value={draft.category} onChange={f('category')} /></Field>
        <Field label="Vues"><input style={inp} value={draft.views} onChange={f('views')} placeholder="1.2M" /></Field>
        <Field label="Poster (URL/chemin)"><input style={inp} value={draft.poster} onChange={f('poster')} /></Field>
        <Field label="Ordre"><input type="number" style={inp} value={draft.sort} onChange={f('sort')} /></Field>
        <Field label="À la une">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.white, fontSize: 13 }}>
            <input type="checkbox" checked={Boolean(draft.featured)} onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))} /> Featured
          </label>
        </Field>
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
