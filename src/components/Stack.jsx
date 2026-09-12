import { sections, stack } from '../data.js'
import CommandHeading from './CommandHeading.jsx'

// El stack se muestra como el objeto JSON que realmente es en data.js.
export default function Stack() {
  const meta = sections.find((section) => section.id === 'stack')

  return (
    <section id="stack" className="section">
      <div className="container">
        <CommandHeading cmd={meta.cmd} note="lo que uso a diario" />

        <div className="json" data-reveal>
          <p className="json__brace">{'{'}</p>
          {stack.map((group, groupIndex) => (
            <p className="json__row" key={group.key}>
              <span className="json__key">&quot;{group.key}&quot;</span>
              <span className="json__punct">: [</span>
              <span className="json__values">
                {group.items.map((item, index) => (
                  <span key={item}>
                    <span className="json__val">&quot;{item}&quot;</span>
                    {index < group.items.length - 1 && <span className="json__punct">,</span>}
                  </span>
                ))}
              </span>
              <span className="json__punct">]{groupIndex < stack.length - 1 ? ',' : ''}</span>
            </p>
          ))}
          <p className="json__brace">{'}'}</p>
        </div>
      </div>
    </section>
  )
}
