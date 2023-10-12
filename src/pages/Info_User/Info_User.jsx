import React, { useState } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, servicios } from './Info_User.module.css';
import { Navbar } from '@components';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { useApi, useForm } from '@hooks'
import Joi from 'joi';

const Info_User = () => {
  const schema = Joi.object({
    password: Joi.string()
        .min(4)
        .max(10)
        .required(),
  })

  const [changePasswordMenu, setChangePasswordMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const { data, handleRequest } = useApi();
  const form = useForm(schema, { old_password: '', new_password: ''})
  const { user } = useStoreon('user');

  const handlePasswordMenu = () => {
    setChangePasswordMenu(!changePasswordMenu);
  }

  const toggleEditMenu = () => {
    setShowEditMenu(!showEditMenu);
  }

  const respond = async() => {
    const response = await handleRequest('PUT', `/users/updateUserPassword/${user.correo}&${form.values.old_password}&${form.values.new_password}`)
    return response;
  }

  const handleClick = async() => {
    const response = await respond();
    form.values.old_password = '';
    form.values.new_password = '';
    setChangePasswordMenu(false);
  }

  return (
    <div className={styles}>
      <Navbar showBackButton={true}/>

      <DropdownButton id="dropdown-item-button" title="Perfil">
        <Dropdown.Item as="button" onClick={handlePasswordMenu}>Cambiar contraseña</Dropdown.Item>
        <Dropdown.Item as="button" onClick={toggleEditMenu}>Editar perfil</Dropdown.Item>
      </DropdownButton>

      <div className={info_section}>
        <h1>{user.correo}</h1>
        <div className={informacion}>
          <div className={description}>
            { showEditMenu && (
              <>
                <h2>Editar Perfil</h2>
                <p>Funcionalidad aún no implementada</p>
              </>
            )}

            {
              changePasswordMenu && (
              <form>
                <label>Contraseña original:</label><br />
                <input type='password' value={form.values.old_password} onChange={form.onChange('old_password')}></input><br />
                <label>Nueva contraseña:</label><br />
                <input type='password' value={form.values.new_password} onChange={form.onChange('new_password')}></input>
                <br />
                <Button variant='text' color='inherit' onClick={handleClick}>Aceptar</Button>
              </form> )
            }
          </div>
          <img src="https://chlapaz.files.wordpress.com/2021/01/foto-occidente.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info_User;
