import React from "react";
import { styles } from './Servicio.module.css'


const Servicio = ({ examen, precio }) => {

    return (
        <div className={styles}>
            <h3>{examen}</h3>
            <h3>{precio}</h3>
        </div>
    )
}

export default Servicio