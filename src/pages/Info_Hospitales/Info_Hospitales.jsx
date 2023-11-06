import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useApi } from '@hooks';
import { useStoreon } from 'storeon/react';
import { styles, info_section, description, informacion, lower_parts, reviews, reviewsScroll, servicios, serviciosScroll, addReview, comentario, rating } from './Info_Hospitales.module.css';
import { Divider, Review, Servicio, Navbar, Star } from '@components';

const Info_Hospitales = () => {
  const { data, handleRequest, apiUrl } = useApi();
  const { hospital } = useStoreon('hospital');
  const { user } = useStoreon('user');
  const [dataReviews, setDataReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({
    comentario: '',
    rating: null
  });

  const resonServicios = async () => {
    const response = await handleRequest('GET', `/servicios/getServiciosByHospital/${hospital.hospitalid}`);
    return response;
  };

  const resonReviews = async () => {
    const response = await fetch(`${apiUrl}/reviews/getReviewsByHospital/${hospital.hospitalid}`)
      .then(res => res.json());
    return response;
  };

  const setReviews = async () => {
    setDataReviews(await resonReviews());
  };

  const comentarioOnChange = (e) => {
    if (e.target.id === 'comentario') {
      const firstInput = e.target.value;
      setNewReview({ comentario: firstInput, rating: newReview.rating });
    } else {
      let secondInput = e.target.value;
      setNewReview({ comentario: newReview.comentario, rating: secondInput });
    }
  };

  const handleClick = async () => {
    if (newReview.rating == null || newReview.comentario == '') {
      alert('Por favor llene todos los campos');
      return;
    } else if (newReview.rating < 0 || newReview.rating > 5) {
      alert('Por favor ingrese una calificación de 0 - 5');
      return;
    } else {
      const response = await Axios.post(`${apiUrl}/reviews/addReview/${newReview.rating}&${newReview.comentario}&${user.correo}&${hospital.hospitalid}`);
      setNewReview({ comentario: '', rating: null });
      setReviews();
    }
  };

  const getAverageRating = () => {
    if (dataReviews !== false) {
      let rating = 0;
      for (let i = 0; i < dataReviews.length; i++) {
        rating += parseFloat(dataReviews[i].rating);
      }
      rating = parseFloat(rating / dataReviews.length).toFixed(1);
      setAverageRating(rating);
    } else {
      setAverageRating(0);
    }
  };

  useEffect(() => {
    resonServicios();
    setReviews();
  }, []);

  useEffect(() => {
    getAverageRating();
  }, [dataReviews]);

  // Función para renderizar las estrellas basadas en la calificación
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div>
        {Array.from({ length: totalStars }, (_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles}>
      <Navbar showBackButton={true} />
      <div className={info_section}>
        <h1>{hospital.nombre}</h1>
        <div className={informacion}>
          <div className={description}>
            <h2>Información General:</h2>
            <p>{hospital.descripcion}</p>
          </div>
          <img src={hospital.image_url} alt="" />
        </div>
      </div>
      <div className={lower_parts}>
        <div className={reviews}>
          <h1>Reseñas</h1>
          <h2>Puntuación Media: {averageRating}/5</h2>
          {renderStars(Math.round(averageRating))}
          {
            user.isLoggedIn ?
            <div>
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
            </div> :
            <h2>Inicia sesión o crea una cuenta para comentar</h2>
          }
          {
            dataReviews !== false && dataReviews !== null ?
            <div className={reviewsScroll}>
              {dataReviews.map((review, index) => (
                <div key={index}>
                  <Review
                    nombre={review.users.correo}
                    comentario={review.comentario}
                    rating={parseInt(review.rating)}
                  />
                  {renderStars(parseInt(review.rating))}
                </div>
              ))}
            </div> :
            <h2>Se el primero en comentar</h2>
          }
        </div>
        <Divider />
        <div className={servicios}>
          <h1>Servicios</h1>
          {
            data !== false && data !== null ?
            <div className={serviciosScroll}>
              {data.map((servicio, index) => (
                <Servicio key={index} examen={servicio.examenes.nombre} precio={servicio.precio}/>
              ))}
            </div> :
            <h2>Cargando...</h2>
          }
        </div>
      </div>
    </div>
  );
};

export default Info_Hospitales;
