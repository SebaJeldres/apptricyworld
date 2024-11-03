import React, { useState } from 'react';
import '../styles/Home.css';

// Asegúrate de que los nombres y las extensiones sean correctas
import image1 from '../Imagenes/imagen1.avif';
import image2 from '../Imagenes/imagen2.jpg'; // Asegúrate de que sea .jpg
import image3 from '../Imagenes/imagen3.jpg';
import image4 from '../Imagenes/Imagen4.avif';
 // Asegúrate de que sea .jpg

function Home() {
  const images = [image1, image2, image3, image4]; // Arreglo de imágenes
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice de la imagen actual

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambiar a la siguiente imagen
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1 // Cambiar a la imagen anterior
    );
  };

  return (
    <div className="Home">
      <div className="carousel">
        <button className="carousel-button left" onClick={prevSlide}>
          &#10094; {/* Flecha izquierda */}
        </button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        <button className="carousel-button right" onClick={nextSlide}>
          &#10095; {/* Flecha derecha */}
        </button>
      </div>
    </div>
  );
}

export default Home;



