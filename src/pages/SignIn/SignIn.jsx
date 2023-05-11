import React from 'react'
import { useState } from 'react'
import { navigate } from '@store'
import { useApi } from '@hooks'

import { styles } from './SignIn.module.css'

const SignIn = () => {
  const { handleRequest } = useApi();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleChangeCorreo = (valor) => {
    // 👇 Store the input value to local state
    setCorreo(valor.target.value);
  };

  const handleChangeContraseña = (valor) => {
    // 👇 Store the input value to local state
    setContraseña(valor.target.value);
  };

  const handleClick = async() => {
    // Crea un objeto con los datos del usuario
    const user = {
      correo,
      contraseña,
    }
  
    // Llama al endpoint de la API para guardar los datos del usuario
    const response = await handleRequest('POST', `/users/addUser/${correo}&${contraseña}`, user);
  
    // Si la respuesta indica que los datos se guardaron correctamente, navega al inicio
    if (!response.error) {
      console.log("Error")
    }
    //navigate('/')
  }

  return (
    <div className={styles}>
      <h1>Sign In</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" onChange={handleChangeCorreo}/>
      <h2>Contraseña</h2>
      <input type="text" placeholder="Escriba su contraseña" onChange={handleChangeContraseña}/>
      <br />
      <button onClick={handleClick}>Registrarse</button>
    </div>
  )
}

export default SignIn
