// src/pages/Nosotros.js
import React, { useState } from 'react';
import '../styles/Nosotros.css'; // Asegúrate de que este archivo exista

function Nosotros() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    // Reiniciar el formulario
    setFormData({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className="nosotros-page">
      <div className="nosotros-contenedor">
        <div className="parrafo">
          <h2>¿Quiénes Somos?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="parrafo">
          <h2>Nuestra Misión</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input 
              type="email" 
              id="correo" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              value={formData.mensaje} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Nosotros;

