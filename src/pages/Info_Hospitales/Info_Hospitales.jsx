import React, { useEffect, useState } from 'react';
import store, { navigate } from '@store'
import { useApi } from '@hooks'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, reviewsScroll, servicios, serviciosScroll } from './Info_Hospitales.module.css';
import { Divider, Review, Servicio, Navbar } from '@components';

const Info_Hospitales = () => {
  const { loading, data, handleRequest } = useApi()
  const { hospital } = useStoreon('hospital');
  const { user } = useStoreon('user')
  const [dataReviews, setDataReviews] = useState(null)

  const resonServicios = async() => {
    const response = await handleRequest('GET', `/servicios/getServiciosByHospital/${hospital.hospitalid}`)
    return response.data
  }

  const resonReviews = async() => {
    const response = await fetch(`http://localhost:3000/api/v1/reviews/getReviewsByHospital/${hospital.hospitalid}`)
    .then(res => res.json())
    console.log("Review: ", response)
    return response
  }

  const setReviews = async() => {
    setDataReviews(await resonReviews())
  }

  useEffect(() => {
    resonServicios()
    setReviews()
  },[]);

  useEffect(() => {
    console.log("Servicios: ", dataReviews)
  },[dataReviews]);

  return (
    <div className={styles}>
      <Navbar showBackButton={true} />
      <div className={info_section}>
        <h1>{hospital.nombre}</h1>
        <div className={informacion}>
          <div className={description}>
            <h2>Informacion General:</h2>
            <p>{hospital.descripcion}</p>
          </div>

          <img src="https://chlapaz.files.wordpress.com/2021/01/foto-occidente.jpg" alt="" />
        </div>
      </div>

      <div className={lower_parts}>
        <div className={reviews}>
          <h1>Reseñas</h1>
          <h2>Puntuación Media: 9.5/10</h2>
          {
            dataReviews!=null?
            <div className={serviciosScroll}>
              {dataReviews.map((card, index) => (
                <Review nombre={card.correo} comentario={card.comentario}/>
              ))}
            </div>
            :<h2>Cargando...</h2>
          }
        </div>

        <Divider />

        <div className={servicios}>
          <h1>Servicios</h1>
          {
            data!=null?
            <div className={serviciosScroll}>
              {data.map((card, index) => (
                <Servicio examen={card.nombre} precio={card.precio}/>
              ))}
            </div>
            :<h2>Cargando...</h2>
          }
        </div>
      </div>
    </div>
  );
};

export default Info_Hospitales;