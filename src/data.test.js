import { describe, it, expect } from 'vitest'
import { about, profile, yearsSince } from './data.js'

describe('yearsSince', () => {
  it('cuenta los años transcurridos hasta la fecha dada', () => {
    expect(yearsSince(2014, new Date(2026, 8, 11))).toBe(12)
  })

  // Ojo: new Date('2027-01-01') se parsea como UTC y puede caer en 2026 según la zona.
  it('suma un año solo, sin tocar nada más', () => {
    expect(yearsSince(2014, new Date(2027, 0, 1))).toBe(13)
  })

  it('devuelve 0 cuando el año de inicio es el año actual', () => {
    expect(yearsSince(2026, new Date(2026, 8, 11))).toBe(0)
  })

  it('nunca da negativo con un año futuro', () => {
    expect(yearsSince(2030, new Date(2026, 8, 11))).toBe(0)
  })

  it('devuelve 0 sin argumentos', () => {
    expect(yearsSince(undefined)).toBe(0)
  })

  it('no produce NaN en pantalla cuando recibe una cadena', () => {
    expect(yearsSince('2021')).toBe(0)
  })
})

// El bloque de perfil debe seguir teniendo sus filas con contenido real.
describe('about.facts', () => {
  it('conserva sus cuatro filas', () => {
    expect(about.facts).toHaveLength(4)
  })

  it('no tiene filas incompletas ni NaN filtrado a la UI', () => {
    for (const fact of about.facts) {
      expect(fact.key, `fila incompleta: ${JSON.stringify(fact)}`).toBeTruthy()
      expect(fact.value, `fila incompleta: ${JSON.stringify(fact)}`).toBeTruthy()
      expect(String(fact.value).includes('NaN'), `NaN en ${fact.key}`).toBe(false)
    }
  })

  it('expone la antigüedad como "N años"', () => {
    expect(about.facts[0].value).toMatch(/^\d+ años$/)
  })
})

// El arte ASCII se rompe en silencio: una linea larga desalinea todo el dibujo,
// y un caracter no-ASCII se dibuja distinto segun la fuente del visitante.
describe('profile.asciiAvatar', () => {
  const ANCHO = 25

  it('no puede quedar vacio', () => {
    expect(profile.asciiAvatar.length).toBeGreaterThan(0)
  })

  it('mantiene todas las lineas dentro del ancho fijo', () => {
    for (const [i, l] of profile.asciiAvatar.entries()) {
      expect(l.length, `linea ${i + 1} mide ${l.length}, supera ${ANCHO} columnas`).toBeLessThanOrEqual(ANCHO)
    }
  })

  it('solo usa caracteres ASCII imprimibles', () => {
    for (const [i, l] of profile.asciiAvatar.entries()) {
      for (const ch of l) {
        const code = ch.codePointAt(0)
        expect(
          code >= 32 && code <= 126,
          `linea ${i + 1}: caracter no-ASCII ${JSON.stringify(ch)}`,
        ).toBe(true)
      }
    }
  })
})

// Las etiquetas fallan en silencio: sin ancla horizontal se apilan todas en la
// esquina, y un `tone` inventado deja el cuadrito transparente.
describe('profile.badges', () => {
  const TONOS = ['amber', 'green', 'cyan', 'red']

  it('tiene tecnologias flotantes', () => {
    expect(profile.badges.length).toBeGreaterThan(0)
  })

  it('define texto, tono conocido y un unico ancla horizontal en cada etiqueta', () => {
    for (const b of profile.badges) {
      expect(b.label, 'etiqueta sin texto').toBeTruthy()
      expect(TONOS.includes(b.tone), `tono desconocido en ${b.label}: ${b.tone}`).toBe(true)
      expect(b.top, `${b.label} sin posicion vertical`).toBeTruthy()
      expect(
        Boolean(b.left || b.right),
        `${b.label} sin ancla horizontal: se apilaria en la esquina`,
      ).toBe(true)
      expect(Boolean(b.left && b.right), `${b.label} define left y right a la vez`).toBe(false)
    }
  })
})
