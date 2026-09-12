// Edita este archivo para personalizar el portafolio.
// El diseño manda en DESIGN.md: cada sección se presenta como un comando.

export const profile = {
  user: 'carlos',
  host: 'portfolio',
  name: 'Carlos Puerta',
  role: 'full stack developer · software engineer',
  // Déjalo en null: basta con guardar tu avatar en src/assets/avatar.png y se
  // detecta solo (ver src/assets/LEEME.md). Rellena esto únicamente si quieres
  // forzar otra ruta; ese valor manda sobre la detección automática.
  photo: null,
  available: true,
  availability: 'disponible para nuevos proyectos',
  // Salida del comando `whoami` del hero.
  whoami: [
    'Ingeniero de Software y Desarrollador Full Stack con enfoque híbrido: lógica backend y visión de diseño.',
    'Arquitecturas políglotas — Laravel para sistemas empresariales, Node.js para servicios en tiempo real.',
  ],
  // Código que se teclea después del whoami. Array de líneas, igual que el
  // avatar ASCII: editarlo aquí no exige tocar ningún componente.
  snippet: {
    cmd: 'cat perfil.js',
    code: [
      'const carlos = {',
      "  rol: 'ingeniero de software',",
      "  stack: ['laravel', 'node', 'react'],",
      "  enfoque: 'backend + diseño',",
      '  disponible: true,',
      '}',
    ],
  },
  // Avatar ASCII: es texto, así que hereda el color del tema y escala con el
  // contenedor. Si algún día pones un PNG en `photo`, este se retira solo.
  asciiAvatar: [
    '        ____________',
    '       /            \\',
    '      |  ___   ___   |',
    '   ,--|  |_o|  |o_|  |--,',
    '   |  |              |  |',
    '   |  |      ||      |  |',
    '   |  |   \\______/   |  |',
    '   |  \\______________/  |',
    "   '--,              ,--'",
    '           |    |',
    '     ______|    |______',
    '    /                  \\',
    '    |  $ whoami        |',
    '    |__________________|',
  ],
  // Tecnologías que flotan alrededor del avatar. `tone` elige el color de
  // sintaxis del cuadrito; `top` más `left` o `right` la posición (porcentajes
  // relativos al marco; los negativos hacen que sobresalga por fuera).
  badges: [
    { label: 'Laravel', tone: 'red', top: '15%', right: '-10%' },
    // El voladizo izquierdo no puede pasar del hueco entre columnas (28px),
    // o la etiqueta se monta encima de la ventana de terminal.
    { label: 'Node.js', tone: 'green', top: '45%', left: '-7%' },
    { label: 'Docker', tone: 'cyan', top: '73%', right: '-6%' },
  ],
  email: 'carlosmorillo0010@gmail.com',
  // Tu teléfono queda visible en una página pública. Borra esta línea si prefieres
  // que solo te escriban por correo: el resto del sitio funciona igual sin ella.
  phone: '+58 412 021 6753',
  location: 'Guarenas, Venezuela',
  social: [
    { label: 'github', url: 'https://github.com/CarlosMorillo0010' },
    // Tu CV no trae LinkedIn. Cuando lo tengas, descomenta y pon tu URL:
    // { label: 'linkedin', url: 'https://linkedin.com/in/tu-usuario' },
  ],
}

// Año en que empezaste a trabajar profesionalmente. Lo demás se calcula solo.
const TRABAJANDO_DESDE = 2014

// Los años se cuentan solos: un '12 años' escrito a mano queda viejo en enero
// y nadie se acuerda de actualizarlo.
export function yearsSince(startYear, now = new Date()) {
  if (!Number.isInteger(startYear)) return 0
  return Math.max(0, now.getFullYear() - startYear)
}

export const about = {
  file: 'sobre-mi.md',
  since: TRABAJANDO_DESDE,
  paragraphs: [
    'Ingeniero de Software y Desarrollador Full Stack con un enfoque híbrido que combina lógica backend y visión de diseño. Me especializo en arquitecturas políglotas: PHP con Laravel para sistemas empresariales y Node.js para servicios en tiempo real.',
    'Trabajo con entornos consistentes en Docker y código limpio, WordPress avanzado con plugins y temas a medida optimizados para WPO, y cultura DevOps con control de versiones en Git/GitHub y CI/CD.',
  ],
  // Salida de config: clave, valor y una nota que aporta el dato que de verdad
  // le falta a quien lee. `note` es opcional.
  facts: [
    {
      key: 'experiencia',
      value: `${yearsSince(TRABAJANDO_DESDE)} años`,
      note: `desde ${TRABAJANDO_DESDE} · full stack y web`,
    },
    {
      key: 'foco',
      value: 'arquitecturas políglotas · Laravel · Node.js',
      note: 'backend robusto, con criterio de diseño encima',
    },
    {
      key: 'ubicación',
      value: 'Guarenas, Venezuela · UTC-4',
      note: 'remoto · solapo con CET por la mañana y con EST todo el día',
    },
    {
      key: 'idiomas',
      value: 'español nativo · inglés técnico',
    },
  ],
}

// Se renderiza como un objeto JSON con resaltado de sintaxis.
export const stack = [
  { key: 'backend', items: ['PHP', 'Laravel', 'Node.js', 'MVC', 'Eloquent ORM', 'Jobs & Queues'] },
  { key: 'apis', items: ['REST', 'JWT', 'asincronía', 'documentación de endpoints'] },
  { key: 'wordpress', items: ['plugins a medida', 'temas a medida', 'WP-CLI', 'hooks', 'WPO'] },
  { key: 'frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React'] },
  { key: 'datos', items: ['MySQL', 'consultas complejas', 'diseño relacional'] },
  { key: 'infra', items: ['Docker', 'Git', 'GitHub', 'CI/CD', 'NPM', 'Composer'] },
  {
    key: 'seguridad',
    items: ['hardening de servidores', 'prevención SQL/XSS', 'caching', 'minificación'],
  },
]

// Se renderiza como `git log --oneline`. El hash es decorativo: invéntalo o usa uno real.
export const experience = [
  {
    hash: 'e7c41a9',
    ref: 'HEAD -> main',
    period: '2024 — 2026',
    role: 'Diseñador & Desarrollador Web',
    company: 'Colombia',
    meta: 'remoto',
    bullets: [
      'Desarrollo de plataformas web con experiencia de usuario (UX) fluida.',
      'Creación de sitios en WordPress con temas personalizados y plugins a medida.',
      'Optimización SEO y de velocidad de carga para mejorar posiciones.',
      'Migración de sitios entre hostings y entornos manteniendo la integridad de datos y contenido.',
    ],
  },
  {
    hash: 'b39f02c',
    period: '2023',
    role: 'Analista de Sistemas',
    company: 'Industrias Daaltex C.A.',
    meta: 'Guatire · presencial',
    bullets: [
      'Diseñé y optimicé sistemas internos, aumentando la eficiencia operativa un 30%.',
      'Implementé mejoras que redujeron el tiempo de procesamiento de datos un 25%.',
      'Coordiné la integración de nuevas plataformas, logrando entregas un 20% antes del plazo.',
      'Supervisé actualizaciones y soporte técnico, manteniendo un 99% de uptime en sistemas clave.',
    ],
  },
  {
    hash: '5a1d874',
    period: '2018 — 2022',
    role: 'Programador informático',
    company: 'Practisis',
    meta: 'Ecuador · remoto',
    bullets: [
      'Diseñé y entregué 15 aplicaciones web, mejorando la eficiencia operativa un 30%.',
      'Implementé mejoras en el código que redujeron errores en producción un 25%.',
      'Coordiné con equipos multidisciplinarios para cumplir plazos en el 95% de los proyectos.',
      'Automaticé procesos clave, ahorrando 120 horas mensuales en tareas repetitivas.',
    ],
  },
  {
    hash: '2f60be3',
    period: '2014 — 2017',
    role: 'Diseñador & Desarrollador Web',
    company: 'Proyectos CÉRÈSA',
    meta: 'Caracas · presencial',
    bullets: [
      'Creé y lancé más de 15 sitios web responsivos, aumentando la visibilidad online de los clientes un 50%.',
      'Implementé mejoras UX/UI que redujeron la tasa de rebote un 30% promedio.',
      'Mejoré la velocidad de carga un 40%, elevando la satisfacción del usuario y el posicionamiento SEO.',
      'Automaticé procesos de actualización web, reduciendo el mantenimiento mensual en 25 horas.',
    ],
  },
  {
    hash: 'c904f15',
    period: '2014 — 2017',
    role: 'Informática · TSU',
    company: 'IUTA',
    meta: 'Guarenas, Venezuela · formación',
    bullets: [],
  },
  {
    hash: '81b27ad',
    period: '2005 — 2009',
    role: 'Diseño Gráfico · Formación Técnica',
    company: 'IUT Antonio José de Sucre',
    meta: 'Guarenas, Venezuela · formación',
    bullets: [],
  },
]

// OJO: tu CV no trae proyectos con nombre, así que estos seis siguen siendo de
// EJEMPLO. Las tecnologías sí son las tuyas para que el filtro no mienta.
// Reemplázalos por trabajo real antes de publicar el sitio.
export const projects = [
  // Trabajo real para clientes: sin repositorio público, por eso `repo` se omite
  // (la tarjeta ya lo trata como opcional). El `year` marcado como "confirmar"
  // es una estimación: no hay evidencia pública de la fecha de entrega.
  {
    id: 1,
    slug: 'portal-ads',
    title: 'Portal ADS',
    year: '2025', // evidencia: (c) 2025 en el pie
    description:
      'Sitio de agencia de marketing digital: catálogo de servicios de campañas, SEO y generación de leads, con captación por formulario.',
    tech: ['WordPress', 'Elementor', 'WooCommerce', 'PHP'],
    image: '/projects/project-1.svg',
    demo: 'https://portal-ads.com/',
  },
  {
    id: 2,
    slug: 'aurumtage',
    title: 'AurumTage',
    year: '2026', // evidencia: (c) 2026 en el pie
    description:
      'Plataforma de bróker multiactivo: forex, acciones, futuros y metales, con área de cuenta, blog formativo y avisos regulatorios.',
    tech: ['WordPress', 'Elementor', 'WooCommerce', 'LiteSpeed'],
    image: '/projects/project-2.svg',
    demo: 'https://aurumtage.com/',
  },
  {
    id: 3,
    slug: 'capital-investment-sri',
    title: 'Capital Investment SRI',
    year: '2026', // confirmar
    description:
      'Aplicación de una sola página para trading de CFDs, con cotizaciones en vivo, catálogo de productos y alta de cuenta 100% digital.',
    tech: ['React', 'JavaScript', 'Cloudflare'],
    image: '/projects/project-3.svg',
    demo: 'https://capitalinvestmentsri.com/',
  },
  {
    id: 4,
    slug: 'guia-mediconsulta',
    title: 'Guía MediConsulta',
    year: '2022', // evidencia: (c) 2022 en el pie
    description:
      'Directorio médico de Venezuela: más de 60 especialidades filtrables por estado, fichas de profesionales y clínicas, alta de anunciantes y una Zona Veterinaria dedicada.',
    tech: ['WordPress', 'Elementor', 'PHP', 'MySQL'],
    image: '/projects/project-4.svg',
    demo: 'https://guiamediconsulta.com/',
  },
  {
    id: 5,
    slug: 'imagenologia-la-urbina',
    title: 'Imagenología La Urbina',
    year: '2025', // confirmar
    description:
      'Centro de diagnóstico por imagen: catálogo de estudios, agendamiento de citas y fichas del equipo médico, con sedes y horarios diferenciados.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'LiteSpeed'],
    image: '/projects/project-5.svg',
    demo: 'https://www.imagenologialaurbina.com.ve/',
  },
]

// `cmd` es la etiqueta de navegación y el comando que encabeza la sección.
export const sections = [
  { id: 'inicio', label: 'inicio', cmd: 'whoami' },
  { id: 'sobre-mi', label: 'sobre-mí', cmd: 'cat sobre-mi.md' },
  { id: 'stack', label: 'stack', cmd: 'cat stack.json' },
  { id: 'experiencia', label: 'experiencia', cmd: 'git log --oneline' },
  { id: 'proyectos', label: 'proyectos', cmd: 'ls proyectos/' },
  { id: 'contacto', label: 'contacto', cmd: './contacto.sh' },
]
