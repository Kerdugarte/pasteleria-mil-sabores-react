# Alcance actual de la entrega 2

Este archivo reemplaza el registro anterior de cambios.

## Funciones para demostrar
- Productos filtrados por categoría. La página pública de Categorías fue retirada.
- Carrito, checkout con retiro o envío, pago simulado correcto y con error.
- Primera compra con 10% automático; código DUOC40 con 40%, sin acumular descuentos. Halloween se consulta por WhatsApp.
- Pedidos y boletas con sus productos, precios y total guardados al comprar.
- Stock crítico (5 unidades o menos) visible en Inicio; actualización desde la edición de Productos. Una compra correcta descuenta unidades.
- Dos reportes con filtro de fechas: productos más vendidos y ventas/pedidos. Se excluyen ventas canceladas del total vendido.
- Historial del cliente en Mi cuenta y consulta administrativa del historial por cliente.
- Perfil del administrador: guardar nombre y correo, conservando la contraseña.

## Pantallas de diseño
- Formularios de alta de productos y categorías, nuevo administrador, contacto y compartir recetas: controles visibles, sin guardar.
- Edición de producto: permite guardar el stock; los demás campos son de consulta.
- Usuarios muestra únicamente administradores. Su formulario nuevo solo contempla el rol Administrador.
- Eliminar en Usuarios y Categorías está deshabilitado.
- Blog y detalle de producto conservan diseño y navegación. La página Nosotros fue retirada.
- Login conserva la sesión de demostración necesaria para acceder a los flujos funcionales.

## Código
Componentes funcionales, props, useState, formularios controlados con value/onChange y listados con map. Se reutilizan TarjetaProducto, StockCritico e HistorialCompras.

Archivos principales: App.jsx; assets/js/pago.js; components/StockCritico.jsx e HistorialCompras.jsx; pages/Pago.jsx, PagoCorrecto.jsx, MiCuenta.jsx, Productos.jsx; páginas de admin y formularios de diseño.

## Datos y verificación
- Persistencia local en localStorage; pago simulado, sin backend ni cobros.
- Envío referencial: $3.000 hasta $60.000 en productos y gratis sobre ese monto (antes de descuentos). Retiro gratis. DUOC40 funciona como cupón de demostración, sin verificar matrícula.
- Cuentas iniciales: admin@milsabores.cl / admin123; suimei@gmail.com / 1234; kerly@gmail.com / 1234.
- Admin.test.jsx eliminado a petición de la usuaria. No se agregaron ni ejecutaron pruebas unitarias; quedan pendientes. La configuración de Vitest se conserva para después.
- Para verificar sin pruebas unitarias: npm run build y npm run lint. Luego recorrer categorías → carrito → pago con error → reintentar → pago correcto → historial → pedidos/boleta → reportes → stock → perfil.

## Limpieza de código sin uso
- Eliminados App.css e index.css (vacíos), junto con el import innecesario.
- Retiradas las rutas de edición de usuarios y categorías que ya no tienen botones de acceso; simplificados sus formularios para alta únicamente.
- Eliminada guardarCategorias, que no tenía llamadas.
- Retiradas 38 reglas CSS obsoletas, selectores de ventanas retiradas y declaraciones repetidas; eliminado el import duplicado de contacto.css.
- Conservadas las páginas de diseño acordadas y la configuración de Vitest pendiente.
- Verificación: build, lint y revisión de imports sin archivos de código desconectados. No se ejecutaron pruebas unitarias.

- Login y registro vuelven a compartir /login, con dos formularios en columnas (apilados en móvil). Eliminada la página de registro separada. Registro habilitado con validación JavaScript de nombre, correo, nacimiento, contraseña y correo duplicado; guarda clientes en localStorage y permite iniciar sesión.

- Formularios de acceso adaptados del login.html y js/formularios.js de Mi_proyecto: mismos campos y textos principales, useState y onSubmit; registro obligatorio sin límites de caracteres, validación de email y duplicados. Conserva la lista compartida de usuarios para poder ingresar con la cuenta creada.
