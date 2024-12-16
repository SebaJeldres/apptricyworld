import React, { useState } from 'react';
import Registro from './Registro'; // Asegúrate de importar el nuevo componente
import supabase from '../../supabaseClient.mjs'; // Importa el cliente de Supabase
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

            // Pasar los datos del usuario al parent y cerrar el modal
            onLogin(data);
            onClose();

            // Recargar la página después del login
            window.location.reload();

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert(error.message || 'Error al intentar iniciar sesión.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="input_form" onSubmit={handleLoginSubmit}>
                    <button className="boton_cerrar" onClick={onClose}>x</button>
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
                        onClick={() => setIsRegisterOpen(true)}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
            {isRegisterOpen && <Registro onClose={() => setIsRegisterOpen(false)} />}
        </div>
    );
}

export default Login;
