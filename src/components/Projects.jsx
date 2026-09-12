import { useMemo, useState } from 'react'
import { projects, sections } from '../data.js'
import CommandHeading from './CommandHeading.jsx'
import ProjectCard from './ProjectCard.jsx'

const ALL = 'todos'

export default function Projects() {
  const [filter, setFilter] = useState(ALL)
  const meta = sections.find((section) => section.id === 'proyectos')

  // Cada tecnología presente en los datos, con su número de proyectos.
  const filters = useMemo(() => {
    const counts = new Map([[ALL, projects.length]])
    for (const project of projects) {
      for (const tech of project.tech) counts.set(tech, (counts.get(tech) ?? 0) + 1)
    }
    return [...counts.entries()]
  }, [])

  const visible = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))
  const cmd = filter === ALL ? meta.cmd : `${meta.cmd} | grep ${filter}`

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <CommandHeading cmd={cmd} note={`${visible.length} de ${projects.length}`} />

        <div className="filters" role="group" aria-label="Filtrar proyectos por tecnología">
          <span className="filters__label">grep:</span>
          {filters.map(([tech, count]) => (
            <button
              key={tech}
              type="button"
              className={`chip${filter === tech ? ' chip--active' : ''}`}
              aria-pressed={filter === tech}
              onClick={() => setFilter(tech)}
            >
              {tech}
              <span className="chip__n">{count}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">sin resultados para ese filtro</p>
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
