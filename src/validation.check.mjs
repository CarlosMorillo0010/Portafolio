// Comprobación mínima: `node src/validation.check.mjs`
import assert from 'node:assert/strict'
import { validate } from './validation.js'

const valid = { name: 'Ana', email: 'ana@example.com', message: 'Hola, quiero hablar de un proyecto.' }

assert.deepEqual(validate(valid), {})
assert.ok(validate({ ...valid, name: ' ' }).name)
assert.ok(validate({ ...valid, name: 'A' }).name)
assert.ok(validate({ ...valid, email: 'ana@example' }).email)
assert.ok(validate({ ...valid, email: 'ana example.com' }).email)
assert.ok(validate({ ...valid, message: 'corto' }).message)
assert.ok(validate({ ...valid, message: 'x'.repeat(1001) }).message)

console.log('validation.js OK')
