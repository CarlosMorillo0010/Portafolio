import { describe, it, expect } from 'vitest'
import { validate } from './validation.js'

const valid = { name: 'Ana', email: 'ana@example.com', message: 'Hola, quiero hablar de un proyecto.' }

describe('validate', () => {
  it('no devuelve errores con un formulario completo y correcto', () => {
    expect(validate(valid)).toEqual({})
  })

  it('rechaza un nombre que solo tiene espacios', () => {
    expect(validate({ ...valid, name: ' ' }).name).toBeTruthy()
  })

  it('rechaza un nombre por debajo del mínimo de caracteres', () => {
    expect(validate({ ...valid, name: 'A' }).name).toBeTruthy()
  })

  it('rechaza un correo sin dominio de primer nivel', () => {
    expect(validate({ ...valid, email: 'ana@example' }).email).toBeTruthy()
  })

  it('rechaza un correo sin arroba', () => {
    expect(validate({ ...valid, email: 'ana example.com' }).email).toBeTruthy()
  })

  it('rechaza un mensaje por debajo del mínimo de caracteres', () => {
    expect(validate({ ...valid, message: 'corto' }).message).toBeTruthy()
  })

  it('rechaza un mensaje que supera el máximo de caracteres', () => {
    expect(validate({ ...valid, message: 'x'.repeat(1001) }).message).toBeTruthy()
  })
})
