import React, { useState } from 'react';
import { styles } from './Home.module.css';
import {Navbar} from '@components';
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
  Hospitals
      <Carousel responsive={responsive}>
        <div className='card'>
          <h2>Hospital san juan de dios</h2>
          <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
        </div>
        <div className='card1'>
          <h2>Hospital san juan de dios</h2>
        <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
          
        </div>
        <div>
          <h2>Hospital san juan de dios</h2>
        <img  src='data:image/jpeg;base64,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' alt='product'
          />
        </div>
        <div>
          <h2>Hospital san juan de dios</h2>
        <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'
          />
        </div>
      </Carousel> 
    
    </>
  );
};

export default Home;