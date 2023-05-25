import React from "react";
import { styles } from './Examen.module.css'


const Examen = ({ onclick, nombre, url }) => {

    return (
        <button onClick={onclick} className={styles}>
            <img src={url} alt="" />
            <h3>{nombre}</h3>
        </button>
    )
}

export default Examen