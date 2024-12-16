import React, { useState } from 'react';
import Registro from './Registro'; // Importar el componente Registro
import supabase from '../../supabaseClient.mjs'; // Cliente de Supabase
import '../../styles/Login.css';

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
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', formData.username)
                .eq('password', formData.password)
                .single();

            if (error || !data) {
                throw new Error(error.message || 'Usuario o contraseña incorrectos');
            }

            console.log('Login exitoso:', data);

            // Guardar datos en localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Pasar los datos del usuario al componente padre y cerrar el modal
            onLogin(data);
            onClose();

            // Recargar la página después de iniciar sesión
            window.location.reload(); // Recargar la página

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert(error.message || 'Error al intentar iniciar sesión.');
        }
    };

    const handleCloseModal = () => {
        onClose(); // Cerrar el modal de login
    };

    const handleOpenRegister = () => {
        setIsRegisterOpen(true); // Abrir modal de registro
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false); // Cerrar modal de registro
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="input_form" onSubmit={handleLoginSubmit}>
                    {/* Botón de cerrar modal */}
                    <button className="boton_cerrar" onClick={handleCloseModal}>x</button>
                    <h2>Inicia sesión aquí</h2>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button className="button_login" type="submit">Ingresar</button>
                    <button
                        className="button_login"
                        type="button"
                        onClick={handleOpenRegister}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
            {isRegisterOpen && <Registro onClose={handleCloseRegister} />}
        </div>
    );
}

export default Login;
