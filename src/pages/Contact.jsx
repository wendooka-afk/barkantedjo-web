import { useState } from 'react'
import { Send, Mail, Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import HeroLayered from '../components/HeroLayered'
import { TikTokIcon, YouTubeIcon, FacebookIcon } from '../components/BrandIcons'
import Seo from '../components/Seo'
import { ROUTE_SEO } from '../lib/seo'
import { GRADIENT, GRADIENT_SOFT, COLORS, HERO, SOCIALS, BRAND } from '../lib/constants'

const CONTACT_TYPES = ['Booking', 'Partenariat', 'Media', 'Explorer Tour', 'Autre']

const INFO_CARDS = [
  {
    icon: Mail,
    label: 'Email booking',
    value: 'booking@barkantedjo.com',
    href: 'mailto:booking@barkantedjo.com',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+237 XXX XXX XXX',
    href: 'tel:+237XXXXXXXXX',
  },
  {
    icon: Clock,
    label: 'Délai de réponse',
    value: 'Sous 48h ouvrées',
    href: null,
  },
]

const SOCIAL_LINKS = [
  {
    icon: TikTokIcon,
    label: 'TikTok',
    handle: '@barkantedjo0',
    href: SOCIALS.tiktok,
    color: '#FFFFFF',
  },
  {
    icon: YouTubeIcon,
    label: 'YouTube',
    handle: '@barkantedjo',
    href: SOCIALS.youtube,
    color: '#FF0000',
  },
  {
    icon: FacebookIcon,
    label: 'Facebook',
    handle: 'barkantedjo',
    href: SOCIALS.facebook,
    color: '#1877F2',
  },
]

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
        {required && (
          <span style={{ color: COLORS.orange, marginLeft: '3px' }}>*</span>
        )}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    type: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const focusBorder = (e) => (e.target.style.borderColor = COLORS.orange)
  const blurBorder = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')

  return (
    <main style={{ backgroundColor: COLORS.black, minHeight: '100vh' }}>
      <Seo path="/contact" {...ROUTE_SEO['/contact']} />

      {/* ── HERO ── */}
      <HeroLayered
        bgText={HERO.contact.bgText}
        punchline={HERO.contact.punchline}
        sub={HERO.contact.sub}
        portrait={HERO.contact.portrait}
        compact
      />

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* ── COLONNE INFO (1/3) ── */}
          <aside>
            <Reveal>
              <h2
                style={{
                  fontFamily: '"Archivo", sans-serif',
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: COLORS.textMuted,
                  marginBottom: '24px',
                }}
              >
                Nous contacter
              </h2>
            </Reveal>

            {/* Cartes coordonnées */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {INFO_CARDS.map(({ icon: Icon, label, value, href }, i) => {
                const content = (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      backgroundColor: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '12px',
                      padding: '16px',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
                  >
                    {/* Pastille dégradé */}
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: GRADIENT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 6px 20px rgba(255,107,0,0.25)',
                      }}
                    >
                      <Icon size={17} color="#fff" />
                    </div>

                    <div>
                      <p
                        style={{
                          fontFamily: '"Archivo", sans-serif',
                          fontWeight: 700,
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: COLORS.textDim,
                          marginBottom: '3px',
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: '14px',
                          color: COLORS.white,
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                )

                return (
                  <Reveal key={label} delay={i * 80}>
                    {href ? (
                      <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                )
              })}
            </div>

            {/* ── Bloc Types de demandes ── */}
            <Reveal delay={280}>
              <div
                style={{
                  background: GRADIENT_SOFT,
                  border: '1px solid rgba(255,107,0,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Archivo", sans-serif',
                    fontWeight: 800,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: COLORS.orange,
                    marginBottom: '14px',
                  }}
                >
                  Types de demandes
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {CONTACT_TYPES.map((t) => (
                    <li
                      key={t}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: COLORS.textMuted,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      <ArrowRight size={13} color={COLORS.orange} style={{ flexShrink: 0 }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ── Bloc Suivre Barkantedjo ── */}
            <Reveal delay={360}>
              <div
                style={{
                  backgroundColor: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Archivo", sans-serif',
                    fontWeight: 800,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: COLORS.orange,
                    marginBottom: '6px',
                  }}
                >
                  Suivre {BRAND.name}
                </p>
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    color: COLORS.textDim,
                    marginBottom: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  Rejoins {BRAND.community} — {BRAND.meaning}, partout en direct.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,107,0,0.35)'
                        e.currentTarget.style.backgroundColor = 'rgba(255,107,0,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} color={color} />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: '"Archivo", sans-serif',
                            fontWeight: 700,
                            fontSize: '12px',
                            color: COLORS.white,
                            lineHeight: 1,
                            marginBottom: '2px',
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '11px',
                            color: COLORS.textDim,
                          }}
                        >
                          {handle}
                        </p>
                      </div>
                      <ArrowRight size={13} color={COLORS.textDim} style={{ marginLeft: 'auto', flexShrink: 0 }} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>

          {/* ── COLONNE FORM (2/3) ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              /* ── ÉTAT SUCCÈS ── */
              <Reveal>
                <div
                  className="card-surface rounded-2xl flex flex-col items-center justify-center text-center"
                  style={{
                    padding: '64px 40px',
                    minHeight: '420px',
                  }}
                >
                  {/* Icône succès */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: GRADIENT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '28px',
                      boxShadow: '0 16px 48px rgba(255,107,0,0.3)',
                    }}
                  >
                    <CheckCircle size={40} color="#fff" />
                  </div>

                  <h2
                    className="font-display text-4xl sm:text-5xl mb-4"
                    style={{ color: COLORS.white }}
                  >
                    Demande envoyée !
                  </h2>

                  <p
                    style={{
                      color: COLORS.textMuted,
                      fontSize: '16px',
                      lineHeight: '1.7',
                      maxWidth: '420px',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Merci pour ton message. L'équipe de{' '}
                    <strong style={{ color: COLORS.white }}>
                      {BRAND.name}, {BRAND.meaning}
                    </strong>
                    , te contactera{' '}
                    <strong style={{ color: COLORS.white }}>sous 48h ouvrées</strong>{' '}
                    pour donner suite à ta demande.{' '}
                    Bienvenue parmi les{' '}
                    <span style={{ color: COLORS.orange, fontWeight: 600 }}>
                      {BRAND.community}
                    </span>
                    .
                  </p>
                </div>
              </Reveal>
            ) : (
              /* ── FORMULAIRE ── */
              <Reveal>
                <form
                  onSubmit={handleSubmit}
                  className="card-surface rounded-2xl"
                  style={{ padding: '32px' }}
                >
                  {/* Intro copy */}
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '14px',
                      color: COLORS.textMuted,
                      marginBottom: '28px',
                      lineHeight: '1.6',
                    }}
                  >
                    Un projet à la hauteur de ton ambition ?{' '}
                    <strong style={{ color: COLORS.white }}>
                      {BRAND.name} — {BRAND.meaning}
                    </strong>{' '}
                    — répond personnellement à chaque demande sérieuse.
                    Spectacle, festival, partenariat de marque, média : dis-nous tout.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    {/* Nom */}
                    <Field label="Nom" required>
                      <input
                        type="text"
                        name="nom"
                        required
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        style={inputBase}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>

                    {/* Email */}
                    <Field label="Email" required>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        style={inputBase}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>

                    {/* Téléphone */}
                    <Field label="Téléphone">
                      <input
                        type="tel"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="+237 XXX XXX XXX"
                        style={inputBase}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>

                    {/* Type de demande */}
                    <Field label="Type de demande" required>
                      <select
                        name="type"
                        required
                        value={form.type}
                        onChange={handleChange}
                        style={{
                          ...inputBase,
                          backgroundColor: COLORS.cardHover,
                          color: form.type ? COLORS.white : 'rgba(255,255,255,0.35)',
                          appearance: 'none',
                          cursor: 'pointer',
                        }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      >
                        <option value="" disabled style={{ color: '#888', backgroundColor: COLORS.card }}>
                          Sélectionner...
                        </option>
                        {CONTACT_TYPES.map((t) => (
                          <option key={t} value={t} style={{ backgroundColor: COLORS.card, color: COLORS.white }}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Budget */}
                  <div style={{ marginBottom: '20px' }}>
                    <Field label="Budget estimatif">
                      <input
                        type="text"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="ex: 500 000 FCFA, À négocier..."
                        style={inputBase}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '28px' }}>
                    <Field label="Message" required>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet, événement ou demande..."
                        style={{ ...inputBase, resize: 'vertical' }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </Field>
                  </div>

                  {/* Submit */}
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
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: '2.5px solid rgba(0,0,0,0.3)',
                            borderTopColor: '#000',
                            display: 'inline-block',
                            animation: 'spin 0.7s linear infinite',
                          }}
                        />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer ma demande'
                    )}
                  </Button>

                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '12px',
                      marginTop: '14px',
                      color: COLORS.textDim,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Réponse garantie sous 48h ouvrées — Confidentialité assurée
                  </p>
                </form>
              </Reveal>
            )}
          </div>

        </div>
      </section>

      {/* Spinner keyframe (inline fallback) */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  )
}
