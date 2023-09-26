import React from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Joi from 'joi'

import { useApi, useForm } from '@hooks'
import { Notification } from '@components'
import { styles } from './SignIn.module.css'

const schema = Joi.object({
  email: Joi.string()
      .pattern(new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'))
      .required(),
  password: Joi.string()
      .min(4)
      .max(10)
      .required(),
})

const SignIn = () => {
  const { data, handleRequest } = useApi();
  const form = useForm(schema, { email: '', password: ''})
  const {dispatch} = useStoreon('user')

  const verificado = async (email, password) => {
    const correo = form.values.email
    const contra = form.values.password

    // Crea un objeto con los datos del usuario
    const usuario = {email: correo, contra: contra, tipo: 'reviewer'}

    // Llama al endpoint de la API para guardar los datos del usuario
    const response = await handleRequest('POST', `/users/addUser/${correo}&${contra}`);

    // Si la respuesta indica que los datos se guardaron correctamente, navega al inicio
    if (response === true){
      dispatch('user/login', usuario)
      navigate('/')
    }
  }

  const handleClick = async() => {
    
    if (form.validate()) {
      verificado(form.values.email, form.values.password)
    }
  }

  return (
    <div className={styles}>
      <h1>Crear una Cuenta</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Ejemplo: usuario@correo.com" value={form.values.email} onChange={form.onChange('email')}/>
      <h2>Contraseña</h2>
      <input type="password" placeholder="Debe estar entre 4 - 10 caracteres" value={form.values.password} onChange={form.onChange('password')}/>
      <br />
      {
        data == true || data == null ?
          null :
          <Notification type="danger">
            {data}
          </Notification>
      }
      {
        form.error ?
          <Notification type="warning">
            El usuario o contraseña ingresado no cumplen con los requerimientos establecidos
          </Notification> : null
      }
      <br />
      <button className='register-button' onClick={handleClick}>Registrarse</button>
      <br />
      <a href="/login">Inicia Sesión</a>
      <a href="/">Regresar a menu hospitales</a>
    </div>
  )
}

export default SignIn
