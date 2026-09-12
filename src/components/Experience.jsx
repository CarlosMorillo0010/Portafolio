import { experience, sections } from '../data.js'
import CommandHeading from './CommandHeading.jsx'

// La trayectoria como historial de commits: lo más reciente arriba.
export default function Experience() {
  const meta = sections.find((section) => section.id === 'experiencia')

  return (
    <section id="experiencia" className="section section--subtle">
      <div className="container">
        <CommandHeading cmd={meta.cmd} note="del más reciente al primero" />

        <ol className="log">
          {experience.map((entry) => (
            <li
              className={`log__entry${entry.ref ? ' log__entry--head' : ''}`}
              key={entry.hash}
              data-reveal
            >
              <span className="log__hash">{entry.hash}</span>

              <div className="log__main">
                <div className="log__head">
                  <h3 className="log__role">{entry.role}</h3>
                  {entry.ref && <span className="log__ref">{entry.ref}</span>}
                </div>

                <p className="log__meta">
                  <span className="log__company">{entry.company}</span> · {entry.period} ·{' '}
                  {entry.meta}
                </p>

                {entry.bullets.length > 0 && (
                  <ul className="log__bullets">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
