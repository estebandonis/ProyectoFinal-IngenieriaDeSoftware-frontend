import React from 'react'
import Joi from 'joi'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'

import { Notification } from '@components'
import { useApi } from '@hooks'
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
    const usuario = {email: values.email, contra: values.password}
    const response = await respond()
    if (response == true){
      dispatch('user/login', usuario)
      navigate('/')
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
        data == true || data == null ?
          null :
          <Notification type="danger">
            {data}
          </Notification>
      }
      <br />
      <button onClick={handleClick}>Ingresar</button>
    </div>
  )
}

export default LogIn
