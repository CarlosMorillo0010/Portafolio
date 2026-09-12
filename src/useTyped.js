import { useEffect, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Teclea `text` carácter a carácter. Con reduced-motion devuelve el texto completo
// de entrada: la accesibilidad no es un modo degradado.
export function useTyped(text, { speed = 46, delay = 220 } = {}) {
  const reduced = prefersReduced()
  const [shown, setShown] = useState(() => (reduced ? text : ''))
  const [done, setDone] = useState(reduced)

  // Reinicia al cambiar `text` ajustando el estado durante el render. Hacerlo
  // dentro del effect encadena un render extra por cada reinicio.
  const [lastText, setLastText] = useState(text)
  if (lastText !== text) {
    setLastText(text)
    setShown(reduced ? text : '')
    setDone(reduced)
  }

  useEffect(() => {
    if (reduced) return

    let index = 0
    let timer

    const tick = () => {
      index += 1
      setShown(text.slice(0, index))
      if (index >= text.length) {
        setDone(true)
        return
      }
      timer = setTimeout(tick, speed)
    }

    timer = setTimeout(tick, delay)
    return () => clearTimeout(timer)
  }, [text, speed, delay, reduced])

  return [shown, done]
}
