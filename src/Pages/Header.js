import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Login from '../Pages/Login';
import '../styles/Header.css';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);
    const handleLogin = (userData) => {
        setUser(userData); // Guarda los datos del usuario
    };
    const handleLogout = () => {
        setUser(null); // Elimina los datos del usuario
    };

    return (
        <header className="header"> 
            <h1>TricyWorld</h1>
            <nav className="navbar">
                <ul className="navbar-links">
                    <li className="search-container">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Buscar..." className="search-bar" />
                    </li>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li><Link to="/carrito"><FaShoppingCart /> Carrito</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li>
                        {user ? (
                            <button onClick={handleLogout} className="login-button">Cerrar sesión</button>
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






