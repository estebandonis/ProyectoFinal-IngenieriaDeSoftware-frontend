import React, { useState } from 'react';
import { styles } from './Home.module.css';
import {Navbar} from '@components';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Navbar />
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={200}
        visibleSlides={3}
        totalSlides={4}
        isIntrinsicHeight={true}
      >
        <Slider>
          <Slide index={0} className='card'>
            <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'/>
            <h2>Hospital san juan de dios</h2>
          </Slide>
          <Slide index={1} className='card'>
            <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'/>
            <h2>Hospital san juan de dios</h2>
          </Slide>
          <Slide index={2} className='card'>
            <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'/>
            <h2>Hospital san juan de dios</h2>
          </Slide>
          <Slide index={3} className='card'>
            <img  src='https://ropisoni.files.wordpress.com/2012/05/bob-esponja.png' alt='product'/>
            <h2>Hospital san juan de dios</h2>
          </Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider> 
    
    </>
  );
};

export default Home;