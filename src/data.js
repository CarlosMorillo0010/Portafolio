// Edita este archivo para personalizar el portafolio.

export const profile = {
  name: 'Carlos Morillo',
  role: 'Desarrollador Frontend',
  photo: '/avatar.svg',
  summary:
    'Construyo interfaces web rápidas, accesibles y fáciles de mantener. Me enfoco en React, arquitectura de componentes y buenas prácticas de rendimiento.',
  location: 'Disponible para trabajo remoto',
  email: 'carlosmorillo0010@gmail.com',
  resume: '/cv.pdf',
  social: [
    { label: 'GitHub', url: 'https://github.com/tu-usuario' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario' },
    { label: 'Twitter', url: 'https://twitter.com/tu-usuario' },
  ],
}

export const projects = [
  {
    id: 1,
    title: 'Panel de analítica',
    description:
      'Dashboard con gráficas en tiempo real, filtros por rango de fechas y exportación de reportes en CSV.',
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    image: '/projects/project-1.svg',
    demo: 'https://ejemplo.com/demo-1',
    repo: 'https://github.com/tu-usuario/proyecto-1',
  },
  {
    id: 2,
    title: 'Tienda en línea',
    description:
      'Catálogo con carrito persistente, búsqueda con debounce y checkout paso a paso validado.',
    tech: ['React', 'Node.js', 'CSS'],
    image: '/projects/project-2.svg',
    demo: 'https://ejemplo.com/demo-2',
    repo: 'https://github.com/tu-usuario/proyecto-2',
  },
  {
    id: 3,
    title: 'Gestor de tareas',
    description:
      'Aplicación de productividad con tableros arrastrables, atajos de teclado y sincronización offline.',
    tech: ['React', 'TypeScript', 'Vite'],
    image: '/projects/project-3.svg',
    demo: 'https://ejemplo.com/demo-3',
    repo: 'https://github.com/tu-usuario/proyecto-3',
  },
  {
    id: 4,
    title: 'API de reservas',
    description:
      'Servicio REST con autenticación por token, control de disponibilidad y documentación OpenAPI.',
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
    image: '/projects/project-4.svg',
    demo: 'https://ejemplo.com/demo-4',
    repo: 'https://github.com/tu-usuario/proyecto-4',
  },
  {
    id: 5,
    title: 'Landing corporativa',
    description:
      'Sitio de marketing con puntuación 100 en Lighthouse, animaciones ligeras y formulario de captación.',
    tech: ['React', 'CSS', 'Vite'],
    image: '/projects/project-5.svg',
    demo: 'https://ejemplo.com/demo-5',
    repo: 'https://github.com/tu-usuario/proyecto-5',
  },
  {
    id: 6,
    title: 'Chat en tiempo real',
    description:
      'Mensajería con salas, indicador de escritura y notificaciones push mediante WebSockets.',
    tech: ['React', 'Node.js', 'WebSockets'],
    image: '/projects/project-6.svg',
    demo: 'https://ejemplo.com/demo-6',
    repo: 'https://github.com/tu-usuario/proyecto-6',
  },
]

// level: 0-100, usado para la barra de progreso.
export const skills = [
  {
    category: 'Lenguajes',
    items: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    category: 'Frameworks y librerías',
    items: [
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 70 },
      { name: 'Vitest', level: 65 },
    ],
  },
  {
    category: 'Herramientas',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Vite', level: 85 },
      { name: 'Docker', level: 60 },
      { name: 'Figma', level: 70 },
    ],
  },
]

export const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
]
