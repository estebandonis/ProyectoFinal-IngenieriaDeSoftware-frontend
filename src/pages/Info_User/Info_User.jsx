import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_User.module.css';
import { Divider, Review, Servicio } from '@components';
import { Button } from 'react-bootstrap';

const Info_User = () => {
  
  const { user } = useStoreon('user')

  return (
    <div className={styles}>
      <div className={info_section}>
        <h1>{user.correo}</h1>
        <div className={informacion}>
          <div className={description}>
            <Button variant='text' color='inherit'>Cambiar contraseña</Button>
          </div>

          <img src="https://chlapaz.files.wordpress.com/2021/01/foto-occidente.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info_User;