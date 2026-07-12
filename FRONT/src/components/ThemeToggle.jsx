import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const THEMES = ['agenda', 'agenda-dark']

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'agenda'

    const saved = localStorage.getItem('theme')
    if (saved && THEMES.includes(saved)) return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'agenda-dark' : 'agenda'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'agenda' ? 'agenda-dark' : 'agenda'))
  }

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm" aria-label="Cambiar tema">
      <input type="checkbox" checked={theme === 'agenda-dark'} onChange={toggleTheme} />
      <Sun className="swap-off size-4" />
      <Moon className="swap-on size-4" />
    </label>
  )
}

export default ThemeToggle
