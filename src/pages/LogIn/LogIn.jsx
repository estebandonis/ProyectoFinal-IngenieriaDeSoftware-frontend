import React, {useEffect} from 'react'
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

  const [message, setMessage] = useState('')

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
      setMessage('')
    const response = await respond()
    if (response === true){
      const response2 = await handleRequest('GET', `/users/getTipo/${values.email}`)
      console.log(response2)
      const usuario = {id: response2[0].user_id, email: values.email, contra: values.password, tipo: response2[0].tipo}
      if (usuario.tipo === 'admin' && response2[0].estado === 'activo'){
        dispatch('user/login', usuario)
        navigate('/admin')
      } else if ( (usuario.tipo === 'reviewer' || usuario.tipo === 'manager') && response2[0].estado === 'activo') {
        dispatch('user/login', usuario)
        navigate('/')
      } else {
          console.log('Su usuario ha sido desactivado')
          setMessage('Su usuario ha sido desactivado')
          console.log(data)
      }
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
    <div className={styles}>
      <h1>Iniciar Sesión</h1>
      <h2>Correo</h2>
      <input type="text" placeholder="Escriba su correo" value={values.email} onChange={handleChangeCorreo} />
      <h2>Contraseña</h2>
      <input type="password" placeholder="Escriba su contraseña" value={values.password} onChange={handleChangeContraseña}/>
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
      <br />
      <button className="register-button" onClick={() => window.location.href = "/signin"}>Registrate</button>
      <button className="menu-button" onClick={() => window.location.href = "/"}>Regresar a menu hospitales</button>
    </div>
  )
}

export default LogIn
