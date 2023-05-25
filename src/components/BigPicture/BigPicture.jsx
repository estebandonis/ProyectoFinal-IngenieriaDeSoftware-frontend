import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { card, intro, name, caption, wrapper } from './BigPicture.module.css'


const BigPicture = ({ nombre, zona, direccion, imagen, rating, click}) => {

    return (
        <div className={wrapper}>
            <div className={caption}>
                <div>Dirección:</div>
                <h3>{direccion}</h3>
                <button onClick={() => {navigator.clipboard.writeText(direccion)}}>Copiar</button>
            </div>
            <div className={card} onClick={click}>
                <img src={imagen} alt="" />
                <div className={intro}>
                    <div className={name}>{nombre}</div>
                    <p>Zona {zona}</p>
                </div>
            </div>
        </div>
    )
}

export default BigPicture