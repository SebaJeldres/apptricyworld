import React, { useState } from 'react';
import '../styles/Catalogo.css'; // Asegúrate de que este archivo exista

const productos = [
  { id: 1, nombre: 'Triciclo Rojo', precio: 100, imagen: 'url_de_imagen_1', marca: 'Marca A', stock: 10, color: 'Rojo', medidas: '90x60x70 cm', descripcion: 'Triciclo para niños.' },
  { id: 2, nombre: 'Triciclo Azul', precio: 120, imagen: 'url_de_imagen_2', marca: 'Marca B', stock: 5, color: 'Azul', medidas: '90x60x70 cm', descripcion: 'Triciclo resistente.' },
  { id: 3, nombre: 'Triciclo Verde', precio: 110, imagen: 'url_de_imagen_3', marca: 'Marca C', stock: 8, color: 'Verde', medidas: '90x60x70 cm', descripcion: 'Triciclo para aventuras.' },
  { id: 4, nombre: 'Triciclo Amarillo', precio: 130, imagen: 'url_de_imagen_4', marca: 'Marca D', stock: 2, color: 'Amarillo', medidas: '90x60x70 cm', descripcion: 'Triciclo alegre.' },
  { id: 5, nombre: 'Triciclo Rosa', precio: 115, imagen: 'url_de_imagen_5', marca: 'Marca E', stock: 0, color: 'Rosa', medidas: '90x60x70 cm', descripcion: 'Triciclo para niñas.' },
  { id: 6, nombre: 'Triciclo Negro', precio: 125, imagen: 'url_de_imagen_6', marca: 'Marca F', stock: 4, color: 'Negro', medidas: '90x60x70 cm', descripcion: 'Triciclo elegante.' },
  { id: 7, nombre: 'Triciclo Blanco', precio: 140, imagen: 'url_de_imagen_7', marca: 'Marca G', stock: 3, color: 'Blanco', medidas: '90x60x70 cm', descripcion: 'Triciclo clásico.' },
  { id: 8, nombre: 'Triciclo Naranja', precio: 135, imagen: 'url_de_imagen_8', marca: 'Marca H', stock: 6, color: 'Naranja', medidas: '90x60x70 cm', descripcion: 'Triciclo vibrante.' },
  { id: 9, nombre: 'Triciclo Morado', precio: 145, imagen: 'url_de_imagen_9', marca: 'Marca I', stock: 7, color: 'Morado', medidas: '90x60x70 cm', descripcion: 'Triciclo divertido.' },
  { id: 10, nombre: 'Triciclo Gris', precio: 150, imagen: 'url_de_imagen_10', marca: 'Marca J', stock: 1, color: 'Gris', medidas: '90x60x70 cm', descripcion: 'Triciclo moderno.' },
  { id: 11, nombre: 'Triciclo Plateado', precio: 155, imagen: 'url_de_imagen_11', marca: 'Marca K', stock: 2, color: 'Plateado', medidas: '90x60x70 cm', descripcion: 'Triciclo premium.' },
  { id: 12, nombre: 'Triciclo Dorado', precio: 160, imagen: 'url_de_imagen_12', marca: 'Marca L', stock: 0, color: 'Dorado', medidas: '90x60x70 cm', descripcion: 'Triciclo exclusivo.' },
];

function Catalogo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <img src={producto.imagen} alt={producto.nombre} className="card-image" />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <div className="card-buttons">
              <button onClick={() => handleOpenModal(producto)}>Ver Detalles</button>
              <button>Añadir al Carrito</button>
            </div>
          </div>
        ))}
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


