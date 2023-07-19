import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_User.module.css';
import { Navbar } from '@components';
import { Button } from 'react-bootstrap';

const Info_User = () => {
  const [changePassword, setChangePassword] = useState(false)
  
  const { user } = useStoreon('user')

  const handleChangePassword = () => {
    setChangePassword(!changePassword)
  }

  return (
    <div className={styles}>
      <Navbar showBackButton={true}/>
      <div className={info_section}>
        <h1>{user.correo}</h1>
        <div className={informacion}>
          <div className={description}>
            <Button variant='text' color='inherit' onClick={handleChangePassword}>Cambiar contraseña</Button>
            <div>
              {
                changePassword && (
                <form>
                  <label>Contraseña original:</label><br></br>
                  <input type='password'></input><br></br>
                  <label>Nueva contraseña:</label><br></br>
                  <input type='password'></input><br></br>
                  <button type='submit'>Aceptar</button>
                </form> )
              }
            </div>
            
          </div>

          <img src="https://chlapaz.files.wordpress.com/2021/01/foto-occidente.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info_User;