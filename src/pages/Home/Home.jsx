import React, { useState } from 'react';
import { styles } from './Home.module.css';
import {Navbar} from '@components';
import { Button } from 'react-bootstrap';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
  }

  const hotelCards = [
    {
      imageSrc:
        'https://i0.wp.com/tvaztecaguate.com/wp-content/uploads/2022/05/IMG-20210124-WA0015-e1611522270373.jpeg?resize=740%2C416&ssl=1',
      title: 'San Juan de Dios',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      title: 'Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 80/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
      title: 'King Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 150/Day',
      features: ['Free Wifi', 'Free breakfast', 'Discounted Meals'],
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      title: 'Royal Suite',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 299/Day',
      features: [
        'Free Wifi',
        'Free breakfast',
        'Discounted Meals',
        "MacBook for work use (hotel's property)",
      ],
    },
  ]

  return (
    <div className='content'>
      <Navbar />
      <Slider {...sliderSettings}>
        {hotelCards.map((card, index) => (
          <div key={index}>
            <h2>{card.title}</h2>
            <img alt={card.title} src={card.imageSrc} width="400" height="250" />
            <p>{card.description}</p>
            <ul>
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className='btn'>Buy Now</button>
          </div>
        ))}
      </Slider>
      <div className='contenedor-filtros'>
        <form className='filtro_zona'>
          <h4>Zona de preferencia</h4>
          <select>
            <option value={15}>Zona 15</option>
            <option value={10}>Zona 10</option>
          </select>
        </form>
        <form className='filtro_examen'>
          <h4>Examen de interés</h4>
          <select>
            <option value={1}>Examen 1</option>
            <option value={2}>Examen 2</option>
          </select>
        </form>
      </div>
      
   </div>
  );
}

export default Home;