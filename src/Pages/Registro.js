import React, { useState } from 'react';
import supabase from '../supabaseClient'; // Asegúrate de importar el cliente de Supabase
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
      // Registrar al usuario con supabase
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Si el usuario se ha creado exitosamente, agregar los datos adicionales (nombre, apellido, etc.)
      const { data, error: insertError } = await supabase
        .from('users') // Suponiendo que tienes una tabla 'users' para guardar información adicional
        .insert([
          {
            nombre: formData.nombre,
            apellido: formData.apellido,
            username: formData.username,
            password: formData.password,
            direccion: formData.direccion,
            telefono: formData.telefono,
            pais: formData.pais,
            email: formData.email,
             // ID del usuario creado en Supabase
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      console.log('Usuario registrado correctamente:', data);

      onClose(); // Cerrar el modal al registrar exitosamente
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert(error.message || 'Hubo un error en el registro.');
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
