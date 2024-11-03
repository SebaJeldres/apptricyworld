import React from 'react';
import '../styles/Header.css';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // Importar los íconos de carrito y lupa

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
          <li><a href="#inicio">Perfil</a></li>
          <li><a href="#servicios">Catalogo</a></li>
          <li><a href="#nosotros"><FaShoppingCart /> Carrito</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;



