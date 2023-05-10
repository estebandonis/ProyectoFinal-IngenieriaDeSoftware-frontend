const user = store => {
  store.on('@init', () => ({ user: { correo: '', password: '', isLoggedIn: false } }))
  store.on('user/login', (state, newUser) => {
    return { user: { correo: newUser.email, password: newUser.contra, isLoggedIn: true } }
  })
  store.on('user/logout', (state) => ({ user: { correo: '', password: '', isLoggedIn: false } }))
}

export default user