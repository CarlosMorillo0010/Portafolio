// Resaltador mínimo para el bloque de código del hero. No pretende ser un
// analizador de JavaScript: cubre el subconjunto que aparece en `profile.snippet`
// y degrada a texto plano ante cualquier cosa que no reconoce.

const KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'import',
  'export',
  'from',
  'new',
  'async',
  'await',
  'if',
  'else',
])

const LITERALS = new Set(['true', 'false', 'null', 'undefined'])

// El orden importa: comentario y cadena van primero para que su contenido no se
// vuelva a analizar, y la propiedad antes que el identificador por el `:` que la
// sigue.
const PATTERNS = [
  ['comment', /^\/\/[^\n]*/],
  ['string', /^(['"`])(?:\\.|(?!\1)[^\\])*\1/],
  ['prop', /^[A-Za-z_$][\w$]*(?=\s*:)/],
  ['number', /^\d+(?:\.\d+)?/],
  ['word', /^[A-Za-z_$][\w$]*/],
  ['punct', /^[{}[\](),.:;=>+\-*/|&!?]+/],
  ['plain', /^\s+/],
]

// Divide `code` en tokens con tipo. La suma de los `text` reconstruye la entrada
// exacta: de eso depende `sliceTokens` para cortar por número de caracteres.
export function tokenize(code) {
  const tokens = []
  let rest = code

  while (rest) {
    let matched = false

    for (const [type, pattern] of PATTERNS) {
      const found = pattern.exec(rest)
      if (!found) continue

      const text = found[0]
      let resolved = type
      if (type === 'word') {
        if (KEYWORDS.has(text)) resolved = 'keyword'
        else if (LITERALS.has(text)) resolved = 'literal'
        else resolved = 'plain'
      }

      tokens.push({ type: resolved, text })
      rest = rest.slice(text.length)
      matched = true
      break
    }

    // Carácter no contemplado: lo emitimos como texto plano en vez de colgar el
    // bucle o descartarlo.
    if (!matched) {
      tokens.push({ type: 'plain', text: rest[0] })
      rest = rest.slice(1)
    }
  }

  return tokens
}

// Devuelve los tokens que caben en los primeros `count` caracteres, recortando
// el token que queda a medias. Es lo que permite teclear sin volver a analizar
// un fragmento sintácticamente roto en cada fotograma.
export function sliceTokens(tokens, count) {
  const visible = []
  let used = 0

  for (const token of tokens) {
    if (used >= count) break

    const room = count - used
    visible.push(room >= token.text.length ? token : { ...token, text: token.text.slice(0, room) })
    used += token.text.length
  }

  return visible
}
