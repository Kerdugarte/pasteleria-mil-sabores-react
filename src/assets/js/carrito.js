import { obtenerProductos } from "./Datos.js";

export function obtenerCarrito() {
    try {
        const producto = obtenerProductos();
        const guardado = JSON.parse(localStorage.getItem("carrito") || "[]");

        if (!Array.isArray(guardado)) {
            return [];
        }

        return guardado.map((item) => {
            const actual = producto.find((articulo) => articulo.id === item?.id);
            const cantidad = Number(item?.cantidad);

            if (!actual || actual.stock <= 0 || !Number.isInteger(cantidad) || cantidad < 1) {
                return null;
            }

            return { ...actual, cantidad: Math.min(cantidad, actual.stock) };
        }).filter((item) => item !== null);
    } catch {
        return [];
    }
}

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function agregarProducto(id, cantidad = 1) {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
        throw new Error("Selecciona una cantidad entera mayor que cero.");
    }
    const articulo = obtenerProductos().find((item) => item.id === id);

    if (!articulo || articulo.stock <= 0) {
        throw new Error("Este producto no tiene stock disponible.");
    }

    const carrito = obtenerCarrito();
    const existe = carrito.find((item) => item.id === id);

    if ((existe?.cantidad || 0) + cantidad > articulo.stock) {
        throw new Error("La cantidad supera el stock disponible.");
    }

    const actualizado = existe
        ? carrito.map((item) => item.id === id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item)
        : [...carrito, { ...articulo, cantidad }];

    guardarCarrito(actualizado);
    return actualizado;
}
