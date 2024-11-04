import React, { useState } from 'react';
import '../styles/Registro.css';

function Registro({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    id: '',
    direccion: '',
    telefono: '',
    email: '',
    pais: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);
    // Aquí puedes añadir la lógica para registrar al usuario
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Registrarse</h2>
        <form onSubmit={handleRegisterSubmit} className="registro-form">
          <div className="form-row">
            <label>
              Nombre:
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label>
              Apellido:
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Username:
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
              ID:
              <input type="text" name="id" value={formData.id} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Dirección:
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
            </label>
            <label>
              Teléfono:
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              País:
              <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
            </label>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;

