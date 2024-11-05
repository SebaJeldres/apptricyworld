// src/pages/Recibo.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Recibo.css'; // Asegúrate de que este archivo exista

function Recibo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productos, totalDefinitivo, idPedido, usuario } = location.state; // Obtener datos pasados desde Boleta.js

  return (
    <div className="recibo-page">
      <div className="recibo-contenedor">
        <h1>¡Pedido Realizado con Éxito!</h1>
        <img src="https://example.com/icono-visto-bueno.png" alt="Ícono de éxito" />
        <p>Su pedido ha sido procesado y se encuentra en camino.</p>
        <h2>Resumen de la Compra</h2>
        <div className="datos-usuario">
          <p><strong>ID de Pedido:</strong> {idPedido}</p>
          <p><strong>Envío a:</strong> <a href="https://www.fedex.com" target="_blank" rel="noopener noreferrer">Seguimiento de Envío</a></p>
        </div>
        <div className="recibo-contenido">
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
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>Dirección:</strong> {usuario.direccion}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Monto Total: ${totalDefinitivo.toFixed(2)}</strong></p>
          </div>
        </div>
        <div className="botones">
          <button onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
}

export default Recibo;



