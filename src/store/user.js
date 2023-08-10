const user = store => {
  store.on('@init', () => ({ user: { correo: '', password: '', dpi: '', isLoggedIn: false } }))
  store.on('user/login', (state, newUser) => {
    return { user: { correo: newUser.email, password: newUser.contra, dpi: newUser.dpi, isLoggedIn: true } }
  })
  store.on('user/logout', (state) => ({ user: { correo: '', password: '', dpi: '', isLoggedIn: false } }))
}

export default user