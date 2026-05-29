import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
