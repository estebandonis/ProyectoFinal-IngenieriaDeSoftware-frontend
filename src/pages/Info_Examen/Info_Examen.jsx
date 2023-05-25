import React, { useEffect, useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, reviewsScroll, servicios, serviciosScroll } from './Info_Examen.module.css';
import { Divider, Review, Servicio, Navbar } from '@components';

const Info_Examen = () => {
  const { examen } = useStoreon('examen');

  return (
    <div className={styles}>
      <Navbar showBackButton={true} />
      <div className={info_section}>
        <h1>{examen.nombre}</h1>
        <div className={informacion}>
          <div className={description}>
            <h2>Informacion General:</h2>
            <p>{examen.descripcion}</p>
          </div>

          <img src="https://medlineplus.gov/images/Xray_share.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info_Examen;