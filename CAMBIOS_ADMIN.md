# Cambios del administrador

Se mantuvieron React, Bootstrap, las funciones y los estilos existentes. Los datos se guardan en localStorage de este navegador, sin conectar un servidor.

## Perfil

- `src/pages/admin/PerfilAdmin.jsx`: tarjeta con inicial y datos; formulario para cambiar nombre y correo. Revisa correos repetidos y actualiza la sesión al guardar.
- `src/assets/js/usuarios.js`: obtener y guardar administradores. El inicio de sesión ahora también reconoce las cuentas creadas desde el panel.
- `src/pages/admin/NuevoUsuario.jsx`: activa Guardar administrador, valida datos y evita correos repetidos.
- `src/pages/admin/UsuariosAdmin.jsx`: consulta las cuentas guardadas y sigue mostrando solamente administradores.

## Productos

- `src/assets/js/Datos.js`: agrega `obtenerProductos` y `guardarProductos`. Los datos originales siguen siendo el catálogo inicial.
- `src/pages/admin/NuevoProducto.jsx`: el mismo formulario sirve para crear y editar. Guarda nombre, precio, stock, categoría, foto, tamaño y descripción. En edición permite conservar la foto existente.
- `src/pages/admin/ProductosAdmin.jsx`: lista los productos guardados y permite eliminarlos con confirmación. Actualiza el listado y la paginación.
- `src/components/TarjetaProducto.jsx`: conecta Editar con su formulario y Eliminar con la función del listado.
- `src/assets/js/carrito.js`: lee el catálogo guardado. Usa los precios y stock actuales y deja fuera los productos eliminados.
- `src/pages/Productos.jsx` y `src/pages/DetalleProducto.jsx`: muestran también los productos creados y editados desde el panel.
- `src/components/Categorias.jsx`: los destacados consultan el catálogo actual; no muestran productos eliminados y reflejan nombres y fotos editados.

## Categorías

- `src/assets/js/categorias.js`: agrega `obtenerCategorias` y `guardarCategorias`.
- `src/pages/admin/NuevaCategoria.jsx`: guarda categorías nuevas y permite editar su nombre. Valida códigos y duplicados. Conserva el código durante la edición para mantener la relación con los productos.
- `src/pages/admin/CategoriasAdmin.jsx`: conecta Editar y Eliminar. Impide eliminar una categoría que todavía tiene productos asociados.
- `src/components/FiltroProductos.jsx`: carga las categorías guardadas; las nuevas aparecen en el filtro y en el formulario de productos.

## Pedidos y boleta

- `src/pages/admin/BoletaAdmin.jsx` (nuevo): muestra cliente, fecha, estado, productos, cantidades, precios, subtotales y total del pedido. Incluye Imprimir y Volver a pedidos.
- `src/pages/admin/PedidosAdmin.jsx`: activa Ver boleta para cada pedido.
- `src/layouts/LayoutAdmin.jsx`: agrega clases para ocultar el menú al imprimir.
- La boleta muestra los datos guardados al comprar; editar o eliminar un producto no cambia los precios de pedidos anteriores. Es un comprobante de demostración, no una boleta tributaria.

## Código compartido y rutas

- `src/components/ConfirmarEliminar.jsx` (nuevo): ventana de confirmación reutilizada en productos y categorías.
- `src/pages/admin/PanelAdmin.jsx`: calcula el resumen con los productos, categorías y administradores guardados.
- `src/App.jsx`: agrega las rutas de edición y boleta.
- `src/assets/css/admin.css`: estilos del perfil, ventana de eliminación, logo de la boleta e impresión.

## Verificación

- `src/pages/admin/Admin.test.jsx` (nuevo): 10 pruebas con datos aislados. Comprueban creación, edición, eliminación, duplicados, subida de foto, perfil, inicio de sesión del administrador creado, precios históricos y errores de guardado.
- Comando: `npm run test:run -- src/pages/admin/Admin.test.jsx`.
- También se comprobó la compilación y ESLint de los archivos modificados, y se revisaron edición, perfil y boleta en el navegador.
