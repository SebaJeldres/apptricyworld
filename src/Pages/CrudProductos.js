import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Asegúrate de que la ruta sea correcta
import '../styles/CrudProductos.css';

function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false); // Controla el estado del modal
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    marca: '',
    descripcion: '',
    medidas: '',
    stock: '',
    color: '',
  });

  // Fetch productos desde la base de datos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase.from('productos_chile').select('*');
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

  const verDetalles = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarFormulario = () => {
    setProductoSeleccionado(null);
    setModalAbierto(false); // Cerrar el modal cuando se cierra el formulario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNuevoProductoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const modificarProducto = async () => {
    try {
      const { id, ...datosActualizados } = productoSeleccionado;
      const { error } = await supabase
        .from('productos_chile')
        .update(datosActualizados)
        .eq('id', id);

      if (error) {
        console.error('Error al modificar el producto:', error);
        return;
      }

      // Actualizar el estado local con los datos modificados
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === id ? { ...prod, ...datosActualizados } : prod
        )
      );
      alert('Producto modificado con éxito');
      cerrarFormulario();
    } catch (error) {
      console.error('Error al intentar modificar el producto:', error);
    }
  };

  const eliminarProducto = async () => {
    try {
      const { id } = productoSeleccionado;
      const { error } = await supabase
        .from('productos_chile')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error al eliminar el producto:', error);
        return;
      }

      // Eliminar el producto de la lista en el estado local
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      alert('Producto eliminado con éxito');
      cerrarFormulario();
    } catch (error) {
      console.error('Error al intentar eliminar el producto:', error);
    }
  };

  const agregarProducto = async () => {
    try {
      const { error } = await supabase
        .from('productos_chile')
        .insert([nuevoProducto]);

      if (error) {
        console.error('Error al agregar el producto:', error);
        return;
      }

      // Agregar el nuevo producto a la lista en el estado local
      setProductos((prev) => [...prev, { ...nuevoProducto, id: Date.now() }]);
      alert('Producto agregado con éxito');
      cerrarFormulario();
    } catch (error) {
      console.error('Error al intentar agregar el producto:', error);
    }
  };

  return (
    <div className="CrudProductos-page">
      <h1>Gestión de Productos</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.marca}</td>
                <td>
                  <button className="btn-detalles" onClick={() => verDetalles(producto)}>
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Cargando productos...</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn-agregar" onClick={() => setModalAbierto(true)}>
        Agregar Producto
      </button>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Agregar Nuevo Producto</h2>
            <form className="form-Crud">
              <label className="label-Crud">
                Nombre:
                <input
                  className="input-Crud"
                  type="text"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Precio:
                <input
                  className="input-Crud"
                  type="text"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Marca:
                <input
                  className="input-Crud"
                  type="text"
                  name="marca"
                  value={nuevoProducto.marca}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Descripción:
                <input
                  className="input-Crud"
                  type="text"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Medidas:
                <input
                  className="input-Crud"
                  type="text"
                  name="medidas"
                  value={nuevoProducto.medidas}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Stock:
                <input
                  className="input-Crud"
                  type="text"
                  name="stock"
                  value={nuevoProducto.stock}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                Color:
                <input
                  className="input-Crud"
                  type="text"
                  name="color"
                  value={nuevoProducto.color}
                  onChange={handleNuevoProductoChange}
                />
              </label>
            </form>
            <div className="botones-acciones">
              <button className="btn-agregar" onClick={agregarProducto}>
                Agregar
              </button>
              <button className="btn-cerrar" onClick={cerrarFormulario}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {productoSeleccionado && (
        <div className="formulario-detalles">
          <div className="formulario-contenido">
            <h2>Detalles del Producto</h2>
            <form className="form-Crud">
              <label className="label-Crud">
                Nombre:
                <input
                  className="input-Crud"
                  type="text"
                  name="nombre"
                  value={productoSeleccionado.nombre}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Precio:
                <input
                  className="input-Crud"
                  type="text"
                  name="precio"
                  value={productoSeleccionado.precio}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Marca:
                <input
                  className="input-Crud"
                  type="text"
                  name="marca"
                  value={productoSeleccionado.marca}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Descripción:
                <input
                  className="input-Crud"
                  type="text"
                  name="descripcion"
                  value={productoSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Medidas:
                <input
                  className="input-Crud"
                  type="text"
                  name="medidas"
                  value={productoSeleccionado.medidas}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Stock:
                <input
                  className="input-Crud"
                  type="text"
                  name="stock"
                  value={productoSeleccionado.stock}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                Color:
                <input
                  className="input-Crud"
                  type="text"
                  name="color"
                  value={productoSeleccionado.color}
                  onChange={handleChange}
                />
              </label>
            </form>
            <div className="botones-acciones">
              <button className="btn-modificar" onClick={modificarProducto}>
                Modificar
              </button>
              <button className="btn-eliminar" onClick={eliminarProducto}>
                Eliminar
              </button>
              <button className="btn-cerrar" onClick={cerrarFormulario}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudProductos;
