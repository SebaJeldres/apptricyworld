// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './context/Header';
import Footer from './context/Footer';
import Home from './Pages/Home';
import Perfil from './Modulos/GestionUsers/Login';
import Carrito from './Modulos/GestionPedidos/Carrito';
import Catalogo from './Modulos/GestionPedidos/Catalogo';
import Boleta from './Modulos/GestionPedidos/Boleta';
import Recibo from './Modulos/GestionPedidos/Recibo';
import Nosotros from './Pages/Nosotros';
import { CartProvider } from './context/CartContext'; // Asegúrate de ajustar la ruta según tu estructura
import CrudProductos from './Modulos/GestionProductos/CrudProductos';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/boleta" element={<Boleta />} />
            <Route path="/recibo" element={<Recibo />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/crudProductos" element={<CrudProductos />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;




