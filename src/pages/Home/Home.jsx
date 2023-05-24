import React, { useEffect } from 'react';
import { navigate } from '@store'
import { useStoreon } from 'storeon/react';
import { styles, content } from './Home.module.css';
import { Navbar, BigPicture } from '@components';
import { useApi } from '@hooks'
import { Button } from 'react-bootstrap';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
  const { loading, data, handleRequest } = useApi()
  const { user } = useStoreon('user')
  const { dispatch, hospital } = useStoreon('hospital')

  const reson = async() => {
    const response = await handleRequest('GET', '/hospitales')
    return response.data
  }
  console.log("usuario: "+user.correo)
  console.log("hospital: "+hospital.nombre)

  useEffect(() => {
    let ignore = false;
    if (!ignore)  reson()
    return () => { ignore = true; }
  },[]);

  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
  }

  const handleClick = async (id, nombre, descripcion, direccion, estado, tipo, zona) => {
    const nuevo = { hospitalid: id, nombre: nombre, descripcion: descripcion, direccion: direccion, estado: estado, tipo: tipo, zona: zona }
    dispatch('hospital/set', nuevo)
    navigate('/info_hospitales')
  }

  return (
    <div className={content}>
      <Navbar />

      {
        data!=null?
        <Slider {...sliderSettings}>
        {data.map((card, index) => (
          
          <BigPicture key={index} nombre={card.nombre} tipo={card.tipo} zona={card.zona} direccion={card.direccion} imagen={"https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"} 
          click={() => handleClick(card.hospitalid, card.nombre, card.descripcion, card.direccion, card.estado, card.tipo, card.zona)}/>

        ))}
        </Slider>
      :<h2>Cargando</h2>
      }

      
   </div>
  );
}

export default Home;