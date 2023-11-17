import React, {useEffect} from 'react'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Axios from 'axios'

import { Notification } from '@components'
import { useApi } from '@hooks'
import * as estilos from "./SignInForm.module.css";

const SignInForm = () => {
  const { data, handleRequest, apiUrl } = useApi()
  const {dispatch } = useStoreon('user')
  const [values, setValues] = useState(
    {
      email: '',
      password: '',
    }
  )
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('')

  const respond = async() => {
    const response = await handleRequest('POST', `/users/validateUsuario/${values.email}&${values.password}`)
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
    setMessage('')
    const response = await respond()
    
    try {
      const usuario = {id: response.id, email: values.email, tipo: response.tipo}

      try {
        // const validateToken = await Axios.get(`${apiUrl}/users/validateToken`, {
        //   headers: {
        //     'Content-Type': 'application/¡son',
        //     Authorization: 'Bearer ' + response.token,
        //   },
        // })

        // if (validateToken.data === 'El token es válido'){
          if (usuario.tipo === 'admin' && response.estado === 'activo'){
            dispatch('user/login', usuario)
            navigate('/admin')
          } else if ( (usuario.tipo === 'reviewer' || usuario.tipo === 'manager') && response.estado === 'activo') {
            dispatch('user/login', usuario)
            navigate('/')
          } else if (response.estado === 'inactivo'){
              setMessage('Su usuario ha sido desactivado')
          }
        // }
      } catch (error) {
        
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
      let dat = ''
      if (data === null){
          const dat = 'null'
      } else {
          const dat = data[0]
          console.log("data: ", dat)
      }
      console.log(typeof(dat))
  }, [data]);

  return (
    <div className="form-container sign-in-container">
      <div className={estilos.styles}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          name="email"
          placeholder="Escriba su correo"
          value={values.email}
          onChange={handleChangeCorreo}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Escriba su contraseña"
          value={values.password}
          onChange={handleChangeContraseña}
        />
        <div className={estilos.showButton} onClick={() => setShowPassword(!showPassword)}>{showPassword ? '(⓪‿⓪)' : '(─‿─)'}</div>
        <br />
        {
          data === true || data === null || typeof(data[0]) != "string"?
            null :
            <Notification type="warning">
              {data[0]}
            </Notification>
        }
          {
              message === ''?
                  null :
                  <Notification type="danger">
                      {message}
                  </Notification>
          }
        <br />
        <button onClick={handleClick}>Ingresar</button>
      </div>
    </div>
  );
}

export default SignInForm;
