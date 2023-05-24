import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { card, intro, name } from './BigPicture.module.css'


const BigPicture = ({ nombre, zona, direccion, imagen, rating, click}) => {
    return (
        <div className={card} onClick={click}>
            <img src={imagen} alt="" />
            <div className={intro}>
                <div className={name}>{nombre}</div>
                <p>Direccion: {direccion}</p>
                <p>Zona {zona}</p>
            </div>
        </div>
    )
}

export default BigPicture