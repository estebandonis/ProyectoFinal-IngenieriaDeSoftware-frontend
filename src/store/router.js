import { createRouter } from '@storeon/router'

export default createRouter([
  ['/', () => ({ page: 'home' })],
  ['/login', () => ({ page: 'login' })],
  ['/signin', () => ({ page: 'signin' })],
  ['/info_hospitales', () => ({ page: 'info_hospitales' })],
  ['/info_user', () => ({ page: 'info_user' })],
])