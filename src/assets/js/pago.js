import { obtenerSesion } from "./usuarios.js";
import { obtenerCarrito } from "./carrito.js";
import { obtenerPedidos, guardarPedidos } from "./pedidos.js";

export function realizarPagoSimulado(idIntento, resultado) {
    const usuario = obtenerSesion();

    if (!usuario || usuario.rol !== "cliente") {
        throw new Error("Inicia sesión como cliente para continuar.");
    }

    if (!idIntento || !["correcto", "error"].includes(resultado)) {
        throw new Error("No se pudo identificar el intento de pago.");
    }

    const pedidos = obtenerPedidos();
    const existente = pedidos.find(
        (pedido) => pedido.id === idIntento && pedido.email === usuario.email
    );

    // Un mismo intento no debe crear dos pedidos.
    if (existente) {
        return existente;
    }

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        throw new Error("Agrega productos al carrito antes de continuar.");
    }

    if (resultado === "error") {
        return null;
    }

    const fecha = new Date();
    const fechaRegistro = [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, "0"),
        String(fecha.getDate()).padStart(2, "0"),
    ].join("-");

    const pedido = {
        id: idIntento,
        numero: `PED-${idIntento.slice(0, 8).toUpperCase()}`,
        cliente: usuario.nombre,
        email: usuario.email,
        fecha: fecha.toLocaleDateString("es-CL"),
        fechaRegistro,
        productos: carrito,
        total: carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
        estado: "pendiente",
        pago: "pagado",
        simulado: true,
    };

    // Primero se guarda el pedido; si falla, el carrito sigue intacto.
    guardarPedidos([pedido, ...pedidos]);
    localStorage.removeItem("carrito");
    return pedido;
}
