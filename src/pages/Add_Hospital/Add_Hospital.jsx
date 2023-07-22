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
  const form = useForm(schema, { num: '', nombre: '', descripcion: '', direccion: ''})
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

  const handleClick = async() => {
    AddHospital()
  }

  const AddHospital = async () => {
    const dpi = form.values.num
    const name = form.values.nombre
    const description = form.values.descripcion
    const direction = form.values.direccion

    console.log("datos", dpi, name, description, direction)

    console.log("id user: ", user)
  
    // Llama al endpoint de la API para guardar los datos del usuario
    //const response = await handleRequest('POST', `/users/addUser/${correo}&${contra}`, user);
  
    // Si la respuesta indica que los datos se guardaron correctamente, navega al inicio
    //console.log("Respuesta: "+response)
  }

  return (
    <div className={all}>
      <Navbar showBackButton={true} />
      <div className={formulario}>
        <div className={styles}>
          <h1>Registar datos de Hospital</h1>
          <h2>DPI del administrador</h2>
          <input type="text" placeholder="Este va a estar ligado con su usuario" value={form.values.num} onChange={form.onChange('num')}/>
          <h2>Nombre del Hospital</h2>
          <input type="text" placeholder="Ejemplo: Hospital San Juan de Dios" value={form.values.nombre} onChange={form.onChange('nombre')}/>
          <h2>Descripción del hospital</h2>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <h2>Dirección del hospital</h2>
          <input type="text" placeholder="Mientras más clara sea, más fácil será para los usuarios encontrar el hospital" value={form.values.direccion} onChange={form.onChange('direccion')}/>
          <h2>Imágenes</h2>
          <button onClick={handleClick}>Subir imágenes</button>
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
