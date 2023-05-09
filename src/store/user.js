import { persistState } from '@storeon/localstorage'

const user = store => {
  store.on('@init', () => ({ user: { username: '', token: '', isLoggedIn: false } }))
  store.on('user/login', (_, { username, token }) => ({ user: { username, token, isLoggedIn: true } }))
  store.on('user/logout', (_) => ({ user: { username: '', token: '', isLoggedIn: false } }))

  persistState(['user'])(store)
}

export default user