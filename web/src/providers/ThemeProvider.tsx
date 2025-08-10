import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { Theme, ThemeProviderState } from './theme-context'
import { ThemeProviderContext } from './theme-context'

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme
  storageKey?: string
}>

// Keep this file component-only to satisfy react-refresh rule

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem(storageKey) as Theme | null) : null
    return stored ?? defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value: ThemeProviderState = {
    theme,
    setTheme: (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Note: useTheme hook is exported from './useTheme' to satisfy react-refresh rule


