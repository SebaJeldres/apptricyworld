import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Asegúrate de ajustar la ruta según tu estructura
import '../styles/Boleta.css'; // Asegúrate de que este archivo exista

function Boleta() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Accede a los elementos del carrito

  // Datos de ejemplo para el usuario
  const usuario = {
    nombre_user: 'Juan',
    apellido: 'Pérez',
    direccion: 'Av. Siempre Viva 123',
    correo: 'juan.perez@example.com',
    telefono: '123456789',
    idPedido: '123456',
  };

  // Calcular el total con los productos del carrito
  const total = cartItems.reduce((acc, producto) => acc + (Number(producto.precio) || 0), 0); // Asegúrate de que precio sea un número
  const iva = total * 0.19; // 19% de IVA
  const envio = 5000; // Costo de envío
  const totalDefinitivo = total + iva + envio; // Total definitivo

  return (
    <div className="boleta-page">
      <div className="boleta-contenedor">
        <h1>Tu Boleta</h1>
        <div className="datos-usuario">
          <h2>Datos del Usuario</h2>
          <div className="usuario-datos-contenedor">
            <div className="usuario-dato">
              <p><strong>Nombre:</strong> {usuario.nombre_user} {usuario.apellido}</p>
              <p><strong>Correo:</strong> {usuario.correo}</p>
              <p><strong>ID de Pedido:</strong> {usuario.idPedido}</p>
            </div>
            <div className="usuario-dato">
              <p><strong>Dirección:</strong> {usuario.direccion}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            </div>
          </div>
        </div>
        <div className="boleta-contenido">
          <div className="productos-lista">
            {cartItems.length > 0 ? (
              cartItems.map((producto) => (
                <div key={producto.id} className="producto-card">
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
          <button onClick={() => navigate('/recibo', { state: { productos: cartItems, totalDefinitivo, idPedido: usuario.idPedido, usuario } })}>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;
