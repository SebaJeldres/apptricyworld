import React, { useState } from 'react';
import Registro from './Registro'; // Asegúrate de importar el nuevo componente
import axios from 'axios'; // Importa Axios
import '../styles/Login.css';

function Login({ onClose, onLogin }) {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            if (response.data.success) {
                console.log('Login exitoso:', response.data.user);
                onLogin(response.data.user); // Llama a la función onLogin con los datos del usuario
                onClose(); // Cierra el modal
            } else {
                console.error('Error al iniciar sesión:', response.data.message);
                alert(response.data.message); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            alert('Error al intentar iniciar sesión.'); // Muestra un mensaje de error genérico
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Inicia sesión aquí</h2>
                <form onSubmit={handleLoginSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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






