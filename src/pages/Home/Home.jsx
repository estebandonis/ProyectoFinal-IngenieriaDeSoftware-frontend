import React, { useState } from 'react';
import { styles } from './Home.module.css';
import Navbar from '../../assets/Components/Navbar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button } from 'react-bootstrap';

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <Navbar />
      A
      <Carousel responsive={responsive} showDots = {true}>
        <div className='card'>
          <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
          <h2>Hospital san juan de dios</h2>
        </div>
        <div className='card1'>
        <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
          <h2>Hospital san juan de dios</h2>
        </div>
        <div>
        <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
          <h2>Hospital san juan de dios</h2>
        </div>
        <div>
        <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
          <h2>Hospital san juan de dios</h2>
        </div>
      </Carousel> 
    </>
  );
};

export default Home;