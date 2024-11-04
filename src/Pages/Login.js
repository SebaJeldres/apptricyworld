import React, { useState } from 'react';
import Registro from './Registro'; // Asegúrate de importar el nuevo componente
import '../styles/Login.css';

function Login({ onClose }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario:", formData.username);
    // Aquí podrías añadir la lógica para iniciar sesión
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Inicia sesión aquí</h2>
        <form onSubmit={handleLoginSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <button type="submit">Ingresar</button>
          <button type="button" onClick={() => setIsRegisterOpen(true)}>Registrarse</button>
        </form>
      </div>
      {isRegisterOpen && <Registro onClose={() => setIsRegisterOpen(false)} />} {/* Aquí se abre el modal de registro */}
    </div>
  );
}

export default Login;




