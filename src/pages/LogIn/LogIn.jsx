import React from 'react'
import Joi from 'joi'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'

import { Notification } from '@components'
import { useApi } from '@hooks'
import { styles } from './LogIn.module.css'

const LogIn = () => {
  const { data, handleRequest } = useApi()
  const {dispatch } = useStoreon('user')
  const [values, setValues] = useState(
    {
      email: '',
      password: '',
    }
  )

  const respond = async() => {
    const response = await handleRequest('GET', `/users/validateUser/${values.email}&${values.password}`)
    return response
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

  const handleClick = async() => {
    const response = await respond()
    if (response === true){
      const response2 = await handleRequest('GET', `/users/getTipo/${values.email}`)
      const usuario = {email: values.email, contra: values.password, tipo: response2[0].tipo}
      if (usuario.tipo === 'admin') {
        dispatch('user/login', usuario)
        navigate('/admin')
      } else {
        dispatch('user/login', usuario)
        navigate('/')
      }
    }
  }

  return (
    <div className={styles}>
      <h1>Log In</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" value={values.email} onChange={handleChangeCorreo} />
      <h2>Contraseña</h2>
      <input type="password" placeholder="Escriba su contraseña" value={values.password} onChange={handleChangeContraseña}/>
      <br />
      {
        data === true || data == null?
          null :
          <Notification type="danger">
            {data}
          </Notification>
      }
      <br />
      <button onClick={handleClick}>Ingresar</button>
      <br />
      <a href="/signin">Registrate</a>
      <a href="/">Regresar a menu hospitales</a>
    </div>
  )
}

export default LogIn
