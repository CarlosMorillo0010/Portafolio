import { useMemo } from 'react'
import { useTyped } from '../useTyped.js'
import { tokenize, sliceTokens } from '../syntax.js'

// Más rápido que el tecleo del prompt: a 46 ms por carácter un bloque de código
// tardaría más de seis segundos en salir.
const SPEED = 16
const DELAY = 140

export default function CodeTyper({ code }) {
  const text = code.join('\n')
  // Se analiza el código completo una sola vez. Analizar el prefijo visible en
  // cada fotograma significaría analizar código sintácticamente roto.
  const tokens = useMemo(() => tokenize(text), [text])
  const [typed, done] = useTyped(text, { speed: SPEED, delay: DELAY })
  const visible = sliceTokens(tokens, typed.length)

  return (
    <pre
      className="term__code"
      // Reserva la altura final desde el primer fotograma: sin esto el bloque
      // empuja los botones hacia abajo mientras se teclea.
      style={{ '--code-lines': code.length }}
    >
      <code>
        {visible.map((token, i) => (
          <span key={i} className={`tok tok--${token.type}`}>
            {token.text}
          </span>
        ))}
        {!done && <span className="caret" aria-hidden="true" />}
      </code>
    </pre>
  )
}
