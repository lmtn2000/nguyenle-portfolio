'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextValue {
  isDark: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    darkQuery.addEventListener('change', handler)
    return () => darkQuery.removeEventListener('change', handler)
  }, [])

  const toggleDarkMode = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
