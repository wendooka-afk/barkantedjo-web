import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-heading font-bold text-sm tracking-wide uppercase transition-all duration-200 rounded-lg cursor-pointer'

const sizes = {
  md: 'px-7 py-3.5',
  lg: 'px-9 py-4 text-base',
  sm: 'px-5 py-2.5 text-xs',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon: Icon,
  iconRight = true,
  type,
  className = '',
  ...rest
}) {
  const variants = {
    primary: 'bg-gradient-fire text-black hover:opacity-90 hover:scale-[1.03]',
    outline:
      'text-white hover:scale-[1.03]',
    ghost: 'text-white hover:text-orange',
  }

  const style =
    variant === 'outline'
      ? { border: '1.5px solid rgba(255,255,255,0.25)' }
      : variant === 'primary'
      ? { boxShadow: '0 10px 30px rgba(180,231,1,0.25)' }
      : {}

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      {Icon && !iconRight && <Icon size={size === 'lg' ? 20 : 16} />}
      {children}
      {Icon && iconRight && <Icon size={size === 'lg' ? 20 : 16} />}
    </>
  )

  if (to) return <Link to={to} className={cls} style={style} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} style={style} {...rest}>{inner}</a>
  return <button type={type || 'button'} onClick={onClick} className={cls} style={style} {...rest}>{inner}</button>
}
