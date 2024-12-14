import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import image1 from '../Imagenes/carrusel1.jpg';
import image2 from '../Imagenes/carrusel2.jpg';
import image3 from '../Imagenes/carrusel3.jpg';

function Home() {
  const images = [image1, image2, image3,];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [images.length]); // Usamos `images.length` como dependencia

  return (
    <div className="Home">
      <div className="carousel">
        <button className="carousel-button left" onClick={prevSlide}>
          &#10094;
        </button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        <button className="carousel-button right" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}>
          &#10095;
        </button>
      </div>
    </div>

    
    
  );
}

export default Home;
