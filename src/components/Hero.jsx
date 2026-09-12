import { profile, sections } from '../data.js'
import { useTyped } from '../useTyped.js'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'
import CodeTyper from './CodeTyper.jsx'

const SOCIAL_ICONS = { github: GitHubIcon, linkedin: LinkedInIcon }

const HERO_CMD = sections[0].cmd

// Detecta src/assets/avatar.* en tiempo de compilación. Dejar el archivo ahí
// basta: no hay que editar data.js. `profile.photo` sigue mandando si lo defines.
const encontrado = import.meta.glob('../assets/avatar.{avif,webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})
// Si hay varios formatos, gana el más liviano. Sin este orden explícito
// decidiría el glob, que no garantiza cuál devuelve primero.
const PRIORIDAD = ['.avif', '.webp', '.png', '.jpg', '.jpeg']
const elegido = Object.keys(encontrado).sort(
  (a, b) =>
    PRIORIDAD.findIndex((ext) => a.endsWith(ext)) - PRIORIDAD.findIndex((ext) => b.endsWith(ext)),
)[0]
const AVATAR_DETECTADO = elegido ? encontrado[elegido] : null
// El nombre sale del archivo real, no de una cadena fija: si cambias el formato
// la etiqueta del marco lo refleja sola.
const AVATAR_NOMBRE = elegido ? elegido.split('/').pop() : null

function AvatarFrame() {
  const { asciiAvatar, name } = profile
  const photo = profile.photo ?? AVATAR_DETECTADO
  const etiqueta = photo
    ? ((profile.photo ? profile.photo.split('/').pop() : AVATAR_NOMBRE) ?? 'avatar')
    : 'avatar.txt'

  return (
    <figure className="frame">
      <figcaption className="frame__label">{etiqueta}</figcaption>
      <div className={`frame__body frame__body--${photo ? 'photo' : 'ascii'}`}>
        {photo ? (
          <img src={photo} alt={`Avatar de ${name}`} width="250" height="333" />
        ) : (
          // role="img" + aria-label: un lector de pantalla anuncia la descripción
          // en vez de deletrear 350 caracteres de barras y guiones.
          <pre
            className="frame__ascii"
            role="img"
            aria-label="Avatar en ASCII de un programador con auriculares y lentes"
          >
            {asciiAvatar.join('\n')}
          </pre>
        )}
      </div>
    </figure>
  )
}

export default function Hero() {
  const [typed, done] = useTyped(HERO_CMD)

  return (
    <section id="inicio" className="section hero">
      <div className="container hero__grid">
        <div className="term" data-reveal>
          <div className="term__bar">
            <span className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="term__title">
              {profile.user}@{profile.host}: ~
            </span>
          </div>

          <div className="term__body">
            <p className="term__line">
              <span className="prompt" aria-hidden="true">
                $
              </span>
              {/* El comando se teclea; el nombre real va en el h1 de abajo. */}
              <span>{typed}</span>
              {!done && <span className="caret" aria-hidden="true" />}
            </p>

            <h1 className="term__out term__out--name">{profile.name}</h1>
            <p className="term__out term__out--role">{profile.role}</p>

            {profile.available && (
              <p className="term__out">
                <span className="badge-avail">{profile.availability}</span>
              </p>
            )}

            <div className="term__spacer" />

            {profile.whoami.map((line) => (
              <p className="term__prose" key={line}>
                {line}
              </p>
            ))}

            {profile.snippet && done && (
              <>
                <div className="term__spacer" />
                <p className="term__line">
                  <span className="prompt" aria-hidden="true">
                    $
                  </span>
                  <span>{profile.snippet.cmd}</span>
                </p>
                <CodeTyper code={profile.snippet.code} />
              </>
            )}

            <div className="hero__actions">
              <a className="btn btn--primary" href="#contacto">
                <MailIcon />
                contacto
              </a>
              {profile.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.label]
                return (
                  <a
                    key={item.label}
                    className="btn"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {Icon && <Icon />}
                    {item.label}
                  </a>
                )
              })}
            </div>

            <div className="term__spacer" />

            <p className="term__line">
              <span className="prompt" aria-hidden="true">
                $
              </span>
              <span className="caret" aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className="stage" data-reveal>
          <AvatarFrame />
          {profile.badges.map((badge) => (
            <span
              key={badge.label}
              className={`tech-badge tech-badge--${badge.tone}`}
              style={{ top: badge.top, left: badge.left, right: badge.right }}
            >
              <i aria-hidden="true" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
