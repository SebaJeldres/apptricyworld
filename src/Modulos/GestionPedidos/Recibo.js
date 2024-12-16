import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Recibo.css'; 

function Recibo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productos, totalDefinitivo, idPedido } = location.state; // Obtener datos pasados desde Boleta.js
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

  // Función para formatear la moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  if (!usuario) {
    return <p>{language === 'es' ? 'Cargando...' : 'Loading...'}</p>; // Mostrar un mensaje mientras los datos se cargan
  }

  return (
    <div className="recibo-page">
      <div className="recibo-contenedor">
        <h1>{language === 'es' ? '¡Pedido Realizado con Éxito!' : 'Order Completed Successfully!'}</h1>
        <img src="https://example.com/icono-visto-bueno.png" alt="Ícono de éxito" />
        <p>{language === 'es' ? 'Su pedido ha sido procesado y se encuentra en camino.' : 'Your order has been processed and is on its way.'}</p>
        <h2>{language === 'es' ? 'Resumen de la Compra' : 'Purchase Summary'}</h2>
        <div className="datos-usuario">
          <p><strong>{language === 'es' ? 'ID de Pedido' : 'Order ID'}:</strong> {idPedido}</p>
          <p><strong>{language === 'es' ? 'Envío a' : 'Shipping to'}:</strong> <a href="https://www.fedex.com" target="_blank" rel="noopener noreferrer">{language === 'es' ? 'Seguimiento de Envío' : 'Track Shipment'}</a></p>
        </div>
        <div className="recibo-contenido">
          <div className="productos-lista">
            {productos.map((producto) => (
              <div key={producto.id} className="producto-card">
                <p>Nombre:<strong>{producto.nombre}</strong></p>
                <p>Descripcion:<strong>{producto.descripcion}</strong></p>
                <p>Marca:<strong>{producto.marca}</strong></p>
                <p>{language === 'es' ? 'Costo' : 'Cost'}: {formatCurrency(Number(producto.precio))}</p>
              </div>
            ))}
          </div>
          <div className="detalles-pago">
            <h2>{language === 'es' ? 'Detalles de Pago' : 'Payment Details'}</h2>
            <p><strong>{language === 'es' ? 'Nombre' : 'Name'}:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>{language === 'es' ? 'Dirección' : 'Address'}:</strong> {usuario.direccion}</p>
            <p><strong>{language === 'es' ? 'Correo' : 'Email'}:</strong> {usuario.email}</p>
            <p><strong>{language === 'es' ? 'Teléfono' : 'Phone'}:</strong> {usuario.telefono}</p>
            <p><strong>{language === 'es' ? 'Monto Total' : 'Total Amount'}: {formatCurrency(totalDefinitivo)}</strong></p>
          </div>
        </div>
        <div className="botones">
          <button onClick={() => navigate('/')}>
            {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recibo;
