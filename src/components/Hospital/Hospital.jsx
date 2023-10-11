import * as estilos from './Hospital.module.css'

const Hospital = ({ nombre, descrip, direc, zona, img }) => {

    return (
        <div className={estilos.styles}>
          <h6>Nombre del Hospital</h6>
          <label>{nombre}</label>
          <h6>Descripcion</h6>
          <label>{descrip}</label>
          <h6>Direccion</h6>
          <label>{direc}</label>
          <h6>Zona</h6>
          <label>{zona}</label>
          <img src={img}/>
        </div>
    );
};

export default Hospital;