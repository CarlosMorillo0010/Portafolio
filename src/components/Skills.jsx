import { skills } from '../data.js'

export default function Skills() {
  return (
    <section id="habilidades" className="section section--alt">
      <div className="container">
        <header className="section__header" data-reveal>
          <h2 className="section__title">Habilidades</h2>
          <p className="section__subtitle">Tecnologías con las que trabajo a diario.</p>
        </header>

        <div className="grid grid--skills">
          {skills.map((group) => (
            <article key={group.category} className="panel" data-reveal>
              <h3 className="panel__title">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((skill) => (
                  <li key={skill.name} className="skill">
                    <div className="skill__head">
                      <span>{skill.name}</span>
                      <span className="skill__level">{skill.level}%</span>
                    </div>
                    <div
                      className="meter"
                      role="meter"
                      aria-label={skill.name}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="meter__fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
