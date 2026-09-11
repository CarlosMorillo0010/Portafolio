export default function ProjectCard({ project }) {
  return (
    <article className="card" data-reveal>
      <img
        className="card__image"
        src={project.image}
        alt={`Captura de ${project.title}`}
        loading="lazy"
        width="600"
        height="400"
      />
      <div className="card__body">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__description">{project.description}</p>
        <ul className="tag-list">
          {project.tech.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <div className="card__links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Ver demo ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer">
              Código ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
