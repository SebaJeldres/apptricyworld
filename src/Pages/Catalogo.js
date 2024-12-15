import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import supabase from '../supabaseClient';
import '../styles/Catalogo.css';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('productos_chile')
          .select('*'); // Se elimina el filtro .eq('id', 1) para obtener todos los productos

        if (error) {
          console.error('Error fetching data from Supabase:', error);
          return;
        }

        console.log('Productos obtenidos:', data); // Verifica si los productos son correctos
        setProductos(data);
      } catch (error) {
        console.error('Error fetching products from Supabase:', error);
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
    setIsModalOpen(true);
  };

  return (
    <div className="catalogo-page">
      <h1>Catálogo de Triciclos</h1>
      <div className="catalogo-container">
        <button onClick={() => navigate('/crudProductos')}>Ir al crud de productos</button>
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
      </div>

      {isModalOpen && selectedProduct && (
        <div className="catalogo-modal-overlay">
          <div className="catalogo-modal-content">
            <div className="modal-left">
              <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="modal-image" />
            </div>
            <div className="modal-right modal-text-content">
              <h2>{selectedProduct.nombre}</h2>
              <p>Precio: ${selectedProduct.precio}</p>
              <p>Marca: {selectedProduct.marca}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Color: {selectedProduct.color}</p>
              <p>Medidas: {selectedProduct.medidas}</p>
              <p>Descripción: {selectedProduct.descripcion}</p>
              <div className="modal-buttons">
                <button onClick={handleCloseModal}>Cerrar</button>
                <button onClick={() => { handleAddToCart(selectedProduct); handleCloseModal(); }}>Añadir al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
