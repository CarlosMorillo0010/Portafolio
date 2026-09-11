import { profile } from '../data.js'

export default function Hero() {
  return (
    <section id="inicio" className="section hero">
      <div className="container hero__inner">
        <div className="hero__text" data-reveal>
          <p className="hero__eyebrow">{profile.location}</p>
          <h1 className="hero__title">
            Hola, soy <span className="accent">{profile.name}</span>
          </h1>
          <h2 className="hero__role">{profile.role}</h2>
          <p className="hero__summary">{profile.summary}</p>
          <div className="hero__cta">
            <a className="button" href="#proyectos">
              Ver proyectos
            </a>
            <a className="button button--ghost" href="#contacto">
              Contactar
            </a>
          </div>
        </div>
        <div className="hero__photo" data-reveal>
          <img src={profile.photo} alt={`Foto de ${profile.name}`} width="320" height="320" />
        </div>
      </div>
    </section>
  )
}
