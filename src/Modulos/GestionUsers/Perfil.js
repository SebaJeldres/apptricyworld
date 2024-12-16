import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient.mjs'; // Importa el cliente de Supabase
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../styles/Perfil.css';

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
  const navigate = useNavigate(); // Hook de navegación

  // Verifica si hay un usuario logueado en localStorage cuando el componente se monta

  // Función para abrir el modal de edición de datos
  const handleOpenModal = () => setIsModalOpen(true);
  
  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para manejar el envío del formulario de edición de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          nombre: formData.nombre,
          apellido: formData.apellido,
          username: formData.username,
          direccion: formData.direccion,
          telefono: formData.telefono,
          email: formData.email,
          pais: formData.pais,
        })
        .eq('id', formData.id); // Actualiza el usuario por su ID

      if (error) {
        throw new Error(error.message);
      }

      setUserData(formData); // Actualiza el estado con los nuevos datos
      handleCloseModal(); // Cierra el modal de edición
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    setUserData({}); // Restablece los datos del usuario
    setFormData({}); // Restablece el formulario
    navigate('/'); // Redirige a la página principal
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
          <p><strong>Dirección:</strong> {userData.direccion}</p>
          <p><strong>Teléfono:</strong> {userData.telefono}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>País:</strong> {userData.pais}</p>
          <button onClick={handleOpenModal}>Modificar Datos</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>

        {/* Modal para editar datos del usuario */}
        {isModalOpen && (
          <div className="modificar-modal-overlay">
            <div className="modificar-modal-content">
              <h2>Modificar Datos</h2>
              <form className="modificar-form" onSubmit={handleSubmit}>
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
                      value={formData.password || ''}
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
                <button className="modificar-submit-button" type="submit">Guardar Cambios</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
