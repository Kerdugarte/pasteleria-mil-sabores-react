import { beforeEach, describe, test, expect } from "vitest";
import { realizarPagoSimulado } from "../assets/js/pago";

//TEST 8 :)

describe("Compra simulada", () => {
    const entrega = {
        nombre: "Ana",
        telefono: "912345678",
        tipo: "retiro",
        direccion: "",
        comuna: "",
        codigo: "",
    };

    beforeEach(() => {
        localStorage.clear();

        const producto = {
            id: 1,
            nombre: "Torta de chocolate",
            precio: 10000,
            stock: 5,
        };

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({
                nombre: "Ana",
                email: "ana@gmail.com",
                rol: "cliente",
            })
        );

        localStorage.setItem("productos", JSON.stringify([producto]));

        localStorage.setItem(
            "carrito",
            JSON.stringify([{ ...producto, cantidad: 1 }])
        );
    });

    test("guarda el pedido y descuenta stock con pago correcto", () => {
        const pedido = realizarPagoSimulado(
            "intento-1", "correcto", entrega
        );

        const pedidos = JSON.parse(localStorage.getItem("pedidos"));
        const productos = JSON.parse(localStorage.getItem("productos"));

        expect(pedido.pago).toBe("pagado");
        expect(pedidos).toHaveLength(1);
        expect(pedidos[0].id).toBe("intento-1");
        expect(productos[0].stock).toBe(4);
        expect(localStorage.getItem("carrito")).toBeNull();
    });

    test("conserva el carrito y el stock cuando el pago falla", () => {
        const carritoAntes = localStorage.getItem("carrito");
        const productosAntes = localStorage.getItem("productos");

        const resultado = realizarPagoSimulado(
            "intento-2", "error", entrega
        );

        expect(resultado).toBeNull();
        expect(localStorage.getItem("pedidos")).toBeNull();
        expect(localStorage.getItem("carrito")).toBe(carritoAntes);
        expect(localStorage.getItem("productos")).toBe(productosAntes);
    });
});