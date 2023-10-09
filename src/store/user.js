const user = store => {
  store.on('@init', () => ({ user: { id: '', correo: '', tipo: '', isLoggedIn: false } }))
  store.on('user/login', (state, newUser) => {
    return { user: { id: newUser.id, correo: newUser.email, tipo: newUser.tipo, isLoggedIn: true } }
  })
  store.on('user/logout', (state) => ({ user: { id: '', correo: '', tipo: '', isLoggedIn: false } }))
}

export default user