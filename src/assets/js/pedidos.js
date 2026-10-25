export function obtenerPedidos() {
    try {
        const guardados = JSON.parse(localStorage.getItem("pedidos") || "[]");
        return Array.isArray(guardados) ? guardados : [];
    } catch {
        return [];
    }
}

export function guardarPedidos(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}
