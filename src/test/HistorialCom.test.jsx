import { beforeEach, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HistorialCompras from "../components/HistorialCompras";


// TEST 9 :)

describe("Historial de compras", () => {
    beforeEach(() => {
        localStorage.clear();

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify({
                nombre: "Ana",
                email: "ana@gmail.com",
                rol: "cliente",
            })
        );

        localStorage.setItem(
            "pedidos",
            JSON.stringify([
                {
                    id: "pedido-1",
                    numero: "PED-ANA",
                    email: "ana@gmail.com",
                    fecha: "25-10-2026",
                    total: 10000,
                    estado: "pendiente",
                    pago: "pagado",
                },
                {
                    id: "pedido-2",
                    numero: "PED-OTRO",
                    email: "otro@gmail.com",
                    fecha: "25-10-2026",
                    total: 20000,
                    estado: "pendiente",
                    pago: "pagado",
                },
            ])
        );
    });

    test("muestra las compras del cliente activo", () => {
        render(
            <MemoryRouter>
                <HistorialCompras />
            </MemoryRouter>
        );

        expect(screen.getByText("PED-ANA")).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: "Ver compra" })
        ).toHaveAttribute("href", "/pago/correcto/pedido-1");
    });

    test("no muestra las compras de otro cliente", () => {
        render(
            <MemoryRouter>
                <HistorialCompras />
            </MemoryRouter>
        );

        expect(screen.queryByText("PED-OTRO")).not.toBeInTheDocument();
    });
});