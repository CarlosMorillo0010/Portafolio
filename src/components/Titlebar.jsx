import { useEffect, useState } from 'react'
import { profile, sections } from '../data.js'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons.jsx'

// Devuelve el id de la última sección cuyo inicio ya pasó bajo la barra.
function resolveActiveSection() {
  const offset = 110
  let active = sections[0].id
  for (const section of sections) {
    const el = document.getElementById(section.id)
    if (el && el.getBoundingClientRect().top <= offset) active = section.id
  }
  return active
}

export default function Titlebar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const onScroll = () => setActive(resolveActiveSection())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const activeLabel = sections.find((s) => s.id === active)?.label ?? ''

  return (
    <header className="titlebar">
      <div className="container titlebar__inner">
        <span className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <p className="titlebar__path">
          <b>
            {profile.user}@{profile.host}
          </b>
          :~/{activeLabel}
        </p>

        <nav
          id="primary-nav"
          className={`titlebar__nav${open ? ' titlebar__nav--open' : ''}`}
          aria-label="Principal"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              className="titlebar__link"
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          type="button"
          className="icon-button titlebar__burger"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
