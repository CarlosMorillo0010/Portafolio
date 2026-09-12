import { Fragment } from 'react'
import { about, sections } from '../data.js'
import CommandHeading from './CommandHeading.jsx'

export default function About() {
  const meta = sections.find((section) => section.id === 'sobre-mi')

  return (
    <section id="sobre-mi" className="section section--subtle">
      <div className="container">
        <CommandHeading cmd={meta.cmd} />

        <div className="about__grid">
          <div className="about__body" data-reveal>
            {about.paragraphs.map((paragraph) => (
              <p className="prose" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="facts" data-reveal>
            <p className="facts__file">perfil.conf</p>
            <dl className="facts__list">
              {about.facts.map((fact) => (
                <Fragment key={fact.key}>
                  <dt className="facts__key">{fact.key}</dt>
                  <dd className="facts__value">
                    {fact.value}
                    {fact.note && <span className="facts__note">{fact.note}</span>}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
