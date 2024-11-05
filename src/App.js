// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Home from './Pages/Home';
import Perfil from './Pages/Perfil';
import Carrito from './Pages/Carrito';
import Catalogo from './Pages/Catalogo';
import Boleta from './Pages/Boleta';
import Recibo from './Pages/Recibo';
import Nosotros from './Pages/Nosotros';
import { CartProvider } from './context/CartContext'; // Asegúrate de ajustar la ruta según tu estructura

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
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;




