import React, { useState, useEffect } from 'react'
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'
import Joi from 'joi'

import { useApi, useForm } from '@hooks'

import { Navbar, AgregarServicio } from '@components'
import estilos from './Add_Hospital.module.css'

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
  const {data, handleRequest, apiUrl } = useApi();
  const form = useForm(schema, { num: '', nombre: '', descripcion: '', direccion: '', zona: ''})
  const {user, dispatch } = useStoreon('user')

  const [dataExamenes, setDataExamenes] = useState([])
  const [examenes, setExamenes] = useState({})
  const [precios, setPrecios] = useState({})

  const [numServicios, setNumServicios] = useState(1);
  const [imagePreview, setImagePreview] = useState("");

  const requestNames = async() => {
    const response = await handleRequest('GET', '/examenes/Names')
    setDataExamenes(response)
  }

  useEffect(() => {
    requestNames()
  }, []);

  const examenesOnChange = (key, exam) => {
    setExamenes(prev => ({...prev, [key]: exam}))
  }

  const pricesOnChange = (key, precio) => {
    setPrecios(prev => ({...prev, [key]: precio}))
  }

  const deletePrice =(prec) => {
    const updatedPrices = {...precios}; // copy existing state
    delete updatedPrices[prec]; // delete property
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

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    console.log('input')
    console.log(file);
    previewImage(file);
  }

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
  }

  const AddHospital = async () => {
    const dpi = form.values.num
    const name = form.values.nombre
    const description = form.values.descripcion
    const direction = form.values.direccion
    const zone = form.values.zona
  
    // Llama al endpoint de la API para guardar los datos del usuario
    const response = await handleRequest('POST', `/hospitales/addHospital/${name}&${direction}&${description}&${zone}&${user.correo}`, { data: imagePreview });
    
    let response1 = true

    if (user.tipo === 'reviewer') {
      response1 = await handleRequest('PUT', `/users/addDPI/${dpi}&${user.correo}`)
    }

    for (let i = 0; i < numServicios; i++) {
      const examen = examenes[i]
      const precio = precios[i]

      const response2 = await handleRequest('POST', `/servicios/addServicio/${examen}&${precio}&${name}`)
    }

    if (response === true && response1 === true){
      alert("Hospital agregado exitosamente")
      const usuario = {email: user.correo, tipo: 'manager'}
      dispatch('user/login', usuario)

      navigate('/')
    } else {
      alert("No se pudo agregar el hospital ingresado")
    }
  }

  return (
    <div className={estilos.all}>
      <Navbar showBackButton={true} />
      <div className={estilos.formulario}>
        <div className={estilos.styles}>
          <div className={estilos.titulo}>
            <h1>Registar datos de Hospital</h1>
          </div>
          { user.tipo === 'reviewer' ?
            <div>
              <h2>DPI del administrador</h2>
              <input type="text" placeholder="Este va a estar ligado con su usuario" value={form.values.num} onChange={form.onChange('num')}/>
            </div>
            : null
          }
          <h2>Nombre del Hospital</h2>
          <input type="text" placeholder="Ejemplo: Hospital San Juan de Dios" value={form.values.nombre} onChange={form.onChange('nombre')}/>
          <h2>Descripción del hospital</h2>
          <div className={estilos.textareacontainer}>
            <textarea className={estilos.descripciontextarea} placeholder='Ejemplo: Somos un hospital que se esfuerza por entregar el mejor servicio' name="" id="" cols="30" rows="10" value={form.values.descripcion} onChange={form.onChange('descripcion')}/>
          </div>
          <h2>Dirección del hospital</h2>
          <input type="text" placeholder="Mientras más clara sea, más fácil será para los usuarios encontrar el hospital" value={form.values.direccion} onChange={form.onChange('direccion')}/>
          <h2>Zona</h2>
          <input type="number" placeholder="Escriba la zona donde se encuentra el hospital, como: 1, 2" value={form.values.zona} onChange={form.onChange('zona')}/>
          <br />
          <label for="images" className={estilos.dropContainer} id="dropcontainer"
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => {
              event.preventDefault();
              let file = event.dataTransfer.files[0];
              console.log(file);
              previewImage(file);
            }}
          >
            <span className={estilos.dropTitle}>Drop files here</span>
            or
            <input type="file" onChange={handleInputImage}/>
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="imagen" style={{height: '200px'}}/>
          )}
          <br />
          <button className={estilos.agregar} onClick={AddHospital}>Agregar hospital</button>
        </div>

        <div className={estilos.hospitalInfo}>
          <h1>Servicios:</h1>
          <div className={estilos.botones}>
            <button onClick={agregarServicio}>+</button>
            <button onClick={quitarServicio}>-</button>
          </div>
          <div className={estilos.allServices}>
            {[...Array(numServicios)].map((_, i) => (
              <AgregarServicio key={i} examenesData={dataExamenes} examenOnChange={(val) => examenesOnChange(i, val)} priceOnChange={(val) => pricesOnChange(i, val)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Hospital
