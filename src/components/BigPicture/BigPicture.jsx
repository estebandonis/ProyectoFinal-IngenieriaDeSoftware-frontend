import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { styles, name } from './BigPicture.module.css'


const BigPicture = ({ nombre, tipo, imagen,  rating, click}) => {
    return (
        <div className={styles} onClick={click}>
            <div className={name}>{nombre}</div>
            <div className="">{tipo}</div>
            <img src={imagen} alt="" />
            <div className="rating">{rating}</div>
        </div>
    )
}

export default BigPicture