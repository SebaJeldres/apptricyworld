import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Asegúrate de que tienes un contexto de carrito
import supabase from '../supabaseClient'; // Asegúrate de importar tu cliente de Supabase
import '../styles/Carrito.css';

function Carrito() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Obtenemos los productos del carrito desde el contexto
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

  // Verificar si el usuario está logueado y obtener su país desde Supabase
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // Si no hay usuario en localStorage, redirigir al login
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;

      // Obtener los datos del usuario desde Supabase
      const getUserData = async () => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('pais')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error obteniendo datos del usuario:', error);
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
      };

      getUserData();
    }
  }, [navigate]);

  // Calcular el total asegurando que solo se sumen números
  const total = cartItems.reduce((acc, producto) => {
    const precio = Number(producto.precio); // Asegurarse de que es un número
    return acc + (isNaN(precio) ? 0 : precio); // Solo sumar si es un número
  }, 0);

  const iva = total * 0.19; // IVA del 19%
  const envio = 5000; // Costo de envío fijo
  const totalDefinitivo = total + iva + envio; // Total con IVA y envío

  // Función para formatear la moneda según la configuración
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return (
    <div className="carrito-page">
      <div className="carrito-contenedor">
        <h1>{language === 'es' ? 'Tu Carrito' : 'Your Cart'}</h1>
        <div className="carrito-contenido">
          <div className="productos-lista">
            {cartItems.length > 0 ? (
              cartItems.map((producto, index) => (
                <div key={index} className="producto-card">
                  <p>Nombre:<strong>{producto.nombre}</strong></p>
                <p>Descripcion:<strong>{producto.descripcion}</strong></p>
                <p>Marca:<strong>{producto.marca}</strong></p>
                <p>{language === 'es' ? 'Costo' : 'Cost'}: {formatCurrency(Number(producto.precio))}</p>
                </div>
              ))
            ) : (
              <p>{language === 'es' ? 'No hay productos en el carrito.' : 'No items in the cart.'}</p>
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
          <button onClick={() => navigate('/catalogo')}>{language === 'es' ? 'Añadir más productos' : 'Add more products'}</button>
          <button onClick={() => navigate('/boleta')}>{language === 'es' ? 'Ir a pagar' : 'Go to payment'}</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
