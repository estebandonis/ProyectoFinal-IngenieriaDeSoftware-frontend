import { useState } from 'react';
import estilos from './AgregarServicio.module.css'

const AgregarServicio = ({ examenesData, examenOnChange, priceOnChange}) => {

  const [precio, setPrecio] = useState()

  const examenChange = (examen) => {
    examenOnChange(examen.target.value)
  }

  const priceChange = (valor) => {
    priceOnChange(valor.target.value)
    setPrecio(valor.target.value)
  }

  return (
      <div className={estilos.styles}>
        <div className={estilos.info}>
          <div className={estilos.datos}>
              <h2>Examen</h2>
              
              {
                examenesData.length !== 0?
                <select onChange={examenChange}>
                  <option value={'Default'} >Default</option>
                {examenesData.map((name, index) => (
                    <option key={index} value={name.nombre}>{name.nombre}</option>
                ))}
                </select> : <select><option>Default</option></select>
              }
              
            <h2>Precio</h2>
            <input type="number" placeholder='Ponga el precio del servicio' value={precio} onChange={priceChange}/>
            {
              precio > 0 && precio != null ?
              <p>
                {new Intl.NumberFormat('es-GT', {
                  style: 'currency',
                  currency: 'GTQ',
                }).format(precio)}
              </p> : <div><br /></div>
            }
          </div>
        </div>
      </div>
  );
};

export default AgregarServicio;