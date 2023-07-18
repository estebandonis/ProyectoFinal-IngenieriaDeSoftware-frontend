import React, { useEffect, useState } from "react";

import { useApi, useForm } from '@hooks'
import { styles, info, boton, datos } from './AgregarServicio.module.css'

const AgregarServicio = ({onclick}) => {
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
    

    return (
        <div className={styles}>
          <div className={info}>
            <button onClick={onclick} className={boton}>-</button>
            <div className={datos}>
                <h2>Examen</h2>
                
                {
                    data!=null?
                    <select>
                    {data.map((name, index) => (
                        <option key={index} value={name.nombre}>{name.nombre}</option>
                    ))}
                    </select> : <select><option>default</option></select>
                }
                
              <h2>Precio</h2>
              <input type="number" />
            </div>
          </div>
        </div>
    );
};

export default AgregarServicio;