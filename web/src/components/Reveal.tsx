import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

interface RevealProps extends PropsWithChildren {
  delayMs?: number
}

export function Reveal({ children, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delayMs)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [delayMs])

  return (
    <div
      ref={ref}
      className={
        'transition-all duration-700 will-change-transform ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
      }
    >
      {children}
    </div>
  )
}


