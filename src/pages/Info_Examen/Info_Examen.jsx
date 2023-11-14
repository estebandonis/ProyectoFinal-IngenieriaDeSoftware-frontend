import React, { useEffect, useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import * as estilos from "./Info_Examen.module.css";
import { Divider, Review, Servicio, Navbar } from '@components';

const Info_Examen = () => {
  const { examen } = useStoreon('examen');

  useEffect(() => {
    console.log(examen);
  }, []);

  return (
  <div className={estilos.container}>
    <div className={estilos.styles}>
      <Navbar showBackButton={true} />
      <div className={estilos.info_section}>
        <h1>{examen.nombre}</h1>
        <div className={estilos.informacion}>
          <div className={estilos.description}>
            <h2>Informacion General:</h2>
            <p>{examen.descripcion}</p>
          </div>

          <img src={examen.imagenes} alt="" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Info_Examen;