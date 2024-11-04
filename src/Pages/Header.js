import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // Importar íconos
import '../styles/Header.css';

function Header() {
  return (
    <header className="header"> 
      <h1>TricyWorld</h1>
      <nav className="navbar">
        <ul className="navbar-links">
          <li className="search-container">
            <FaSearch className="search-icon" /> {/* Icono de búsqueda */}
            <input type="text" placeholder="Buscar..." className="search-bar" />
          </li>
          <li><Link to="/">Inicio</Link></li> {/* Enlace a Home */}
          <li><Link to="/nosotros">Nosotros</Link></li> {/* Enlace a Nosotros */}
          <li><Link to="/catalogo">Catálogo</Link></li> {/* Enlace a Catálogo */}
          <li><Link to="/carrito"><FaShoppingCart /> Carrito</Link></li> {/* Enlace a Carrito */}
          <li><Link to="/perfil">Perfil</Link></li> {/* Enlace a Perfil */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;




