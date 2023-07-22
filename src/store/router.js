import { createRouter } from '@storeon/router'

export default createRouter([
  ['/', () => ({ page: 'home' })],
  ['/login', () => ({ page: 'login' })],
  ['/signin', () => ({ page: 'signin' })],
  ['/addhospital', () => ({ page: 'addhospital' })],
  ['/info_hospitales', () => ({ page: 'info_hospitales' })],
  ['/info_user', () => ({ page: 'info_user' })],
  ['/examenes', () => ({ page: 'examenes' })],
  ['/info_examen', () => ({ page: 'info_examen' })],
])