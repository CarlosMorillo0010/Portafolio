export const LIMITS = { name: 2, message: 10, maxMessage: 1000 }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Devuelve un objeto con un mensaje por campo inválido. Vacío = formulario válido.
export function validate({ name = '', email = '', message = '' }) {
  const errors = {}

  const trimmedName = name.trim()
  if (!trimmedName) errors.name = 'El nombre es obligatorio.'
  else if (trimmedName.length < LIMITS.name) errors.name = 'Escribe al menos 2 caracteres.'

  const trimmedEmail = email.trim()
  if (!trimmedEmail) errors.email = 'El correo es obligatorio.'
  else if (!EMAIL_PATTERN.test(trimmedEmail)) errors.email = 'Introduce un correo válido.'

  const trimmedMessage = message.trim()
  if (!trimmedMessage) errors.message = 'El mensaje es obligatorio.'
  else if (trimmedMessage.length < LIMITS.message)
    errors.message = `Escribe al menos ${LIMITS.message} caracteres.`
  else if (trimmedMessage.length > LIMITS.maxMessage)
    errors.message = `El mensaje no puede superar los ${LIMITS.maxMessage} caracteres.`

  return errors
}
