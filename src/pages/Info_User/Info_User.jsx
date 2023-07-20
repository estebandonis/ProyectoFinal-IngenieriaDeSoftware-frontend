import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_User.module.css';
import { Navbar } from '@components';
import { Button } from 'react-bootstrap';

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

  const handleChangePasswordMenu = () => {
    setChangePasswordMenu(!changePasswordMenu)
  }

  const respond = async() => {
    const response = await handleRequest('GET', `/users/validateUser/${values.email}&${values.password}`)
    return response
  }

  const handleClick = async() => {
    const usuario = {email: user.email, contra: form.values.password}
    const response = await respond()
    if (response == true){
      // dispatch('user/login', usuario)
      // navigate('/')
    }
  }

  return (
    <div className={styles}>
      <Navbar showBackButton={true}/>
      <div className={info_section}>
        <h1>{user.correo}</h1>
        <div className={informacion}>
          <div className={description}>
            <Button variant='text' color='inherit' onClick={handleChangePasswordMenu}>Cambiar contraseña</Button>
            <div>
              {
                changePasswordMenu && (
                <form>
                  <label>Contraseña original:</label><br></br>
                  <input type='password' value={form.values.old_password}></input><br></br>
                  <label>Nueva contraseña:</label><br></br>
                  <input type='password'></input><br></br>
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