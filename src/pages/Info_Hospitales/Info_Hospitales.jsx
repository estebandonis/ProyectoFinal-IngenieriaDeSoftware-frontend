import React, { useState } from 'react';
import { styles, info_section } from './Info_Hospitales.module.css';
import {Navbar} from '@components';
import 'react-multi-carousel/lib/styles.css';

const Info_Hospitales = () => {
  return (
    <div className={styles}>
      <div className={info_section}>
        <h1>informacion</h1>
      </div>
    </div>
  );
};

export default Info_Hospitales;