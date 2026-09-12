import { describe, it, expect } from 'vitest'
import { tokenize, sliceTokens } from './syntax.js'

const typesOf = (code) => tokenize(code).map((t) => t.type)
const joined = (tokens) => tokens.map((t) => t.text).join('')

// Construido con el código de carácter para que no dependa de cuántos niveles de
// escapado sobreviven al editar este archivo.
const BACKSLASH = String.fromCharCode(92)

describe('tokenize', () => {
  // Invariante central: si los tokens no reconstruyen la entrada exacta, el
  // recorte por número de caracteres deja de coincidir con el texto tecleado.
  it('reconstruye la entrada exacta al unir los tokens', () => {
    const code = "const carlos = {\n  stack: ['laravel'],\n  activo: true, // nota\n}"

    expect(joined(tokenize(code))).toBe(code)
  })

  it('distingue palabra clave, propiedad y cadena', () => {
    expect(typesOf("const x = 'hola'")).toEqual([
      'keyword',
      'plain',
      'plain',
      'plain',
      'punct',
      'plain',
      'string',
    ])
  })

  it('marca la propiedad solo cuando la sigue dos puntos', () => {
    expect(tokenize('stack: node').filter((t) => t.type === 'prop')).toHaveLength(1)
  })

  it('trata true y false como literales, no como identificadores', () => {
    expect(typesOf('true')).toEqual(['literal'])
    expect(typesOf('false')).toEqual(['literal'])
  })

  it('reconoce números', () => {
    expect(typesOf('42')).toEqual(['number'])
    expect(typesOf('3.14')).toEqual(['number'])
  })

  it('no analiza el contenido de una cadena', () => {
    expect(typesOf("'const true 42'")).toEqual(['string'])
  })

  it('no analiza el contenido de un comentario', () => {
    expect(typesOf('// const true')).toEqual(['comment'])
  })

  it('respeta las comillas escapadas dentro de una cadena', () => {
    // Equivale al literal 'no\'va': la comilla escapada no debe cerrar la cadena.
    const code = "'no" + BACKSLASH + "'va'"

    expect(typesOf(code)).toEqual(['string'])
    expect(joined(tokenize(code))).toBe(code)
  })

  // Sin esta salida el bucle se colgaría ante cualquier carácter no contemplado.
  it('no se cuelga con caracteres desconocidos', () => {
    const code = 'const ñ = §'

    expect(joined(tokenize(code))).toBe(code)
  })

  it('devuelve una lista vacía con entrada vacía', () => {
    expect(tokenize('')).toEqual([])
  })
})

describe('sliceTokens', () => {
  const tokens = tokenize("const x = 'hola'")

  it('no devuelve nada con cero caracteres', () => {
    expect(sliceTokens(tokens, 0)).toEqual([])
  })

  it('recorta el token que queda a medias', () => {
    expect(joined(sliceTokens(tokens, 3))).toBe('con')
  })

  it('conserva el tipo del token recortado', () => {
    expect(sliceTokens(tokens, 3)[0].type).toBe('keyword')
  })

  it('devuelve el texto completo al pedir todos los caracteres', () => {
    expect(joined(sliceTokens(tokens, 16))).toBe("const x = 'hola'")
  })

  it('no se pasa del final si piden de más', () => {
    expect(joined(sliceTokens(tokens, 999))).toBe("const x = 'hola'")
  })

  it('no muta los tokens de entrada', () => {
    const original = tokenize('const')
    sliceTokens(original, 2)

    expect(original[0].text).toBe('const')
  })
})
