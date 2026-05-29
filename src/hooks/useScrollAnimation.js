import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useCountUp(target, duration = 2000, isVisible = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const numStr = target.replace('K+', '').replace('K', '').replace('+', '')
    const num = parseFloat(numStr)

    let start = 0
    const step = num / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  const isK = target.includes('K')
  const isPlus = target.includes('+')
  return `${count}${isK ? 'K' : ''}${isPlus ? '+' : ''}`
}
