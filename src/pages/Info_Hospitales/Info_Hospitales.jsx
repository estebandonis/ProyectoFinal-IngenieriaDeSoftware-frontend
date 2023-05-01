import React, { useState } from 'react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_Hospitales.module.css';
import {Navbar} from '@components';
import 'react-multi-carousel/lib/styles.css';

const Info_Hospitales = () => {
  return (
    <div className={styles}>
      <div className={info_section}>
        <h1>Hospital San Juan de Dios</h1>
        <div className={informacion}>
          <div className={description}>
            <h2>Informacion General:</h2>
            <p>jfkdla;jfkdlsa;jfkds;ajfkds;lajfkds;ajfkds;ajfksajdfkl;dsjakfjdslka;fjdklsajfkds;lajfl;ds</p>
          </div>

          <img src="https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png" alt="" />
        </div>
      </div>

      <div className={lower_parts}>
        <div className={reviews}>
          <h1>Reviews</h1>
        </div>
        
        <div className={servicios}>
          <h1>Servicio</h1>
        </div>
      </div>
    </div>
  );
};

export default Info_Hospitales;