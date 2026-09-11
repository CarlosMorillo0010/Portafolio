import { profile, sections } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">{profile.name}</p>
          <p className="footer__role">{profile.role}</p>
        </div>

        <nav className="footer__links" aria-label="Secciones">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>

        <nav className="footer__links" aria-label="Redes sociales">
          {profile.social.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>

      <p className="footer__copy">
        © {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.
      </p>
    </footer>
  )
}
