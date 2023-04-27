import React from 'react'
import { styles } from './Home.module.css'

const Home = () => {

  return (
    <div className={styles}>
      <h1>Home</h1>
      <h2>Correo</h2>
      <a href="/login">GO TO LOGIN</a>
      <br />
      <a href="/signin">GO TO SIGNIN</a>
    </div>
  )
}

export default Home
