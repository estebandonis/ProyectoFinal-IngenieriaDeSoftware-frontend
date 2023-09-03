const user = store => {
  store.on('@init', () => ({ user: { id: '', correo: '', password: '', tipo: '', isLoggedIn: false } }))
  store.on('user/login', (state, newUser) => {
    return { user: { id: newUser.id, correo: newUser.email, password: newUser.contra, tipo: newUser.tipo, isLoggedIn: true } }
  })
  store.on('user/logout', (state) => ({ user: { id: '', correo: '', password: '', tipo: '', isLoggedIn: false } }))
}

export default user