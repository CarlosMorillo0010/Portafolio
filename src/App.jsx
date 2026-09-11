import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function readStoredTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

export default function App() {
  const [theme, setTheme] = useState(
    () =>
      readStoredTheme() ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // El almacenamiento puede estar bloqueado; el tema sigue aplicándose en memoria.
    }
  }, [theme])

  // Revela los elementos marcados con data-reveal al entrar en pantalla.
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#inicio">
        Saltar al contenido
      </a>
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
