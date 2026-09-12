import { useState } from 'react'
import { profile, sections } from '../data.js'
import { validate } from '../validation.js'
import CommandHeading from './CommandHeading.jsx'
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons.jsx'

const EMPTY = { name: '', email: '', message: '' }
const SOCIAL_ICONS = { github: GitHubIcon, linkedin: LinkedInIcon }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const meta = sections.find((section) => section.id === 'contacto')

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (status === 'sent') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('idle')
      // Lleva el foco al primer campo con error.
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    // ponytail: sin backend, el envío se simula. Conecta aquí tu servicio (Formspree, EmailJS, etc.).
    setStatus('sending')
    await new Promise((resolve) => setTimeout(resolve, 600))
    setValues(EMPTY)
    setStatus('sent')
  }

  const fields = [
    { id: 'name', label: 'nombre', type: 'text', placeholder: 'tu nombre' },
    { id: 'email', label: 'correo', type: 'email', placeholder: 'tu@correo.com' },
  ]

  return (
    <section id="contacto" className="section">
      <div className="container">
        <CommandHeading cmd={meta.cmd} note="respondo en menos de 48 h" />

        <div className="contact__grid">
          <form className="form" onSubmit={handleSubmit} noValidate data-reveal>
            {fields.map((field) => (
              <div className="field" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={values[field.id]}
                  onChange={update(field.id)}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors[field.id])}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                />
                {errors[field.id] && (
                  <p className="field__error" id={`${field.id}-error`}>
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div className="field">
              <label htmlFor="message">mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={values.message}
                onChange={update('message')}
                placeholder="contame en qué puedo ayudarte"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p className="field__error" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="form__foot">
              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'enviando…' : 'enviar'}
                {status !== 'sending' && <ArrowIcon />}
              </button>
              <p className="form__hint">o escribime directo, abajo →</p>
            </div>

            <p className="form__status" role="status" aria-live="polite">
              {status === 'sent' && 'mensaje registrado. gracias.'}
            </p>
          </form>

          <div className="links" data-reveal>
            <a className="link-row" href={`mailto:${profile.email}`}>
              <MailIcon />
              {profile.email}
              <span className="link-row__arrow" aria-hidden="true">
                →
              </span>
            </a>

            {profile.phone && (
              <a className="link-row" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                <PhoneIcon />
                {profile.phone}
                <span className="link-row__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            )}

            {profile.social.map((item) => {
              const Icon = SOCIAL_ICONS[item.label]
              return (
                <a
                  className="link-row"
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {Icon && <Icon />}
                  {item.label}
                  <span className="link-row__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
