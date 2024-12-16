import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 
import '../../styles/Boleta.css';

function Boleta() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Accede a los elementos del carrito
  const [usuario, setUsuario] = useState(null); // Estado para los datos del usuario
  const [pais, setPais] = useState(''); // Estado para almacenar el país del usuario
  const [currency, setCurrency] = useState('MXN'); // Estado para la moneda
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const [symbol, setSymbol] = useState('$'); // Estado para el símbolo de la moneda

  // Mapa de países a configuraciones de idioma y moneda
  const countryConfig = {
    Chile: { language: 'es', currency: 'CLP', symbol: '$' },
    Mexico: { language: 'es', currency: 'MXN', symbol: '$' },
    España: { language: 'es', currency: 'EUR', symbol: '€' },
    Brasil: { language: 'pt', currency: 'BRL', symbol: 'R$' },
    Inglaterra: { language: 'en', currency: 'GBP', symbol: '£' },
  };

  // Obtener los datos del usuario desde localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUsuario(JSON.parse(userData)); // Cargar los datos del usuario si están en localStorage
    } else {
      // Si no hay datos de usuario en localStorage, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  // Configurar idioma y moneda según el país del usuario
  useEffect(() => {
    if (usuario) {
      const userCountry = usuario.pais; // Asumimos que el país está en los datos del usuario

      if (countryConfig[userCountry]) {
        setPais(userCountry);
        setLanguage(countryConfig[userCountry].language);
        setCurrency(countryConfig[userCountry].currency);
        setSymbol(countryConfig[userCountry].symbol);
      }
    }
  }, [usuario]);

  if (!usuario) {
    return <p>Cargando...</p>; // Mostrar un mensaje mientras los datos se cargan
  }

  // Calcular el total con los productos del carrito
  const total = cartItems.reduce((acc, producto) => acc + (Number(producto.precio) || 0), 0);
  const iva = total * 0.19; // 19% de IVA
  const envio = 5000; // Costo de envío
  const totalDefinitivo = total + iva + envio; // Total definitivo

  // Función para formatear la moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return (
    <div className="boleta-page">
      <div className="boleta-contenedor">
        <h1>{language === 'es' ? 'Tu Boleta' : 'Your Receipt'}</h1>
        <div className="datos-usuario">
          <h2>{language === 'es' ? 'Datos del Usuario' : 'User Details'}</h2>
          <div className="usuario-datos-contenedor">
            <div className="usuario-dato">
              <p><strong>{language === 'es' ? 'Nombre' : 'Name'}:</strong> {usuario.nombre} {usuario.apellido}</p>
              <p><strong>{language === 'es' ? 'Correo' : 'Email'}:</strong> {usuario.email}</p>
              <p><strong>{language === 'es' ? 'ID de Pedido' : 'Order ID'}:</strong> 01</p>
            </div>
            <div className="usuario-dato">
              <p><strong>{language === 'es' ? 'Dirección' : 'Address'}:</strong> {usuario.direccion}</p>
              <p><strong>{language === 'es' ? 'Teléfono' : 'Phone'}:</strong> {usuario.telefono}</p>
            </div>
          </div>
        </div>
        <div className="boleta-contenido">
          <div className="productos-lista">
            {cartItems.length > 0 ? (
              cartItems.map((producto) => (
                <div key={producto.id} className="producto-card">
                  <p><strong>{producto.nombre}</strong></p>
                  <p>{language === 'es' ? 'Costo' : 'Cost'}: {formatCurrency(Number(producto.precio))}</p>
                </div>
              ))
            ) : (
              <p>{language === 'es' ? 'No hay productos en el carrito.' : 'No products in the cart.'}</p>
            )}
          </div>
          <div className="detalles-pago">
            <h2>{language === 'es' ? 'Detalles de Pago' : 'Payment Details'}</h2>
            <p>{language === 'es' ? 'Total Productos' : 'Total Products'}: {formatCurrency(total)}</p>
            <p>{language === 'es' ? 'IVA (19%)' : 'VAT (19%)'}: {formatCurrency(iva)}</p>
            <p>{language === 'es' ? 'Envío' : 'Shipping'}: {formatCurrency(envio)}</p>
            <hr />
            <p><strong>{language === 'es' ? 'Monto Total' : 'Total Amount'}: {formatCurrency(totalDefinitivo)}</strong></p>
          </div>
        </div>
        <div className="botones">
          <button onClick={() => navigate('/catalogo')}>
            {language === 'es' ? 'Añadir más productos' : 'Add more products'}
          </button>
          <button onClick={() => navigate('/recibo', { state: { productos: cartItems, totalDefinitivo, idPedido: usuario.idPedido, usuario } })}>
            {language === 'es' ? 'Ir a pagar' : 'Proceed to Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;
