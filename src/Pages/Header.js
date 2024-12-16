import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Login from '../Pages/Login';
import '../styles/Header.css';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
    const navigate = useNavigate(); // hook de navegación

    // Verificar si el usuario ya está logueado en el localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Cargar el usuario desde localStorage
        }
    }, []);

    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);
    const handleLogin = (userData) => {
        setUser(userData); // Guarda los datos del usuario
    };
    const handleLogout = () => {
        setUser(null); // Elimina los datos del usuario
        localStorage.removeItem('user'); // Elimina los datos del usuario de localStorage
    };

    const handleCartClick = (e) => {
        if (!user) {
            // Si el usuario no está logueado, evitar el click
            e.preventDefault();
        }
    };

    const handleProfileClick = (e) => {
        if (!user) {
            // Si el usuario no está logueado, evita el acceso al perfil y abre el login
            e.preventDefault();
            handleOpenLogin();  // Abre el modal de login
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
                        <Link
                            to="/perfil"
                            onClick={handleProfileClick}
                            className={`perfil-button ${!user ? 'disabled' : ''}`}
                        >
                            Perfil
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            // Muestra el nombre de usuario si está logueado
                            <span className="username">{user.username}</span>
                        ) : (
                            // Si no está logueado, muestra el botón de Login
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
