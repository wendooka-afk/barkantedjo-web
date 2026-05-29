import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation'

export default function StatCard({ value, label }) {
  const { ref, isVisible } = useScrollAnimation()
  const animated = useCountUp(value, 2000, isVisible)

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} flex flex-col items-center justify-center py-8 px-4 rounded-2xl card-surface`}
    >
      <span className="font-display text-5xl sm:text-6xl text-gradient leading-none">
        {animated}
      </span>
      <span className="font-heading font-semibold uppercase tracking-widest text-xs mt-3 text-center" style={{ color: '#B8B8B8' }}>
        {label}
      </span>
    </div>
  )
}
