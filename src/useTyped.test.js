// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, cleanup } from '@testing-library/react'
import { useTyped } from './useTyped.js'

// Valores por defecto del hook: el primer carácter aparece a los 220 ms y los
// siguientes cada 46 ms.
const DELAY = 220
const SPEED = 46

// jsdom no implementa matchMedia, así que por defecto prefersReduced() es false.
// Para el caso contrario hay que sustituirlo explícitamente.
function stubReducedMotion(matches) {
  window.matchMedia = vi.fn().mockReturnValue({ matches })
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  delete window.matchMedia
})

describe('useTyped', () => {
  it('empieza vacío y sin terminar', () => {
    const { result } = renderHook(() => useTyped('hola'))

    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(false)
  })

  it('teclea carácter a carácter hasta completar el texto', () => {
    const { result } = renderHook(() => useTyped('hola'))

    act(() => vi.advanceTimersByTime(DELAY))
    expect(result.current[0]).toBe('h')
    expect(result.current[1]).toBe(false)

    act(() => vi.advanceTimersByTime(SPEED))
    expect(result.current[0]).toBe('ho')

    act(() => vi.advanceTimersByTime(SPEED * 2))
    expect(result.current[0]).toBe('hola')
    expect(result.current[1]).toBe(true)
  })

  it('no deja temporizadores vivos tras completar el texto', () => {
    renderHook(() => useTyped('hola'))

    act(() => vi.advanceTimersByTime(DELAY + SPEED * 3))

    expect(vi.getTimerCount()).toBe(0)
  })

  // La accesibilidad no es un modo degradado: con reduced-motion el texto
  // completo tiene que estar disponible desde el primer render, sin animación.
  it('devuelve el texto completo de entrada con reduced-motion', () => {
    stubReducedMotion(true)

    const { result } = renderHook(() => useTyped('hola'))

    expect(result.current[0]).toBe('hola')
    expect(result.current[1]).toBe(true)
  })

  it('no programa ningún temporizador con reduced-motion', () => {
    stubReducedMotion(true)

    renderHook(() => useTyped('hola'))

    expect(vi.getTimerCount()).toBe(0)
  })

  it('reinicia y vuelve a teclear cuando cambia el texto', () => {
    const { result, rerender } = renderHook(({ t }) => useTyped(t), {
      initialProps: { t: 'hola' },
    })

    act(() => vi.advanceTimersByTime(DELAY + SPEED * 3))
    expect(result.current[0]).toBe('hola')

    rerender({ t: 'chau' })
    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(false)

    act(() => vi.advanceTimersByTime(DELAY + SPEED * 3))
    expect(result.current[0]).toBe('chau')
    expect(result.current[1]).toBe(true)
  })

  // El cleanup del effect es lo único que impide que el temporizador siga
  // disparando contra un componente ya desmontado.
  it('cancela el temporizador al desmontar', () => {
    const { unmount } = renderHook(() => useTyped('hola'))

    act(() => vi.advanceTimersByTime(DELAY))
    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
