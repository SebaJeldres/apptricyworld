import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Home from './Pages/Home';
import Perfil from './Pages/Perfil';
import Carrito from './Pages/Carrito'; // Importa el componente de carrito
import Catalogo from './Pages/Catalogo'; // Asegúrate de importar el catálogo si no lo has hecho
import Boleta from './Pages/Boleta';
import Recibo from './Pages/Recibo';
import Nosotros from './Pages/Nosotros';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrito" element={<Carrito />} /> {/* Ruta para el Carrito */}
          <Route path="/catalogo" element={<Catalogo />} /> {/* Ruta para el Catalogo */}
          <Route path="/Boleta" element={<Boleta />} /> {/* Ruta para el Catalogo */}
          <Route path="/recibo" element={<Recibo />} /> {/* Ruta para el Catalogo */}
          <Route path="/nosotros" element={<Nosotros />} /> {/* Ruta para el Catalogo */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


