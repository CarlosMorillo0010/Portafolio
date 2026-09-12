import { useEffect, useState } from 'react'
import Titlebar from './components/Titlebar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Stack from './components/Stack.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import StatusBar from './components/StatusBar.jsx'

function readStoredTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

export default function App() {
  // El oscuro es el predeterminado; solo una elección guardada lo cambia.
  const [theme, setTheme] = useState(() => readStoredTheme() ?? 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // El almacenamiento puede estar bloqueado; el tema sigue aplicándose en memoria.
    }
  }, [theme])

  // Revela los elementos [data-reveal] al entrar en pantalla. El MutationObserver
  // cubre los que React monta después (por ejemplo, al filtrar proyectos).
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          intersection.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    )

    const observe = (root) => {
      if (root.matches?.('[data-reveal]')) intersection.observe(root)
      root.querySelectorAll?.('[data-reveal]').forEach((el) => intersection.observe(el))
    }

    observe(document.body)

    const mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => node.nodeType === 1 && observe(node))
      }
    })
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersection.disconnect()
      mutation.disconnect()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#inicio">
        Saltar al contenido
      </a>

      <Titlebar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <StatusBar />
    </>
  )
}
