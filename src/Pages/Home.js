import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import image1 from '../Imagenes/imagen1.avif';
import image2 from '../Imagenes/imagen2.jpg';
import image3 from '../Imagenes/imagen3.jpg';
import image4 from '../Imagenes/Imagen4.avif';

function Home() {
  const images = [image1, image2, image3, image4];
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

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [images.length]); // Usamos `images.length` como dependencia

  return (
    <div className="Home">
      <div className="text-container">
        <h1>Tricyworld</h1>
        <p><p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique 
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p></p>
      </div>
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
