import { profile } from '../data.js'

// Barra de estado fija, al estilo de la statusline de vim/tmux.
export default function StatusBar() {
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })

  return (
    <footer className="status">
      <span className="status__seg status__seg--mode">NORMAL</span>
      <span className="status__seg">~/portafolio</span>
      <span className="status__seg status__seg--hide-sm">main</span>

      <span className="status__seg status__seg--push status__seg--hide-sm">
        © {new Date().getFullYear()} {profile.name.toLowerCase()}
      </span>

      {profile.social.map((item) => (
        <span className="status__seg status__seg--hide-sm" key={item.label}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        </span>
      ))}

      <span className="status__seg">
        <button type="button" onClick={scrollToTop}>
          ↑ top
        </button>
      </span>
    </footer>
  )
}
