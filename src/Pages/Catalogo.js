import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import '../styles/Catalogo.css';

function Catalogo() {
  const [productos, setProductos] = useState([]); // Estado para almacenar productos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // UseEffect para obtener productos de la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos'); // Cambia la URL según tu API
        console.log('Productos obtenidos:', response.data); // Verifica la respuesta
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
                <button>Añadir al Carrito</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p> // Mensaje para el caso de que no haya productos
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
              <button>Añadir al Carrito</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogo;




