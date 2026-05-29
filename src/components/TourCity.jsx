import { MapPin, Ticket } from 'lucide-react'

export default function TourCity({ city, country, date, venue }) {
  return (
    <div className="group flex items-center gap-4 sm:gap-6 p-5 rounded-2xl card-surface">
      {/* Date block */}
      <div
        className="shrink-0 w-16 sm:w-20 text-center py-2 rounded-xl"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.12), rgba(224,36,36,0.12))', border: '1px solid rgba(255,107,0,0.25)' }}
      >
        <span className="font-display text-xl sm:text-2xl text-gradient leading-none block">
          {date.split(' ')[0]}
        </span>
        <span className="font-heading font-bold uppercase text-[10px] tracking-wider" style={{ color: '#FF6B00' }}>
          {date.split(' ')[1]}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl sm:text-2xl leading-none" style={{ color: '#FFFFFF' }}>
          {city}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5" style={{ color: '#6B6B6B' }}>
          <MapPin size={13} />
          <span className="text-xs font-body truncate">{venue} · {country}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        className="shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wide transition-all duration-200 group-hover:scale-105"
        style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#FFFFFF' }}
      >
        <Ticket size={14} />
        <span className="hidden sm:inline">Billets</span>
      </button>
    </div>
  )
}
