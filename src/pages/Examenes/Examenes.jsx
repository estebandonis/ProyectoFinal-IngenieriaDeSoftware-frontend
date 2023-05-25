import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Examenes.module.css';
import { Navbar } from '@components';

const Examenes = () => {
  
  const { user } = useStoreon('user')

  return (
    <div className={styles}>
        <Navbar />
    </div>
  );
};

export default Examenes;