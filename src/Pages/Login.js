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
                const errorMessage = response.data.message || 'Error desconocido al iniciar sesión';
                console.error('Error al iniciar sesión:', errorMessage);
                alert(errorMessage); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert(error.response?.data?.message || 'Error al intentar iniciar sesión.'); // Muestra un mensaje de error específico o genérico
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form class="input_form" onSubmit={handleLoginSubmit}>
                <button className="boton_cerrar" onClick={onClose}>x</button>
                <h2>Inicia sesión aquí</h2>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <button class="button_login" type="submit">Ingresar</button>
                    <button class="button_login" type="button" onClick={() => setIsRegisterOpen(true)}>Registrarse</button>
                </form>
            </div>
            {isRegisterOpen && <Registro onClose={() => setIsRegisterOpen(false)} />} {/* Aquí se abre el modal de registro */}
        </div>
    );
}

export default Login;






