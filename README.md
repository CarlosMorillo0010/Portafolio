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

Comprobación de la validación del formulario:

```bash
node src/validation.check.mjs
```

## Cómo personalizarlo

Todo el contenido editable vive en **`src/data.js`**:

- `profile` — nombre, rol, foto, descripción, correo y redes sociales.
- `projects` — título, descripción, tecnologías, imagen, demo y repositorio.
- `skills` — categorías con habilidades y su nivel (0-100).
- `sections` — enlaces del menú de navegación.

Imágenes: reemplaza los archivos de `public/projects/` y `public/avatar.svg` por tus
capturas y tu foto (PNG, JPG o SVG), y actualiza las rutas en `src/data.js`.

Colores y tipografía: los tokens de diseño están al inicio de `src/index.css`
(`:root` para el tema claro y `:root[data-theme="dark"]` para el oscuro).

## Estructura

```
public/
  avatar.svg              Foto de perfil (placeholder)
  projects/               Capturas de los proyectos (placeholders)
src/
  components/
    Navbar.jsx            Navegación, menú móvil y toggle de tema
    Hero.jsx              Presentación personal
    Projects.jsx          Listado con filtro por tecnología
    ProjectCard.jsx       Tarjeta reutilizable de proyecto
    Skills.jsx            Habilidades con barras de nivel
    Contact.jsx           Formulario con validación y feedback
    Footer.jsx            Redes sociales y contacto
  data.js                 Contenido editable
  validation.js           Reglas de validación del formulario
  validation.check.mjs    Comprobación de validation.js
  App.jsx                 Composición, tema y animaciones de entrada
  index.css               Estilos y tokens de diseño
```

## Formulario de contacto

Valida nombre, correo y mensaje en el cliente, muestra errores por campo y un mensaje
de confirmación al enviar. Al no haber backend, el envío está simulado en
`src/components/Contact.jsx`; conecta ahí tu servicio (Formspree, EmailJS, Resend, etc.).

## Despliegue

`npm run build` genera `dist/`, una carpeta estática que funciona en Netlify, Vercel,
GitHub Pages o cualquier hosting de archivos estáticos.
