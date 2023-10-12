import { createRouter } from '@storeon/router'

export default createRouter([
  ['/', () => ({ page: 'home' })],
  ['/admin', () => ({ page: 'admin' })],
  ['/login', () => ({ page: 'login' })],
  ['/signin', () => ({ page: 'signin' })],
  ['/addhospital', () => ({ page: 'addhospital' })],
  ['/managereviews', () => ({ page: 'managereviews' })],
  ['/updatehospital', () => ({ page: 'updatehospital' })],
  ['/info_hospitales', () => ({ page: 'info_hospitales' })],
  ['/info_user', () => ({ page: 'info_user' })],
  ['/examenes', () => ({ page: 'examenes' })],
  ['/info_examen', () => ({ page: 'info_examen' })],
])