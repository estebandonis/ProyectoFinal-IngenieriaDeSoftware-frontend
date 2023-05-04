import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { styles } from './BigPicture.module.css'


const BigPicture = ({ nombre, tipo, imagen,  rating}) => {
    return (
        <div className={styles}>
            <div className="nombre"></div>
            <div className=""></div>
            <img src={imagen} alt="" />
            <div className="rating"></div>
        </div>
    )
}

export default BigPicture