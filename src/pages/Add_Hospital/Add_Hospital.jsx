import React from 'react'
import { useState } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Joi from 'joi'

import { useApi, useForm } from '@hooks'
import { Navbar, AgregarServicio } from '@components'
import { styles, hospitalInfo, all, botones, allServices, formulario } from './Add_Hospital.module.css'

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

  const [numServicios, setNumServicios] = useState(1);
  const [servicios, setServicios] = useState([<AgregarServicio key={0} />]);

  const agregarServicio = () => {
    const newNumServicios = numServicios + 1;
    setNumServicios(newNumServicios);
    setServicios([...servicios, <AgregarServicio key={newNumServicios - 1} />]);
  }

  const quitarServicio = (index) => {
    if (numServicios >= 2) {
      const newNumServicios = numServicios - 1;
      setNumServicios(newNumServicios);
      setServicios(servicios.filter((_, i) => i !== index));
    }
  }

  return (
    <div className={all}>
      <Navbar showBackButton={true} />
      <div className={formulario}>
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
        </div>

        <div className={hospitalInfo}>
          <h1>Servicios:</h1>
          <div className={botones}>
            <button onClick={agregarServicio}>+</button>
            <button onClick={quitarServicio}>-</button>
          </div>
          <div className={allServices}>
            {[...Array(numServicios)].map((_, i) => (
              <AgregarServicio key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Hospital
