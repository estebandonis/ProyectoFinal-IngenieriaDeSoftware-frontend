import React, { useEffect } from 'react';
import store, { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { useApi } from '@hooks'
import { styles, examenes_section } from './Examenes.module.css';
import { Navbar, Examen } from '@components';

const Examenes = () => {
  const { loading, data, handleRequest } = useApi()
  const { dispatch } = useStoreon('examen')

  const reson = async() => {
    const response = await handleRequest('GET', '/examenes')
    return response.data
  }

  useEffect(() => {
    reson()
  },[]);

  const handleClick = async (id, nombre, descripcion) => {
    const nuevo = { examenid: id, nombre: nombre, descripcion: descripcion }
    dispatch('examen/set', nuevo)
    navigate('/info_examen')
  }

  return (
    <div className={styles}>
        <Navbar showBackButton={true} />
        {
          data!=null?
          <div className={examenes_section}>
            {data.map((card, index) => (
              <Examen onclick={() => handleClick(card.examenid, card.nombre, card.descripcion)} nombre={card.nombre} url={'https://medlineplus.gov/images/Xray_share.jpg'} />
            ))}
          </div>
          :<h2>Cargando...</h2>
        }
    </div>
  );
};

export default Examenes;