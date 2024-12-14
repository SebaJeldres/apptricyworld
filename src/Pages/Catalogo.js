import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import supabase from '../supabaseClient';
import '../styles/Catalogo.css';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Consultar el producto con id = 1
        const { data, error } = await supabase
          .from('productos_chile')  // Asegúrate de que el nombre de la tabla sea correcto
          .select('*')  // Seleccionamos todos los campos
          .eq('id', 1);  // Filtro para obtener solo el producto con id = 1

        if (error) {
          console.error('Error fetching data from Supabase:', error);
          return;
        }

        console.log('Producto obtenido:', data); // Verifica si el producto se obtiene correctamente
        setProductos(data);  // Asignamos el producto a la variable de estado productos
      } catch (error) {
        console.error('Error fetching products from Supabase:', error); // Muestra cualquier error en la solicitud
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
        <div className="catalogo-modal-overlay">
          <div className="catalogo-modal-content">
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
              <button onClick={handleCloseModal}>Cerrar</button>
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
