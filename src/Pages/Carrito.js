// src/Pages/Carrito.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Carrito.css';

function Carrito() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Calcular el total asegurando que solo se sumen números
  const total = cartItems.reduce((acc, producto) => {
    const precio = Number(producto.precio); // Asegurarse de que es un número
    return acc + (isNaN(precio) ? 0 : precio); // Solo sumar si es un número
  }, 0);
  
  const iva = total * 0.19;
  const envio = 5000;
  const totalDefinitivo = total + iva + envio;

  return (
    <div className="carrito-page">
      <div className="carrito-contenedor">
        <h1>Tu Carrito</h1>
        <div className="carrito-contenido">
          <div className="productos-lista">
            {cartItems.length > 0 ? (
              cartItems.map((producto, index) => (
                <div key={index} className="producto-card">
                  <p><strong>{producto.nombre}</strong></p>
                  <p>Costo: ${producto.precio}</p>
                </div>
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>
          <div className="detalles-pago">
            <h2>Detalles de Pago</h2>
            <p>Total Productos: ${total.toFixed(2)}</p>
            <p>IVA (19%): ${iva.toFixed(2)}</p>
            <p>Envío: ${envio.toFixed(2)}</p>
            <hr />
            <p><strong>Monto Total: ${totalDefinitivo.toFixed(2)}</strong></p>
          </div>
        </div>
        <div className="botones">
          <button onClick={() => navigate('/catalogo')}>Añadir más productos</button>
          <button onClick={() => navigate('/boleta')}>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;


