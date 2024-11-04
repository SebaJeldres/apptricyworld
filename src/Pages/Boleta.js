// src/pages/Boleta.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Boleta.css'; // Asegúrate de que este archivo exista

function Boleta() {
  const navigate = useNavigate();

  // Datos de ejemplo para el usuario y los productos en el carrito
  const usuario = {
    nombre_user: 'Juan',
    apellido: 'Pérez',
    direccion: 'Av. Siempre Viva 123',
    correo: 'juan.perez@example.com',
    telefono: '123456789',
    idPedido: '123456',
  };

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
    <div className="boleta-page">
      <div className="boleta-contenedor">
        <h1>Tu Boleta</h1>
        <div className="datos-usuario">
          <h2>Datos del Usuario</h2>
          <p><strong>Nombre:</strong> {usuario.nombre_user} {usuario.apellido}</p>
          <p><strong>Dirección:</strong> {usuario.direccion}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          <p><strong>ID de Pedido:</strong> {usuario.idPedido}</p>
        </div>
        <div className="boleta-contenido">
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
          <button onClick={() => navigate('/recibo', { state: { productos, totalDefinitivo, idPedido: usuario.idPedido, usuario } })}>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;



