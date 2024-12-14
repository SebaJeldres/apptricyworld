import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de importar Axios
import '../styles/Registro.css';

function Registro({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    direccion: '',
    telefono: '',
    email: '',
    pais: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);

      if (response.status === 201) {
        console.log("Usuario registrado:", response.data);
        onClose(); // Cierra el modal al registrar exitosamente
      } else {
        console.error("Error al registrar usuario:", response.data);
        alert(response.data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert(error.response?.data?.message || "Error de red, por favor intenta nuevamente.");
    }
  };

  return (
    <div className="registro-modal-overlay">
      <div className="registro-modal-content">
      <button className="registro-close-button" onClick={onClose}>X</button>
        <h2 className="registro-title">Registrarse</h2>
        <form onSubmit={handleRegisterSubmit} className="registro-form">
          <div className="registro-form-row">
            <label className="registro-label">
              Nombre:
              <input className="registro-input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label className="registro-label">
              Apellido:
              <input className="registro-input" type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
            </label>
          </div>
          <div className="registro-form-row">
            <label className="registro-label">
              Username:
              <input className="registro-input" type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label className="registro-label">
              Contraseña:
              <input className="registro-input" type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
          </div>
          <div className="registro-form-row">
            <label className="registro-label">
              Dirección:
              <input className="registro-input" type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
            </label>
            <label className="registro-label">
              Teléfono:
              <input className="registro-input" type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
            </label>
          </div>
          <div className="registro-form-row">
            <label className="registro-label">
              Email:
              <input className="registro-input" type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label className="registro-label">
              País:
              <input className="registro-input" type="text" name="pais" value={formData.pais} onChange={handleChange} />
            </label>
          </div>
          <button className="registro-submit-button" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;









