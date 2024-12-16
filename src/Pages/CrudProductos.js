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
  const [pais, setPais] = useState(''); // Para almacenar el país del usuario
  const [language, setLanguage] = useState('es'); // Idioma por defecto
  const [currency, setCurrency] = useState('MXN'); // Moneda por defecto
  const [symbol, setSymbol] = useState('$'); // Símbolo de la moneda

  // Mapa de países a configuraciones de idioma y moneda
  const countryConfig = {
    Chile: { language: 'es', currency: 'CLP', symbol: '$' },
    Mexico: { language: 'es', currency: 'MXN', symbol: '$' },
    España: { language: 'es', currency: 'EUR', symbol: '€' },
    Brasil: { language: 'pt', currency: 'BRL', symbol: 'R$' },
    Inglaterra: { language: 'en', currency: 'GBP', symbol: '£' },
  };

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

  // Detectar el país del usuario
  useEffect(() => {
    const fetchUserCountry = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        // Asumimos que el usuario tiene un campo 'pais' en su perfil
        const userCountry = user.pais;

        setPais(userCountry);

        if (countryConfig[userCountry]) {
          setLanguage(countryConfig[userCountry].language);
          setCurrency(countryConfig[userCountry].currency);
          setSymbol(countryConfig[userCountry].symbol);
        }
      }
    };

    fetchUserCountry();
  }, []);

  // Formatear los precios según la configuración de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

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
      <h1>{language === 'es' ? 'Gestión de Productos' : 'Product Management'}</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>{language === 'es' ? 'Nombre' : 'Name'}</th>
            <th>{language === 'es' ? 'Precio' : 'Price'}</th>
            <th>{language === 'es' ? 'Stock' : 'Stock'}</th>
            <th>{language === 'es' ? 'Marca' : 'Brand'}</th>
            <th>{language === 'es' ? 'Acciones' : 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{formatCurrency(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td>{producto.marca}</td>
                <td>
                  <button className="btn-detalles" onClick={() => verDetalles(producto)}>
                    {language === 'es' ? 'Ver detalles' : 'View details'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">{language === 'es' ? 'Cargando productos...' : 'Loading products...'}</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn-agregar" onClick={() => setModalAbierto(true)}>
        {language === 'es' ? 'Agregar Producto' : 'Add Product'}
      </button>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>{language === 'es' ? 'Agregar Nuevo Producto' : 'Add New Product'}</h2>
            <form className="form-Crud">
              <label className="label-Crud">
                {language === 'es' ? 'Nombre:' : 'Name:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Precio:' : 'Price:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Marca:' : 'Brand:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="marca"
                  value={nuevoProducto.marca}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Descripción:' : 'Description:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Medidas:' : 'Dimensions:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="medidas"
                  value={nuevoProducto.medidas}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Stock:' : 'Stock:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="stock"
                  value={nuevoProducto.stock}
                  onChange={handleNuevoProductoChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Color:' : 'Color:'}
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
                {language === 'es' ? 'Agregar' : 'Add'}
              </button>
              <button className="btn-cerrar" onClick={cerrarFormulario}>
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {productoSeleccionado && (
        <div className="formulario-detalles">
          <div className="formulario-contenido">
            <h2>{language === 'es' ? 'Detalles del Producto' : 'Product Details'}</h2>
            <form className="form-Crud">
              <label className="label-Crud">
                {language === 'es' ? 'Nombre:' : 'Name:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="nombre"
                  value={productoSeleccionado.nombre}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Precio:' : 'Price:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="precio"
                  value={productoSeleccionado.precio}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Marca:' : 'Brand:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="marca"
                  value={productoSeleccionado.marca}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Descripción:' : 'Description:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="descripcion"
                  value={productoSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Medidas:' : 'Dimensions:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="medidas"
                  value={productoSeleccionado.medidas}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Stock:' : 'Stock:'}
                <input
                  className="input-Crud"
                  type="text"
                  name="stock"
                  value={productoSeleccionado.stock}
                  onChange={handleChange}
                />
              </label>
              <label className="label-Crud">
                {language === 'es' ? 'Color:' : 'Color:'}
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
                {language === 'es' ? 'Modificar' : 'Modify'}
              </button>
              <button className="btn-eliminar" onClick={eliminarProducto}>
                {language === 'es' ? 'Eliminar' : 'Delete'}
              </button>
              <button className="btn-cerrar" onClick={cerrarFormulario}>
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudProductos;
