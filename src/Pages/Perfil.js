import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Perfil.css';

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    id: '',
    direccion: '',
    telefono: '',
    email: '',
    pais: '',
  });

  const [formData, setFormData] = useState(userData);

  // Fetch user data from the API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios/001'); // Ajusta la URL según tu API
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/usuarios/${formData.id}`, formData); // Ajusta la URL según tu API
      setUserData(formData);
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <div className="perfil-page">
      <div className="perfil-menu">
        <h2>Mi Cuenta</h2>
        <ul>
          <li>Pedidos</li>
        </ul>
        <div className="orders-cards">
          <div className="order-card">Pedidos Realizados</div>
          <div className="order-card">Pedidos en Transcurso</div>
          <div className="order-card">Pedidos Cancelados</div>
        </div>
      </div>

      <div className="perfil-content">
        <h1>Perfil del Usuario</h1>
        <div className="user-info">
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Apellido:</strong> {userData.apellido}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Dirección:</strong> {userData.direccion}</p>
          <p><strong>Teléfono:</strong> {userData.telefono}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>País:</strong> {userData.pais}</p>
          <button onClick={handleOpenModal}>Modificar Datos</button>
        </div>

        {isModalOpen && (
  <div className="modificar-modal-overlay">
    <div className="modificar-modal-content">
      <h2>Modificar Datos</h2>
      <form className="modificar-form">
        <div className="modificar-form-row">
          <label className="modificar-label">
            Nombre:
            <input
              className="modificar-input"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          <label className="modificar-label">
            Apellido:
            <input
              className="modificar-input"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modificar-form-row">
          <label className="modificar-label">
            Username:
            <input
              className="modificar-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label className="modificar-label">
            Contraseña:
            <input
              className="modificar-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modificar-form-row">
          <label className="modificar-label">
            Dirección:
            <input
              className="modificar-input"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </label>
          <label className="modificar-label">
            Teléfono:
            <input
              className="modificar-input"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modificar-form-row">
          <label className="modificar-label">
            Email:
            <input
              className="modificar-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="modificar-label">
            País:
            <input
              className="modificar-input"
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="modificar-submit-button" type="submit">Registrarse</button>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default Perfil;



