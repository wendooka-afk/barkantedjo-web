import { useState, useEffect } from 'react'

function diff(target) {
  const total = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    mins: Math.floor((total / 60000) % 60),
    secs: Math.floor((total / 1000) % 60),
  }
}

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ target, dark = false }) {
  const [t, setT] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { v: t.days, l: 'Jours' },
    { v: t.hours, l: 'Heures' },
    { v: t.mins, l: 'Min' },
    { v: t.secs, l: 'Sec' },
  ]

  const numColor = dark ? '#0A0A0A' : '#FFFFFF'
  const labelColor = dark ? '#6B6B6B' : '#6B6B6B'

  return (
    <div className="flex items-stretch gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-stretch gap-3 sm:gap-5">
          <div className="flex flex-col items-center min-w-[54px] sm:min-w-[72px]">
            <span
              className="font-display text-4xl sm:text-6xl leading-none"
              style={{ color: numColor }}
            >
              {pad(u.v)}
            </span>
            <span
              className="font-heading font-semibold uppercase tracking-widest text-[10px] sm:text-xs mt-2"
              style={{ color: labelColor }}
            >
              {u.l}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="font-display text-3xl sm:text-5xl leading-none self-start"
              style={{ color: '#FF6B00' }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
