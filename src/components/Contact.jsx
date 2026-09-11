import { useState } from 'react'
import { profile } from '../data.js'
import { validate } from '../validation.js'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (field) => (event) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      return
    }

    // ponytail: sin backend, el envío se simula. Conecta aquí tu servicio (Formspree, EmailJS, etc.).
    setStatus('sending')
    await new Promise((resolve) => setTimeout(resolve, 600))
    setValues(EMPTY)
    setStatus('sent')
  }

  return (
    <section id="contacto" className="section">
      <div className="container container--narrow">
        <header className="section__header" data-reveal>
          <h2 className="section__title">Contacto</h2>
          <p className="section__subtitle">
            ¿Tienes un proyecto en mente? Escríbeme y te respondo pronto.
          </p>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate data-reveal>
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="field__error" id="name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={update('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="tu@correo.com"
            />
            {errors.email && (
              <p className="field__error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={values.message}
              onChange={update('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              placeholder="Cuéntame en qué puedo ayudarte"
            />
            {errors.message && (
              <p className="field__error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>

          <button className="button" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          <p className="form__status" role="status" aria-live="polite">
            {status === 'sent' && '¡Gracias! Tu mensaje se registró correctamente.'}
          </p>

          <p className="form__hint">
            También puedes escribirme a <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </form>
      </div>
    </section>
  )
}
