import { useMemo, useState } from 'react'
import { projects } from '../data.js'
import ProjectCard from './ProjectCard.jsx'

const ALL = 'Todos'

export default function Projects() {
  const [filter, setFilter] = useState(ALL)

  const technologies = useMemo(
    () => [ALL, ...new Set(projects.flatMap((project) => project.tech))],
    []
  )

  const visible = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <header className="section__header" data-reveal>
          <h2 className="section__title">Proyectos</h2>
          <p className="section__subtitle">Trabajos seleccionados y experimentos recientes.</p>
        </header>

        <div className="filters" role="group" aria-label="Filtrar proyectos por tecnología">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              className={`chip${filter === tech ? ' chip--active' : ''}`}
              aria-pressed={filter === tech}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">No hay proyectos con esa tecnología todavía.</p>
        ) : (
          <div className="grid">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
