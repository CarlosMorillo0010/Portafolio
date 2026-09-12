// El comando ES el título de la sección. No hay h2 decorativo aparte.
export default function CommandHeading({ cmd, note }) {
  return (
    <div data-reveal>
      <div className="cmd-line">
        <span className="prompt" aria-hidden="true">
          $
        </span>
        <h2 className="cmd-line__cmd">{cmd}</h2>
        {note && <span className="cmd-line__note">// {note}</span>}
      </div>
      <div className="section-rule" />
    </div>
  )
}
