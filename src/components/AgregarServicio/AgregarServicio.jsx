import React, { useEffect, useState } from "react";

import { useApi } from '@hooks'
import { styles, info, boton, datos } from './AgregarServicio.module.css'

const AgregarServicio = ({ examenOnChange, priceOnChange}) => {
    const { data, handleRequest } = useApi()

    const requestNames = async() => {
        const response = await handleRequest('GET', '/examenes/Names')
        return response.data
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore)  requestNames()
        return () => { ignore = true; }
    },[]);

    const examenChange = (examen) => {
      examenOnChange(examen.target.value)
    }

    const priceChange = (valor) => {
      priceOnChange(valor.target.value)
    }

    return (
        <div className={styles}>
          <div className={info}>
            <div className={datos}>
                <h2>Examen</h2>
                
                {
                    data!=null?
                    <select onChange={examenChange}>
                      <option value={'Default'} >Default</option>
                    {data.map((name, index) => (
                        <option key={index} value={name.nombre}>{name.nombre}</option>
                    ))}
                    </select> : <select><option>Default</option></select>
                }
                
              <h2>Precio</h2>
              <input type="number" onChange={priceChange}/>
            </div>
          </div>
        </div>
    );
};

export default AgregarServicio;