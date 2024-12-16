import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import supabase from '../../supabaseClient.mjs';
import '../../styles/Catalogo.css';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [pais, setPais] = useState(''); // Estado para almacenar el país del usuario
  const [currency, setCurrency] = useState('MXN'); // Estado para la moneda
  const [symbol, setSymbol] = useState('$'); // Estado para el símbolo de la moneda
  const [language, setLanguage] = useState('es'); // Estado para el idioma

  // Mapa de países a configuraciones de idioma y moneda
  const countryConfig = {
    Chile: { language: 'es', currency: 'CLP', symbol: '$' },
    Mexico: { language: 'es', currency: 'MXN', symbol: '$' },
    España: { language: 'es', currency: 'EUR', symbol: '€' },
    Brasil: { language: 'pt', currency: 'BRL', symbol: 'R$' },
    Inglaterra: { language: 'en', currency: 'GBP', symbol: '£' },
  };

  // Verificar si el usuario ya está logueado en el localStorage y obtener su país desde Supabase
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Cargar el usuario desde localStorage
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userId = user.id;

        try {
          const { data, error } = await supabase
            .from('users')
            .select('pais')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error obteniendo el país del usuario:', error);
          } else {
            const userCountry = data.pais;
            setPais(userCountry);

            // Configurar el idioma, moneda y símbolo según el país
            if (countryConfig[userCountry]) {
              setLanguage(countryConfig[userCountry].language);
              setCurrency(countryConfig[userCountry].currency);
              setSymbol(countryConfig[userCountry].symbol);
            }
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Fetch productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('productos_chile')
          .select('*'); // Se obtiene todos los productos sin filtros

        if (error) {
          console.error('Error fetching data from Supabase:', error);
          return;
        }

        setProductos(data);
      } catch (error) {
        console.error('Error fetching products from Supabase:', error);
      }
    };

    fetchProductos();
  }, []);

  // Función para formatear la moneda según la configuración
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const handleOpenModal = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (producto) => {
    if (!user) {
      // Si no hay usuario logueado, mostramos un mensaje de advertencia
      setMensaje('Por favor, inicia sesión para añadir productos al carrito.');
      setIsModalOpen(true);
      return; // No añadir el producto si no está logueado
    }

    addToCart(producto);
    setMensaje(`El producto ${producto.nombre} se ha añadido al carrito con éxito.`);
    setIsModalOpen(true);
  };

  return (
    <div className="catalogo-page">
      <h1>{language === 'es' ? 'Catálogo de Triciclos' : 'Tricycle Catalog'}</h1>
      <div className="catalogo-container">
        <button onClick={() => navigate('/crudProductos')}>
          {language === 'es' ? 'Ir al CRUD de productos' : 'Go to Product CRUD'}
        </button>
        <div className="catalogo-grid">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="card">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-image"
                />
                <h3>{producto.nombre}</h3>
                <p>{language === 'es' ? 'Precio' : 'Price'}: {formatCurrency(producto.precio)}</p>
                <div className="card-buttons">
                  <button onClick={() => handleOpenModal(producto)}>
                    {language === 'es' ? 'Ver Detalles' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleAddToCart(producto)}
                    disabled={!user} // Deshabilitar el botón si no está logueado
                    className={!user ? 'disabled' : ''}
                  >
                    {language === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>{language === 'es' ? 'No hay productos disponibles.' : 'No products available.'}</p>
          )}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="catalogo-modal-overlay">
          <div className="catalogo-modal-content">
            <div className="modal-left">
              <img
                src={selectedProduct.imagen}
                alt={selectedProduct.nombre}
                className="modal-image"
              />
            </div>
            <div className="modal-right modal-text-content">
              <h2>{selectedProduct.nombre}</h2>
              <p>{language === 'es' ? 'Precio' : 'Price'}: {formatCurrency(selectedProduct.precio)}</p>
              <p>{language === 'es' ? 'Marca' : 'Brand'}: {selectedProduct.marca}</p>
              <p>{language === 'es' ? 'Stock' : 'Stock'}: {selectedProduct.stock}</p>
              <p>{language === 'es' ? 'Color' : 'Color'}: {selectedProduct.color}</p>
              <p>{language === 'es' ? 'Medidas' : 'Dimensions'}: {selectedProduct.medidas}</p>
              <p>{language === 'es' ? 'Descripción' : 'Description'}: {selectedProduct.descripcion}</p>
              <div className="modal-buttons">
                <button onClick={handleCloseModal}>
                  {language === 'es' ? 'Cerrar' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    handleCloseModal();
                  }}
                  disabled={!user} // Deshabilitar el botón si no está logueado
                  className={!user ? 'disabled' : ''}
                >
                  {language === 'es' ? 'Añadir al Carrito' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mensaje && (
        <div className="mensaje-modal-overlay">
          <div className="mensaje-modal">
            <h2>{language === 'es' ? 'Éxito' : 'Success'}</h2>
            <p>{mensaje}</p>
            <button onClick={() => setMensaje('')}>{language === 'es' ? 'Cerrar' : 'Close'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogo;
