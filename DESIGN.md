# Sistema de diseño — Portafolio Carlos Puerta

> Fuente de verdad del diseño. Si el código y este archivo discrepan, gana este archivo.

## Lo memorable

**El portafolio es un artefacto del oficio, no una portada sobre el oficio.**

Alguien que lo abre una sola vez debe recordar: *"ese tipo hizo su portafolio como una
terminal, y funcionaba de verdad."* No el color, no la animación: la idea.

Cada decisión de abajo sirve a esa frase. Lo que no la sirve, se corta.

---

## Estética

**Industrial / Utilitaria con memoria retro-CRT.**

Una terminal real, no un disfraz de terminal. Eso significa: alineación a la izquierda,
densidad de información, jerarquía por color de sintaxis en vez de por tamaño, y cero
ornamento que una terminal no tendría.

El toque retro está en el **fósforo ámbar**, no en efectos de CRT curvo ni en ruido de
escaneo pesado. La nostalgia se sugiere, no se disfraza.

**Decoración: intencional.** Barra de título con puntos, barra de estado tipo `tmux`,
rejilla tenue de fondo. Nada más.

---

## Color

Paleta de resaltado de sintaxis. **Un acento primario (ámbar), tres semánticos usados
con avaricia.** Si todo está coloreado, nada está coloreado.

### Oscuro (predeterminado)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0c0d0c` | Fondo. Negro con un grado de verde, nunca `#000` |
| `--bg-subtle` | `#111311` | Bandas de sección |
| `--surface` | `#151715` | Ventanas, tarjetas |
| `--border` | `#242724` | Hairlines |
| `--text` | `#d7dbd5` | Texto principal. Blanco fosforado, no blanco puro |
| `--text-muted` | `#7e857c` | Comentarios, metadatos |
| `--amber` | `#f5a524` | **Acento primario**: prompts, foco, CTA |
| `--green` | `#5ec98a` | Cadenas, disponibilidad, éxito |
| `--cyan` | `#57a9c9` | Enlaces, nombres de función |
| `--red` | `#e0716c` | Errores de validación |

### Claro

Misma estructura, tema de editor claro. `--bg: #f6f5f0`, `--text: #1b1d19`,
`--amber: #a86800`, `--green: #2b8a5a`, `--cyan: #1d7791`.

**Por qué ámbar y no verde:** el verde fósforo sobre negro es *el* cliché de terminal.
El ámbar era el otro monitor, se ve menos, y es cálido donde todos los portafolios de
dev son fríos.

**Por qué no violeta:** era el color de la referencia que estamos dejando atrás, y es
además el acento por defecto de todo diseño generado por IA.

---

## Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Interfaz, títulos, datos | **IBM Plex Mono** | Monoespaciada con carácter propio. Herencia IBM, humanista, no la mono neutra por defecto |
| Párrafos largos | **IBM Plex Sans** | Misma superfamilia: coherencia sin esfuerzo. La mono cansa más allá de tres renglones |

**Prohibidas:** Inter, Roboto, Poppins, Montserrat, Space Grotesk, `system-ui` como cara
principal. Todas son la señal de haberse rendido con la tipografía.

**Escala:** 12 / 13 / 14 / 16 / 20 / 28 / 40 / 56 px. Los títulos NO crecen mucho —
en una terminal la jerarquía la da el color y el prefijo (`$`, `#`, `//`), no el cuerpo.

---

## Composición

**Alineado a la izquierda. Siempre.** Una terminal no centra nada.

- Ancho máximo 1080px, la columna de texto no pasa de 68 caracteres
- La ventana de terminal del hero es el póster: barra de título, prompt, salida
- Cada sección se abre con su comando: `$ cat sobre-mi.md`
- Radio de borde: **3px**. Suficiente para no ser brutalista, lejos de la burbuja

---

## Movimiento

**Intencional, con motivo diacrónico.** El movimiento imita cómo responde una terminal:
aparece texto, late un cursor, se llena una línea.

- Tecleado del prompt del hero (una vez, al cargar)
- Cursor de bloque parpadeando a 1.1s
- Revelado al hacer scroll, 18px hacia arriba
- Hover que **invierte** fondo y texto, como una selección de terminal
- Sin flotación, sin brillo pulsante, sin degradados animados

**`prefers-reduced-motion` desactiva tecleado, parpadeo y revelado.** El texto aparece
completo de entrada: la accesibilidad no es un modo degradado.

---

## Anti-patrones prohibidos en este proyecto

- Degradados violeta o cualquier degradado como acento principal
- Rejilla de tres columnas con iconos dentro de círculos de color
- Todo centrado con espaciado uniforme
- Radio de burbuja uniforme en todo
- Botón principal con degradado
- Verde fósforo `#00ff00` sobre negro puro: cliché de película
- Efecto CRT curvo, ruido de escaneo pesado, "glitch" decorativo

---

## Riesgos asumidos a propósito

1. **Monoespaciada en toda la interfaz.** Cuesta legibilidad en párrafos largos; se
   compensa pasando el cuerpo a IBM Plex Sans. Se gana una identidad que nadie confunde.
2. **Ámbar en vez de verde.** Renuncia al reconocimiento inmediato de "terminal" a
   cambio de no ser el cliché.
3. **Jerarquía por color, no por tamaño.** Los títulos son chicos para lo que manda el
   diseño web actual. Exige que la paleta trabaje bien; si falla, el sitio se aplana.
