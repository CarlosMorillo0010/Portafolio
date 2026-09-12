# Portafolio personal

Portafolio profesional construido con React + Vite. Solo frontend, sin backend.

## Requisitos

- Node.js 18 o superior

## Instalación y ejecución

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera la versión de producción en dist/
npm run preview  # sirve dist/ para revisarlo antes de desplegar
```

Comprobaciones del proyecto (validación del formulario y cálculo de años):

```bash
node src/validation.check.mjs
```

## Cómo personalizarlo

Todo el contenido editable vive en **`src/data.js`**:

| Export | Qué controla |
|---|---|
| `profile` | Usuario/host del prompt, nombre, rol, avatar, disponibilidad, salida de `whoami`, **tecnologías flotantes**, correo y redes |
| `about` | Párrafos y el bloque `perfil.conf`. Los años de experiencia **se calculan** desde `TRABAJANDO_DESDE` en `data.js`: cambias el año de inicio una vez y no se vuelve a quedar viejo |
| `stack` | Grupos de tecnologías; se renderizan como el JSON que son |
| `experience` | Entradas del `git log`: hash, período, puesto, empresa y viñetas. `ref` marca el actual |
| `projects` | Slug, título, año, descripción, tecnologías, imagen, demo y repositorio |
| `sections` | Id, etiqueta y **comando** de cada sección |

## El avatar

Por defecto el hero muestra un **avatar en ASCII** de un programador, dibujado con
caracteres y guardado en `profile.asciiAvatar` (`src/data.js`). Es texto, así que:

- hereda el color del tema (claro y oscuro) sin ninguna variante extra,
- escala con el contenedor mediante unidades de contenedor (`cqw`), sin partirse,
- pesa cero: no es una imagen que descargar.

Para editarlo, cambia las líneas del array. Dos reglas que la comprobación verifica:
**máximo 25 columnas por línea** y **solo ASCII imprimible** (32-126). Una línea más
larga desalinea todo el dibujo, y un carácter fuera de ASCII se dibuja distinto según
la fuente de quien visita.

### Cambiarlo por tu avatar 3D

**Guarda el archivo y listo. No hay que editar código.**

```
src/assets/avatar.webp   ← déjalo aquí
```

Se detecta en tiempo de compilación (`.avif`, `.webp`, `.png`, `.jpg` o `.jpeg`);
si hay varios formatos gana el más liviano, en ese orden.
En cuanto existe: el ASCII se retira, la etiqueta del marco pasa de `avatar.txt`
a `avatar.png` y el recorte cambia a 3:4. Si lo borras, vuelve el ASCII solo.

Para forzar otra ruta —por ejemplo un archivo en `public/`— define `profile.photo`
en `src/data.js`; ese valor manda sobre la detección automática.

#### Exportarlo en Ready Player Me

1. Entra a [readyplayer.me](https://readyplayer.me) y crea tu avatar; puedes subir
   una foto tuya como referencia.
2. Elige el encuadre **de cuerpo entero** si quieres que se parezca a un render
   sobre plataforma; el de medio cuerpo también funciona.
3. Descárgalo como **PNG con fondo transparente**.
4. Conviértelo a WebP antes de dejarlo en `src/assets/` — el export directo pesa
   unos 700 KB y en WebP baja a unos 45 KB sin pérdida visible:

   ```bash
   npx sharp-cli --input src/assets/avatar.png --output src/assets/avatar.webp                  --format webp --quality 82 resize 700
   ```

La imagen se ajusta con `object-fit: contain`, así que no se recorta aunque venga
en otra proporción. Las instrucciones están también en `src/assets/LEEME.md`.

## Tecnologías flotantes

Las etiquetas que rodean el avatar salen de `profile.badges` en `src/data.js`:

```js
{ label: 'Laravel', tone: 'red', top: '15%', right: '-10%' }
```

- `tone` — color del cuadrito: `amber`, `green`, `cyan` o `red`. Son los colores
  de sintaxis del sitio, no logos de marca: no se inventan identidades ajenas.
- `top` — posición vertical en porcentaje del alto del marco.
- `left` **o** `right` (nunca ambos) — posición horizontal. Los valores negativos
  hacen que la etiqueta sobresalga del marco.

**Cuidado con el voladizo izquierdo:** el hueco entre la terminal y el marco es de
28px. Un `left` más negativo que eso monta la etiqueta encima de la ventana de
terminal. Por debajo de 520px de ancho las etiquetas se acomodan dentro del marco
automáticamente, alternando lado.

La comprobación valida que cada etiqueta tenga texto, un tono conocido y una sola
ancla horizontal; sin ancla se apilarían todas en la misma esquina.

## Sistema de diseño

**La fuente de verdad es [`DESIGN.md`](DESIGN.md).** Si el código y ese archivo
discrepan, gana el archivo.

Resumen: el portafolio se presenta como una terminal. Monoespaciada (IBM Plex Mono)
en toda la interfaz, IBM Plex Sans solo para párrafos largos, acento ámbar de fósforo
y tres colores semánticos de sintaxis usados con avaricia. Todo alineado a la
izquierda, radios de 3px, jerarquía por color y prefijo (`$`, `//`) en vez de por
tamaño de letra.

Los tokens viven al inicio de `src/index.css`. El **tema oscuro es el predeterminado**
(`:root`); el claro se define en `:root[data-theme="light"]`.

### Cada sección es un comando

| Sección | Comando | Cómo se renderiza |
|---|---|---|
| Inicio | `whoami` | Ventana de terminal con el comando tecleándose |
| Sobre mí | `cat sobre-mi.md` | Prosa + bloque de datos clave/valor |
| Stack | `cat stack.json` | El objeto JSON real, con resaltado de sintaxis |
| Experiencia | `git log --oneline` | Historial de commits con hash y `HEAD -> main` |
| Proyectos | `ls proyectos/` | Rejilla; al filtrar pasa a `ls proyectos/ \| grep React` |
| Contacto | `./contacto.sh` | Formulario con etiquetas estilo flags (`--nombre`) |


## Estructura

```
public/
  favicon.svg             Icono de la pestana (prompt ambar)
  projects/               Vistas de codigo de cada proyecto (placeholders, 16:10)
src/
  components/
    Titlebar.jsx          Barra de titulo con puntos, ruta viva y navegacion
    Hero.jsx              Ventana de terminal, comando tecleado y marco del avatar
    About.jsx             Prosa y datos clave
    Stack.jsx             Stack como objeto JSON coloreado
    Experience.jsx        Trayectoria como git log
    Projects.jsx          Listado con filtro que se refleja en el comando
    ProjectCard.jsx       Tarjeta con barra de archivo
    Contact.jsx           Formulario validado y enlaces directos
    StatusBar.jsx         Barra de estado fija estilo vim/tmux
    CommandHeading.jsx    Encabezado de seccion (el comando ES el titulo)
    Icons.jsx             Iconos SVG inline (sin dependencias)
  useTyped.js             Hook de tecleado; respeta prefers-reduced-motion
  data.js                 Contenido editable
  validation.js           Reglas de validacion del formulario
  validation.check.mjs    Comprobacion de validation.js
  App.jsx                 Composicion, tema y revelado al scroll
  index.css               Tokens de diseno y estilos
DESIGN.md                 Sistema de diseno: fuente de verdad
```

## Accesibilidad

- Enlace para saltar al contenido y foco visible en todos los controles.
- El menú móvil se cierra con `Escape` y anuncia su estado con `aria-expanded`.
- Los errores del formulario se enlazan con `aria-describedby` y el foco salta
  al primer campo inválido al enviar.
- Los prompts, puntos y cursores son `aria-hidden`: son decoración, no contenido.
- Se respeta `prefers-reduced-motion`: sin tecleado, sin parpadeo, sin revelado.
  El texto aparece completo de entrada, no en una versión degradada.

## Formulario de contacto

Valida nombre, correo y mensaje en el cliente, muestra errores por campo y un mensaje
de confirmación al enviar. Al no haber backend, el envío está simulado en
`src/components/Contact.jsx`; conecta ahí tu servicio (Formspree, EmailJS, Resend, etc.).

## Despliegue

`npm run build` genera `dist/`, una carpeta estática que funciona en Netlify, Vercel,
GitHub Pages o cualquier hosting de archivos estáticos.
