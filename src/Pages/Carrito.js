// src/pages/Carrito.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Carrito.css'; // Asegúrate de que este archivo exista

function Carrito() {
  const navigate = useNavigate();

  // Datos de ejemplo para los productos en el carrito
  const productos = [
    { id: 1, nombre: 'Triciclo 1', costo: 50 },
    { id: 2, nombre: 'Triciclo 2', costo: 75 },
    { id: 3, nombre: 'Triciclo 3', costo: 60 },
  ];

  // Calcular el total
  const total = productos.reduce((acc, producto) => acc + producto.costo, 0);
  const iva = total * 0.19; // 19% de IVA
  const envio = 5000; // Costo de envío
  const totalDefinitivo = total + iva + envio; // Total definitivo

  return (
    <div className="carrito-page">
      <div className="carrito-contenedor">
        <h1>Tu Carrito</h1>
        <div className="carrito-contenido">
          <div className="productos-lista">
            {productos.map((producto) => (
              <div key={producto.id} className="producto-card">
                <p><strong>{producto.nombre}</strong></p>
                <p>Costo: ${producto.costo}</p>
              </div>
            ))}
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


