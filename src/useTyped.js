import { useEffect, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Teclea `text` carácter a carácter. Con reduced-motion devuelve el texto completo
// de entrada: la accesibilidad no es un modo degradado.
export function useTyped(text, { speed = 46, delay = 220 } = {}) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReduced()) {
      setShown(text)
      setDone(true)
      return
    }

    setShown('')
    setDone(false)
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
  }, [text, speed, delay])

  return [shown, done]
}
