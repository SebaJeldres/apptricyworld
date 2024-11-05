// src/Pages/Catalogo.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Asegúrate de ajustar la ruta según tu estructura
import '../styles/Catalogo.css';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Accede a la función addToCart

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleOpenModal = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (producto) => {
    addToCart(producto);
    setMensaje(`El producto ${producto.nombre} se ha añadido al carrito con éxito.`);
    setIsModalOpen(true); // Abre el modal de éxito
  };

  return (
    <div className="catalogo-page">
      <h1>Catálogo de Triciclos</h1>
      <div className="catalogo-grid">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="card">
              <img src={producto.imagen} alt={producto.nombre} className="card-image" />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <div className="card-buttons">
                <button onClick={() => handleOpenModal(producto)}>Ver Detalles</button>
                <button onClick={() => handleAddToCart(producto)}>Añadir al Carrito</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-left">
              <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="modal-image" />
            </div>
            <div className="modal-right">
              <h2>{selectedProduct.nombre}</h2>
              <p>Precio: ${selectedProduct.precio}</p>
              <p>Marca: {selectedProduct.marca}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Color: {selectedProduct.color}</p>
              <p>Medidas: {selectedProduct.medidas}</p>
              <p>Descripción: {selectedProduct.descripcion}</p>
              <button onClick={handleCloseModal}>Cerrar Modal</button>
              <button onClick={() => { handleAddToCart(selectedProduct); handleCloseModal(); }}>Añadir al Carrito</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {mensaje && (
        <div className="mensaje-modal-overlay">
          <div className="mensaje-modal">
            <h2>Éxito</h2>
            <p>{mensaje}</p>
            <button onClick={() => setMensaje('')}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogo;









