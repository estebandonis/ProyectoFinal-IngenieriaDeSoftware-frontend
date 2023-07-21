import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_User.module.css';
import { Navbar } from '@components';
import { Button } from 'react-bootstrap';
import { useApi, useForm } from '@hooks'
import Joi from 'joi';

const Info_User = () => {
  const schema = Joi.object({
    password: Joi.string()
        .min(4)
        .max(10)
        .required(),
  })

  const [changePasswordMenu, setChangePasswordMenu] = useState(false)

  const { data, handleRequest } = useApi();
  const form = useForm(schema, { old_password: '', new_password: ''})
  const { dispatch, user } = useStoreon('user')

  const handlePasswordMenu = () => {
    setChangePasswordMenu(!changePasswordMenu)
  }

  const respond = async() => {
    const response = await handleRequest('PUT', 
      `/users/updateUserPassword/${user.email}&${form.values.old_password}&${form.values.new_password}`)
    return response
  }

  const handleClick = async() => {
    const response = await respond()
    if (response == true){
      setChangePasswordMenu(false)
    }
  }

  return (
    <div className={styles}>
      <Navbar showBackButton={true}/>
      <div className={info_section}>
        <h1>{user.correo}</h1>
        <div className={informacion}>
          <div className={description}>
            <Button variant='text' color='inherit' onClick={handlePasswordMenu}>Cambiar contraseña</Button>
            <div>
              {
                changePasswordMenu && (
                <form>
                  <label>Contraseña original:</label><br></br>
                  <input type='password' value={form.values.old_password} onChange={form.onChange('old_password')}></input><br></br>
                  <label>Nueva contraseña:</label><br></br>
                  <input type='password' value={form.values.new_password} onChange={form.onChange('new_password')}></input>
                  <br></br>
                  {
                    data == true || data == null ?
                      null :
                      <Notification type="danger">
                        {data}
                      </Notification>
                  }
                  {
                    form.error ?
                      <Notification type="warning">
                        El usuario o contraseña ingresado no cumplen con los requerimientos establecidos
                      </Notification> : null
                  }
                  <br></br>
                  <button type='submit' onClick={handleClick}>Aceptar</button>
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