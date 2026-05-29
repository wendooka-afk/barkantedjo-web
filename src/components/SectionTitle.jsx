export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) {
  const textColor = dark ? '#0A0A0A' : '#FFFFFF'
  const subColor = dark ? '#4A4A4A' : '#B8B8B8'
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2
        className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-5"
        style={{ color: textColor }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-body text-base sm:text-lg leading-relaxed"
          style={{ color: subColor }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
