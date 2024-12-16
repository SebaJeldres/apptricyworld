import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Login from '../Modulos/GestionUsers/Login';
import '../styles/Header.css';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
    const navigate = useNavigate(); // Hook de navegación

    // Verificar si el usuario ya está logueado en el localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        try {
            const parsedUser = savedUser ? JSON.parse(savedUser) : null;
            if (parsedUser && parsedUser.username) {
                setUser(parsedUser); // Solo configura el usuario si los datos son válidos
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user'); // Limpia datos corruptos
        }
    }, []);

    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);

    const handleLogin = (userData) => {
        setUser(userData); // Guarda los datos del usuario
        localStorage.setItem('user', JSON.stringify(userData)); // Guarda en localStorage
        window.location.reload(); // Redirige a la página principal o donde desees
    };

    const handleLogout = () => {
        setUser(null); // Elimina los datos del usuario
        localStorage.removeItem('user'); // Elimina los datos del usuario de localStorage
        window.location.reload(); // Recargar la página para reflejar el cambio
    };

    const handleCartClick = (e) => {
        if (!user) {
            // Si el usuario no está logueado, redirige al login
            e.preventDefault();
            handleOpenLogin();
        }
    };

    return (
        <header className="header">
            <h1 className="logo"><Link to="/">TricyWorld</Link></h1>
            <nav className="navbar">
                <ul className="navbar-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li>
                        <Link
                            to="/carrito"
                            onClick={handleCartClick}
                            className={`carrito-button ${!user ? 'disabled' : ''}`}
                        >
                            <FaShoppingCart /> Carrito
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <div>
                                <span className="username">{user.username}</span>
                                <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
                            </div>
                        ) : (
                            <button onClick={handleOpenLogin} className="login-button">Login</button>
                        )}
                    </li>
                </ul>
            </nav>
            {isLoginOpen && <Login onClose={handleCloseLogin} onLogin={handleLogin} />} {/* Modal de Login */}
        </header>
    );
}

export default Header;
