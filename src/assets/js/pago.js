import { obtenerSesion } from "./usuarios.js";
import { obtenerCarrito } from "./carrito.js";
import { obtenerPedidos, guardarPedidos } from "./pedidos.js";
import { obtenerProductos, guardarProductos } from "./Datos.js";

export function calcularCompra(carrito, email, entrega = "retiro", codigo = "") {
    const subtotal = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const primeraCompra = !obtenerPedidos().some((pedido) => pedido.email === email && pedido.pago === "pagado" && pedido.estado !== "cancelado");
    const cupon = codigo.trim().toUpperCase();
    const porcentaje = cupon === "DUOC40" ? 40 : primeraCompra ? 10 : 0;
    const descuento = Math.round(subtotal * porcentaje / 100);
    const costoEnvio = entrega === "envio" && subtotal <= 60000 ? 3000 : 0;
    return { subtotal, porcentaje, descuento, costoEnvio, total: subtotal - descuento + costoEnvio };
}

export function realizarPagoSimulado(idIntento, resultado, entrega) {
    const usuario = obtenerSesion();
    if (!usuario || usuario.rol !== "cliente") throw new Error("Inicia sesión como cliente para continuar.");
    if (!idIntento || !["correcto", "error"].includes(resultado)) throw new Error("Intento de pago inválido.");

    const pedidos = obtenerPedidos();
    const existente = pedidos.find((pedido) => pedido.id === idIntento && pedido.email === usuario.email);
    if (existente) return existente;

    const carrito = obtenerCarrito();
    if (carrito.length === 0) throw new Error("Agrega productos al carrito antes de continuar.");
    if (!entrega.nombre.trim() || !entrega.telefono.trim()) throw new Error("Completa tus datos de contacto.");
    if (!["retiro", "envio"].includes(entrega.tipo)) throw new Error("Selecciona la forma de entrega.");
    if (entrega.tipo === "envio" && (!entrega.direccion.trim() || !entrega.comuna.trim())) throw new Error("Completa la dirección y comuna.");
    const codigo = entrega.codigo.trim().toUpperCase();
    if (codigo && codigo !== "DUOC40") throw new Error("El código promocional no es válido.");
    if (resultado === "error") return null;

    const productos = obtenerProductos();
    const actualizados = productos.map((producto) => {
        const item = carrito.find((compra) => compra.id === producto.id);
        return item ? { ...producto, stock: producto.stock - item.cantidad } : producto;
    });
    const fecha = new Date();
    const fechaRegistro = [fecha.getFullYear(), String(fecha.getMonth() + 1).padStart(2, "0"), String(fecha.getDate()).padStart(2, "0")].join("-");
    const pedido = {
        id: idIntento,
        numero: `PED-${idIntento.slice(0, 8).toUpperCase()}`,
        cliente: usuario.nombre,
        email: usuario.email,
        fecha: fecha.toLocaleDateString("es-CL"),
        fechaRegistro,
        productos: carrito,
        ...calcularCompra(carrito, usuario.email, entrega.tipo, codigo),
        entrega: { ...entrega, nombre: entrega.nombre.trim(), telefono: entrega.telefono.trim(), direccion: entrega.direccion.trim(), comuna: entrega.comuna.trim(), codigo },
        estado: "pendiente",
        pago: "pagado",
        simulado: true,
    };

    guardarProductos(actualizados);
    try {
        guardarPedidos([pedido, ...pedidos]);
    } catch (error) {
        guardarProductos(productos);
        throw error;
    }
    localStorage.removeItem("carrito");
    return pedido;
}
