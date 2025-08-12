import { useEffect, useState } from 'react'

// Heuristic to detect on-screen keyboard via Visual Viewport API
// Returns true when the visual viewport height shrinks significantly
export function useKeyboardVisible(thresholdPx: number = 150): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const vv: VisualViewport | undefined = window.visualViewport ?? undefined

    const measure = () => {
      try {
        if (vv) {
          const delta = window.innerHeight - vv.height
          setIsVisible(delta > thresholdPx)
        } else {
          // Fallback: compare window.innerHeight to documentElement.clientHeight
          const delta = window.innerHeight - document.documentElement.clientHeight
          setIsVisible(delta > thresholdPx)
        }
      } catch {
        // noop
      }
    }

    measure()

    if (vv) {
      vv.addEventListener('resize', measure)
      vv.addEventListener('scroll', measure)
    }
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)

    return () => {
      if (vv) {
        vv.removeEventListener('resize', measure)
        vv.removeEventListener('scroll', measure)
      }
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [thresholdPx])

  return isVisible
}


