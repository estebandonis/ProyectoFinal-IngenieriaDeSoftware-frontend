import React from 'react'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Joi from 'joi'

import { useApi, useForm } from '@hooks'
import { AgregarServicio } from '@components'
import { styles, hospitalInfo, all } from './Add_Hospital.module.css'

const schema = Joi.object({
  email: Joi.string()
      .pattern(new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'))
      .required(),
  password: Joi.string()
      .min(4)
      .max(10)
      .required(),
})

const Add_Hospital = () => {
  const { data, handleRequest } = useApi();
  const form = useForm(schema, { email: '', password: ''})
  const {dispatch, user } = useStoreon('user')


  return (
    <div className={all}>
      <div className={styles}>
        <h1>Registar hospital</h1>
        <h2>Nombre del Hospital</h2>
        <input type="text" placeholder="Escriba su correo" value={form.values.email} onChange={form.onChange('email')}/>
        <h2>Descripción del hospital</h2>
        <input type="text" placeholder="Escriba su correo" value={form.values.email} onChange={form.onChange('email')}/>
        <h2>Dirección del hospital</h2>
        <input type="text" placeholder="Escriba su correo" value={form.values.email} onChange={form.onChange('email')}/>
        <h2>Imágenes</h2>
        <button>Subir imágenes</button>
        <br />
        <a href="/">Regresar a menu hospitales</a>
      </div>

      <div className={hospitalInfo}>
        <h1>Servicios:</h1>
        <AgregarServicio />
        <button>+</button>
      </div>
    </div>
  )
}

export default Add_Hospital
