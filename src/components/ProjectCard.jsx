import { CodeIcon, ExternalIcon } from './Icons.jsx'

export default function ProjectCard({ project }) {
  return (
    <article className="card" data-reveal>
      <div className="card__bar">
        <span className="card__slug">{project.slug}/</span>
        <span>{project.year}</span>
      </div>

      <div className="card__media">
        <img
          src={project.image}
          alt={`Captura de ${project.title}`}
          loading="lazy"
          width="600"
          height="375"
        />
      </div>

      <div className="card__body">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__desc">{project.description}</p>

        <ul className="tags">
          {project.tech.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="card__links">
          {project.demo && (
            <a
              className="card__link"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver demo de ${project.title}`}
            >
              <ExternalIcon />
              demo
            </a>
          )}
          {project.repo && (
            <a
              className="card__link"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver código de ${project.title}`}
            >
              <CodeIcon />
              código
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
