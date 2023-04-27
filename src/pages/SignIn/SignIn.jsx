import React from 'react'
import { useState } from 'react'
import { navigate } from '@store'

import { styles } from './SignIn.module.css'

const SignIn = () => {

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [num_colegiado, setNum_colegiado] = useState("");

  const handleChangeCorreo = (valor) => {
    // 👇 Store the input value to local state
    setCorreo(valor.target.value);
  };

  const handleChangeContraseña = (valor) => {
    // 👇 Store the input value to local state
    setContraseña(valor.target.value);
  };

  const handleChangeNum = (valor) => {
    // 👇 Store the input value to local state
    setNum_colegiado(valor.target.value);
  }

  const handleClick = async() => {
    navigate('/')
  }

  return (
    <div className={styles}>
      <h1>Sign In</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" onChange={handleChangeCorreo}/>
      <h2>Contraseña</h2>
      <input type="text" placeholder="Escriba su contraseña" onChange={handleChangeContraseña}/>
      <h2>Numero de colegiado</h2>
      <input type="text" placeholder="Escriba el numero" onChange={handleChangeNum}/>
      <br />
      <button onClick={handleClick}>Registrarse</button>
    </div>
  )
}

export default SignIn
