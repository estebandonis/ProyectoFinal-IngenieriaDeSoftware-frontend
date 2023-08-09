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
  const { handleRequest } = useApi();
  const form = useForm(schema, { num: '', nombre: '', descripcion: '', direccion: '', zona: ''})
  const { user } = useStoreon('user')

  const [examenes, setExamenes] = useState({})
  const [precios, setPrecios] = useState({})

  const [numServicios, setNumServicios] = useState(1);

  const examenesOnChange = (key, exam) => {
    setExamenes(prev => ({...prev, [key]: exam}))
  }

  const pricesOnChange = (key, precio) => {
    setPrecios(prev => ({...prev, [key]: precio}))
  }

  const deletePrice =(prec) => {
    const updatedPrices = {...precios}; // copy existing state
    delete updatedPrices[prec]; // delete property
    console.log("index", prec)
    setPrecios(updatedPrices); // set new state
  }

  const [servicios, setServicios] = useState([<AgregarServicio key={0} examenOnChange={(val) => examenesOnChange(0, val)} priceOnChange={(val) => pricesOnChange(0, val)}/>]);

  const agregarServicio = () => {
    const newNumServicios = numServicios + 1;
    setNumServicios(newNumServicios);
    setServicios([...servicios, <AgregarServicio key={newNumServicios - 1} examenOnChange={(val) => examenesOnChange(newNumServicios - 1, val)} priceOnChange={(val) => pricesOnChange(newNumServicios - 1, val)}/>]);
  }

  const quitarServicio = (index) => {
    if (numServicios >= 2) {
      const newNumServicios = numServicios - 1;
      setNumServicios(newNumServicios);
      setServicios(servicios.filter((_, i) => i !== index));
      deletePrice(numServicios - 1);
    }
  }  

  const AddHospital = async () => {
    const dpi = form.values.num
    const name = form.values.nombre
    const description = form.values.descripcion
    const direction = form.values.direccion
    const zone = form.values.zona
  
    // Llama al endpoint de la API para guardar los datos del usuario
    const response = await handleRequest('POST', `/hospitales/addHospital/${name}&${direction}&${description}&${zone}&${user.correo}`);
  
    // Si la respuesta indica que los datos se guardaron correctamente, navega al inicio
    console.log("Respuesta: " + response)

    const response1 = await handleRequest('PUT', `/users/addDPI/${dpi}&${user.correo}`)

    for (let i = 0; i < numServicios; i++) {
      const examen = examenes[i]
      const precio = precios[i]

      const response2 = await handleRequest('POST', `/servicios/addServicio/${examen}&${precio}&${name}`)
    }

    if (response == true){
      alert("Hospital agregado exitosamente")

      navigate('/')
    } else {
      alert("No se pudo agregar el hospital ingresado")
    }
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
          <textarea name="" id="" cols="30" rows="10" value={form.values.descripcion} onChange={form.onChange('descripcion')}/>
          <h2>Dirección del hospital</h2>
          <input type="text" placeholder="Mientras más clara sea, más fácil será para los usuarios encontrar el hospital" value={form.values.direccion} onChange={form.onChange('direccion')}/>
          <h2>Zona</h2>
          <input type="text" placeholder="Escriba la zona donde se encuentra el hospital, como: 1, 2" value={form.values.zona} onChange={form.onChange('zona')}/>
          <h2>Imágenes</h2>
          <button onClick={AddHospital}>Subir imágenes</button>
        </div>

        <div className={hospitalInfo}>
          <h1>Servicios:</h1>
          <div className={botones}>
            <button onClick={agregarServicio}>+</button>
            <button onClick={quitarServicio}>-</button>
          </div>
          <div className={allServices}>
            {[...Array(numServicios)].map((_, i) => (
              <AgregarServicio key={i} examenOnChange={(val) => examenesOnChange(i, val)} priceOnChange={(val) => pricesOnChange(i, val)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Hospital
