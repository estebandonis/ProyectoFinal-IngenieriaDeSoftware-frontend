const user = store => {
  store.on('@init', () => ({ user: { correo: '', password: '', tipo: '', isLoggedIn: false } }))
  store.on('user/login', (state, newUser) => {
    return { user: { correo: newUser.email, password: newUser.contra, tipo: newUser.tipo, isLoggedIn: true } }
  })
  store.on('user/logout', (state) => ({ user: { correo: '', password: '', tipo: '', isLoggedIn: false } }))
}

export default user