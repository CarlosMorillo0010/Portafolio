import { useEffect, useState } from 'react'
import { profile, sections } from '../data.js'

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#inicio" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <nav className={`navbar__nav${open ? ' navbar__nav--open' : ''}`} aria-label="Principal">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setOpen(false)}>
              {section.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className="icon-button navbar__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Abrir menú de navegación"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
