import React, { useEffect, useState } from 'react';
import Axios from 'axios'

import { useApi } from '@hooks'
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, reviewsScroll, servicios, serviciosScroll, addReview, comentario, rating } from './Info_Hospitales.module.css';
import { Divider, Review, Servicio, Navbar } from '@components';

const Info_Hospitales = () => {
  const { data, handleRequest } = useApi()
  const { hospital } = useStoreon('hospital');
  const { user } = useStoreon('user')
  const [dataReviews, setDataReviews] = useState(null)
  const [averageRating, setAverageRating] = useState(null)
  const [newReview, setNewReview] = useState({
    comentario: '',
    rating: null
  })

  const resonServicios = async() => {
    const response = await handleRequest('GET', `/servicios/getServiciosByHospital/${hospital.hospitalid}`)
    return response.data
  }

  const resonReviews = async() => {
    const response = await fetch(`http://localhost:3000/api/v1/reviews/getReviewsByHospital/${hospital.hospitalid}`)
    .then(res => res.json())
    return response
  }

  const setReviews = async() => {
    setDataReviews(await resonReviews())
  }

  const comentarioOnChange = (e) => {
    
    if(e.target.id === 'comentario') {
      const firstInput = e.target.value; 
      setNewReview({comentario: firstInput, rating: newReview.rating})
    } else {
      let secondInput = e.target.value;
      setNewReview({comentario: newReview.comentario, rating: secondInput})
    }  
  }

  const handleClick = async() => {

    if (newReview.rating == null || newReview.comentario == '') {
      alert('Por favor llene todos los campos')
      return
    } else if (newReview.rating < 0 || newReview.rating > 5) {
      alert('Por favor ingrese una calificación de 0 - 5')
      return
    } else {
      const response = await Axios.post(`http://localhost:3000/api/v1/reviews/addReview/${newReview.rating}&${newReview.comentario}&${user.correo}&${hospital.hospitalid}`)
      setNewReview({comentario: '', rating: null})
      setReviews()
    }
  }

  const getAverageRating = () => {
    let rating = 0
    
    for (let i = 0; i < dataReviews.length; i++) {
      rating += parseFloat(dataReviews[i].rating)
    }

    rating = parseFloat(rating / dataReviews.length).toFixed(1)

    setAverageRating(rating)
  }

  useEffect(() => {
    resonServicios()
    setReviews()
  },[]);

  useEffect(() => {
    if (dataReviews != null) {
      getAverageRating()
    }
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
          <h2>Puntuación Media: {averageRating}/5</h2>

          <div className={addReview}>
            <div className={comentario}>
              <h3>Comentario:</h3>
              <textarea type="text" id='comentario' value={newReview.comentario} onChange={comentarioOnChange}/>
            </div>
            <div className={rating}>
              <h3>Rating:</h3>
              <input type="number" id='rating' value={newReview.rating} onChange={comentarioOnChange}/>
            </div>
          </div>

          <button type="submit" onClick={handleClick}>Subir Review</button>

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
                <Servicio index={index} examen={card.nombre} precio={card.precio}/>
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