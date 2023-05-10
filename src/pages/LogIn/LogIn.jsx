import React from 'react'
import Joi from 'joi'
import { useState } from 'react'
import { navigate } from '@store'

import { styles } from './LogIn.module.css'

const schema = Joi.object({
  username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const LogIn = () => {

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");


  const handleChangeCorreo = (valor) => {
    // 👇 Store the input value to local state
    setCorreo(valor.target.value);
  }

  const handleChangeContraseña = (valor) => {
    // 👇 Store the input value to local state
    setContraseña(valor.target.value);
  };

  const handleClick = async() => {
    navigate('/')
  }

  return (
    <div className={styles}>
      <h1>Log In</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" onChange={handleChangeCorreo} />
      <h2>Contraseña</h2>
      <input type="text" placeholder="Escriba su contraseña" onChange={handleChangeContraseña}/>
      <br />
      <button onClick={handleClick}>Ingresar</button>
    </div>
  )
}

export default LogIn
