import React from 'react'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'

import { useApi } from '@hooks'
import { styles } from './LogIn.module.css'

const LogIn = () => {
  const { loading, data, handleRequest } = useApi()
  const {dispatch, user } = useStoreon('user')
  const [values, setValues] = useState(
    {
      email: '',
      password: ''
    }
  )

  const respond = async() => {
    const response = await handleRequest('GET', `/users/validateUser/${values.email}&${values.password}`)
    return response.data
  }

  const handleChangeCorreo = (valor) => {
    const newEmail = valor.target.value
    setValues(valors => {
      return {...valors, email: newEmail}
    })
  };

  const handleChangeContraseña = (valor) => {
    const newPassword = valor.target.value
    setValues(valors => {
      return {...valors, password: newPassword}
    })
  }

  const validate = () => {
    if (data == null){
      validate()
    }
    else{
      if (data == true){
        dispatch('user/login', usuario)
        navigate('/info_hospitales')
      }
      else
        console.log("fallo")
    }
  }

  const handleClick = async() => {
    const usuario = {email: values.email, contra: values.password}
    await respond()
    console.log("Data: "+data)
    validate()
  }

  return (
    <div className={styles}>
      <h1>Log In</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" value={values.email} onChange={handleChangeCorreo} />
      <h2>Contraseña</h2>
      <input type="text" placeholder="Escriba su contraseña" value={values.password} onChange={handleChangeContraseña}/>
      <br />
      <button onClick={handleClick}>Ingresar</button>
    </div>
  )
}

export default LogIn
