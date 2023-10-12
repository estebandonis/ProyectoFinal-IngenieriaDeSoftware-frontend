import React from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Joi from 'joi'

import { useApi, useForm } from '@hooks'
import { Notification } from '@components'
import * as estilos from "./SignUpForm.module.css";
import { useEffect } from 'react'

const schema = Joi.object({
  email: Joi.string()
      .pattern(new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'))
      .required(),
  password: Joi.string()
      .min(4)
      .max(10)
      .required(),
})

const SignUpForm = () => {
  const { data, handleRequest } = useApi()
  const form = useForm(schema, { email: '', password: ''})
  const {dispatch} = useStoreon('user')
  const [error, setError] = React.useState(null)

  const verificado = async (email, password) => {
    const correo = form.values.email
    const contra = form.values.password

    // Crea un objeto con los datos del usuario
    const usuario = {email: correo, tipo: 'reviewer'}

    try {
      // Llama al endpoint de la API para guardar los datos del usuario
      const response = await handleRequest('POST', `/users/addUser/${correo}&${contra}`);

      // Si la respuesta indica que los datos se guardaron correctamente, navega al inicio
      if (response === true){
        dispatch('user/login', usuario)
        navigate('/')
      }
    } catch (error) {
      
    }
  }

  const handleClick = async() => {
    
    if (form.validate()) {
      verificado(form.values.email, form.values.password)
    }
  }

  useEffect(() => {
    if (form.error.toString().includes('email')) {
      setError('El correo no cumple con el formato')
    } else if (form.error.toString().includes('password')) {
      setError('La contraseña debe tener al menos 4 caracteres')
    }
  }, [form.error])

  useEffect(() => {
    let dat = ''
    if (data === null){
        const dat = 'null'
    } else {
        const dat = data[0]
    }
  }, [data]);

  return (
    <div className="form-container sign-up-container">
      <div className={estilos.styles}>
        <h1>Crea una Cuenta</h1>
        <input
          type="text"
          name="correo"
          value={form.values.email}
          onChange={form.onChange('email')}
          placeholder="Ejemplo: usuario@correo.com"
        />
        <input
          type="password"
          name="password"
          value={form.values.password}
          onChange={form.onChange('password')}
          placeholder="Debe estar entre 4 - 10 caracteres"
        />
        <br />
        {
          data == true || data == null ?
            null :
            <Notification type="danger">
              {data}
            </Notification>
        }
        {
          form.error && error !== null?
            <Notification type="warning">
              {error}
            </Notification> : null
        }
        <br />
        <button onClick={handleClick}>Registrarse</button>
      </div>
    </div>
  );
}

export default SignUpForm
