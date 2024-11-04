import React, { useState } from 'react';
import '../styles/Perfil.css';

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    username: 'juanperez123',
    id: '001',
    direccion: 'Av. Siempre Viva 123',
    telefono: '1234567890',
    email: 'juan.perez@example.com',
    pais: 'México',
  });

  const [formData, setFormData] = useState(userData);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    handleCloseModal();
  };

  return (
    <div className="perfil-page">
      <div className="perfil-menu">
        <h2>Mi Cuenta</h2>
        <ul>
          <li>Datos Personales</li>
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
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Modificar Datos</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre:
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                </label>
                <label>
                  Username:
                  <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                  ID:
                  <input type="text" name="id" value={formData.id} onChange={handleChange} />
                </label>
                <label>
                  Dirección:
                  <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
                </label>
                <label>
                  Teléfono:
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                  País:
                  <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
                </label>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={handleCloseModal}>Cancelar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;


