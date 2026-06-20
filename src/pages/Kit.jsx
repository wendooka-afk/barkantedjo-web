import { useState, useRef, useEffect } from 'react'
import { Download, Send, CheckCircle, Users, Eye, Globe, Languages, Check } from 'lucide-react'
import Seo from '../components/Seo'
import { ROUTE_SEO } from '../lib/seo'
import HeroLayered from '../components/HeroLayered'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import { SERVICES, GRADIENT, GRADIENT_SOFT, COLORS, HERO, BRAND } from '../lib/constants'

// ─── Données "Chiffres à impact" ───────────────────────────────────────────
const IMPACT_STATS = [
  { icon: Users, value: '642 000+', label: 'Abonnés', sub: 'TikTok · Facebook · YouTube' },
  { icon: Eye,   value: '100M+',    label: 'Vues cumulées', sub: 'sur l\'ensemble des vidéos' },
]

const AUDIENCES = [
  { flag: '🇨🇲', name: 'Cameroun' },
  { flag: '🇳🇬', name: 'Nigeria' },
  { flag: '🇹🇩', name: 'Tchad' },
  { flag: '🇳🇪', name: 'Niger' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇺🇸', name: 'États-Unis' },
]

const LANGUES = ['Fulfulde', 'Français', 'Anglais', 'Haoussa']

// Lien du PDF média kit — déposer le fichier dans public/media-kit.pdf
const MEDIA_KIT_PDF = '/media-kit.pdf'

const inputBase = {
  backgroundColor: 'transparent',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontFamily: '"Inter", sans-serif',
  outline: 'none',
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  transition: 'border-color 0.2s',
}

function Field({ label, required, children }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: '"Archivo", sans-serif',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: COLORS.textMuted,
          marginBottom: '8px',
        }}
      >
        {label}
        {required && <span style={{ color: COLORS.orange, marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function Kit() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    typeStructure: '',
    budget: '',
    description: '',
    services: [],
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const hpRef = useRef('') // honeypot
  const mountRef = useRef(0)
  useEffect(() => { mountRef.current = Date.now() }, []) // horodatage de montage (anti-spam), hors render

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleService = (title) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(title)
        ? prev.services.filter((s) => s !== title)
        : [...prev.services, title],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.services.length === 0) {
      setError('Sélectionnez au moins un service souhaité.')
      return
    }
    // Anti-spam : honeypot rempli ou envoi < 2,5 s = bot → faux succès, pas d'insert
    if (hpRef.current || Date.now() - mountRef.current < 2500) {
      setSubmitted(true)
      return
    }

    const message = [
      `Structure / Entreprise : ${form.entreprise.trim() || '—'}`,
      `Type de structure : ${form.typeStructure.trim() || '—'}`,
      `Services souhaités : ${form.services.join(', ')}`,
      '',
      'Description du prospect / projet :',
      form.description.trim() || '—',
    ].join('\n')

    setLoading(true)
    try {
      const { supabase, hasSupabase } = await import('../lib/supabase')
      if (!hasSupabase) throw new Error('config')
      const { error: dbError } = await supabase.from('bk_leads').insert({
        nom: form.nom.trim(),
        email: form.email.trim(),
        telephone: form.telephone.trim() || null,
        type: 'Media Kit',
        budget: form.budget.trim() || null,
        message,
      })
      if (dbError) throw dbError
      setSubmitted(true)
    } catch {
      setError("Une erreur est survenue à l'envoi. Réessaie ou écris à booking@barkantedjo.com.")
    } finally {
      setLoading(false)
    }
  }

  const focusBorder = (e) => (e.target.style.borderColor = COLORS.orange)
  const blurBorder = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <Seo path="/kit" {...ROUTE_SEO['/kit']} />

      {/* ── HERO ── */}
      <HeroLayered
        bgText={HERO.kit.bgText}
        punchline={HERO.kit.punchline}
        sub={HERO.kit.sub}
        portrait={HERO.kit.portrait}
      >
        <Button variant="primary" size="lg" href={MEDIA_KIT_PDF} icon={Download} iconRight={false} download>
          Télécharger le kit média
        </Button>
      </HeroLayered>

      {/* ═══ TÉLÉCHARGER LE KIT MÉDIA (PDF) ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.charcoal }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div
              className="rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden"
              style={{
                backgroundColor: COLORS.card,
                border: '1px solid rgba(180,231,1,0.2)',
                boxShadow: '0 0 80px rgba(180,231,1,0.08)',
              }}
            >
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]"
                style={{ background: GRADIENT }}
              />
              <div className="relative z-10">
                <div
                  className="mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: GRADIENT, boxShadow: '0 12px 36px rgba(180,231,1,0.3)' }}
                >
                  <Download size={28} color="#0A0A0A" />
                </div>
                <p className="eyebrow mb-4">Portfolio & Media Kit</p>
                <h2
                  className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase leading-[0.95] mb-5"
                  style={{ color: COLORS.white }}
                >
                  Le kit média{' '}
                  <span className="text-gradient">professionnel</span>
                </h2>
                <p
                  className="font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
                  style={{ color: COLORS.textMuted }}
                >
                  Audience, statistiques, formats, tarifs et études de cas — tout ce qu'une marque
                  doit savoir sur {BRAND.name}, « {BRAND.meaning} », réuni dans un document PDF.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="primary" size="lg" href={MEDIA_KIT_PDF} icon={Download} iconRight={false} download>
                    Télécharger le PDF
                  </Button>
                  <Button variant="outline" size="lg" href="#travaillons">
                    Travaillons ensemble
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CHIFFRES À IMPACT ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.black }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Chiffres à impact"
              title={<>Une audience qui{' '}<span className="text-gradient">pèse</span></>}
              subtitle="Une communauté massive, multilingue et transfrontalière. Des chiffres qui font de chaque collaboration un levier de portée continentale."
              align="center"
            />
          </Reveal>

          {/* Stats clés */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {IMPACT_STATS.map(({ icon: Icon, value, label, sub }, i) => (
              <Reveal key={label} delay={i * 90}>
                <div
                  className="card-surface rounded-2xl p-8 text-center flex flex-col items-center gap-2"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: 'rgba(180,231,1,0.12)', border: '1px solid rgba(180,231,1,0.25)' }}
                  >
                    <Icon size={24} style={{ color: COLORS.orange }} />
                  </div>
                  <span className="font-display text-4xl sm:text-5xl text-gradient leading-none">
                    {value}
                  </span>
                  <span className="font-heading font-bold text-sm mt-1" style={{ color: COLORS.white }}>
                    {label}
                  </span>
                  <span className="font-body text-xs" style={{ color: COLORS.textDim }}>
                    {sub}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Audiences géographiques + Langues */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Audiences */}
            <Reveal delay={120}>
              <div
                className="rounded-2xl p-8 h-full"
                style={{ background: GRADIENT_SOFT, border: '1px solid rgba(180,231,1,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={20} style={{ color: COLORS.orange }} />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-widest" style={{ color: COLORS.white }}>
                    Audiences géographiques
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AUDIENCES.map(({ flag, name }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span style={{ fontSize: '20px', lineHeight: 1 }}>{flag}</span>
                      <span className="font-body text-sm" style={{ color: COLORS.white }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Langues */}
            <Reveal delay={200}>
              <div
                className="card-surface rounded-2xl p-8 h-full"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Languages size={20} style={{ color: COLORS.orange }} />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-widest" style={{ color: COLORS.white }}>
                    Langues parlées
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {LANGUES.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 rounded-full font-heading font-bold text-sm"
                      style={{ background: 'rgba(180,231,1,0.12)', color: COLORS.orange, border: '1px solid rgba(180,231,1,0.3)' }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed mt-6" style={{ color: COLORS.textMuted }}>
                  Du Fulfulde du Sahel au français et à l'anglais — un humour qui franchit les frontières
                  linguistiques et touche toute l'Afrique de l'Ouest et centrale.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TRAVAILLONS ENSEMBLE (formulaire) ═══ */}
      <section id="travaillons" className="py-20 md:py-28" style={{ backgroundColor: COLORS.charcoal }}>
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Travaillons ensemble"
              title={<>Lance ton projet<br /><span className="text-gradient">avec le béni</span></>}
              subtitle="Choisis les services qui t'intéressent, présente ta structure — l'équipe te répond sous 48h ouvrées."
              align="center"
            />
          </Reveal>

          <div className="mt-12">
            {submitted ? (
              /* ── ÉTAT SUCCÈS ── */
              <Reveal>
                <div
                  className="card-surface rounded-2xl flex flex-col items-center justify-center text-center"
                  style={{ padding: '64px 40px', minHeight: '360px' }}
                >
                  <div
                    style={{
                      width: '80px', height: '80px', borderRadius: '50%', background: GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '28px', boxShadow: '0 16px 48px rgba(180,231,1,0.3)',
                    }}
                  >
                    <CheckCircle size={40} color="#0A0A0A" />
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: COLORS.white }}>
                    Demande envoyée !
                  </h2>
                  <p
                    className="font-body"
                    style={{ color: COLORS.textMuted, fontSize: '16px', lineHeight: '1.7', maxWidth: '420px' }}
                  >
                    Merci. L'équipe de <strong style={{ color: COLORS.white }}>{BRAND.name}</strong> te
                    contactera <strong style={{ color: COLORS.white }}>sous 48h ouvrées</strong> pour
                    construire la collaboration. Bienvenue parmi les{' '}
                    <span style={{ color: COLORS.orange, fontWeight: 600 }}>{BRAND.community}</span>.
                  </p>
                </div>
              </Reveal>
            ) : (
              /* ── FORMULAIRE ── */
              <Reveal>
                <form onSubmit={handleSubmit} className="card-surface rounded-2xl" style={{ padding: '32px' }}>
                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    onChange={(e) => (hpRef.current = e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />

                  {/* ── Services souhaités (multi-sélection) ── */}
                  <p
                    style={{
                      fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: '10px',
                      letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.textMuted, marginBottom: '12px',
                    }}
                  >
                    Services souhaités <span style={{ color: COLORS.orange }}>*</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                    {SERVICES.map((s) => {
                      const active = form.services.includes(s.title)
                      return (
                        <button
                          type="button"
                          key={s.title}
                          onClick={() => toggleService(s.title)}
                          aria-pressed={active}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                          style={{
                            backgroundColor: active ? 'rgba(180,231,1,0.10)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${active ? 'rgba(180,231,1,0.5)' : 'rgba(255,255,255,0.1)'}`,
                            cursor: 'pointer',
                          }}
                        >
                          <span
                            className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                            style={{
                              background: active ? GRADIENT : 'transparent',
                              border: active ? 'none' : '1px solid rgba(255,255,255,0.25)',
                            }}
                          >
                            {active && <Check size={13} color="#0A0A0A" strokeWidth={3} />}
                          </span>
                          <span
                            className="font-heading text-sm font-semibold"
                            style={{ color: active ? COLORS.white : COLORS.textMuted }}
                          >
                            {s.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* ── Coordonnées + structure ── */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <Field label="Nom du contact" required>
                      <input type="text" name="nom" required value={form.nom} onChange={handleChange}
                        placeholder="Votre nom complet" style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                    <Field label="Email" required>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="votre@email.com" style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                    <Field label="Téléphone">
                      <input type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                        placeholder="+237 XXX XXX XXX" style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                    <Field label="Structure / Entreprise" required>
                      <input type="text" name="entreprise" required value={form.entreprise} onChange={handleChange}
                        placeholder="Nom de votre structure" style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                    <Field label="Type de structure">
                      <input type="text" name="typeStructure" value={form.typeStructure} onChange={handleChange}
                        placeholder="Marque, agence, ONG, média..." style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                    <Field label="Budget estimatif">
                      <input type="text" name="budget" value={form.budget} onChange={handleChange}
                        placeholder="ex: 1 000 000 FCFA, à négocier..." style={inputBase} onFocus={focusBorder} onBlur={blurBorder} />
                    </Field>
                  </div>

                  {/* Description du prospect */}
                  <div style={{ marginBottom: '28px' }}>
                    <Field label="Présentez votre structure & votre projet" required>
                      <textarea
                        name="description"
                        required
                        rows={5}
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Qui êtes-vous, quel est votre secteur, votre objectif, vos délais..."
                        style={{ ...inputBase, resize: 'vertical' }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>
                  </div>

                  {error && (
                    <p role="alert" className="font-body" style={{ color: '#FF6B6B', fontSize: '13px', marginBottom: '14px' }}>
                      {error}
                    </p>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    icon={loading ? undefined : Send}
                    className="w-full"
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '18px', height: '18px', borderRadius: '50%',
                            border: '2.5px solid rgba(0,0,0,0.3)', borderTopColor: '#000',
                            display: 'inline-block', animation: 'spin 0.7s linear infinite',
                          }}
                        />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer ma demande'
                    )}
                  </Button>

                  <p
                    className="font-body"
                    style={{ textAlign: 'center', fontSize: '12px', marginTop: '14px', color: COLORS.textDim }}
                  >
                    Réponse garantie sous 48h ouvrées — Confidentialité assurée
                  </p>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )
}
