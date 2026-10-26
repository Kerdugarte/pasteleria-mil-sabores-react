import { beforeEach, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HistorialCompras from "../components/HistorialCompras";

// TEST 9: historial consultado desde administración.
describe("Historial de compras del administrador", () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem("usuarioActivo", JSON.stringify({
            nombre: "Administrador",
            email: "admin@milsabores.cl",
            rol: "admin",
        }));
        localStorage.setItem("usuarios", JSON.stringify([
            { nombre: "Ana", email: "ana@gmail.com", rol: "cliente" },
            { nombre: "Pedro", email: "pedro@gmail.com", rol: "cliente" },
        ]));
        localStorage.setItem("pedidos", JSON.stringify([
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
                numero: "PED-PEDRO",
                email: "pedro@gmail.com",
                fecha: "25-10-2026",
                total: 20000,
                estado: "pendiente",
                pago: "pagado",
            },
        ]));
    });

    test("permite seleccionar un cliente y acceder a su boleta administrativa", () => {
        render(
            <MemoryRouter initialEntries={["/admin/historial"]}>
                <HistorialCompras esAdmin />
            </MemoryRouter>
        );

        expect(screen.getByText("Selecciona un cliente para ver sus compras.")).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText("Cliente"), {
            target: { value: "ana@gmail.com" },
        });

        expect(screen.getByLabelText("Cliente")).toHaveValue("ana@gmail.com");
        expect(screen.getByText("PED-ANA")).toBeInTheDocument();
        expect(screen.queryByText("PED-PEDRO")).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Ver compra" }))
            .toHaveAttribute("href", "/admin/pedidos/pedido-1/boleta");
    });

    test("lee el cliente de la URL y actualiza las compras al cambiar la selección", () => {
        render(
            <MemoryRouter initialEntries={["/admin/historial?cliente=ana%40gmail.com"]}>
                <HistorialCompras esAdmin />
            </MemoryRouter>
        );

        expect(screen.getByLabelText("Cliente")).toHaveValue("ana@gmail.com");
        expect(screen.getByText("PED-ANA")).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText("Cliente"), {
            target: { value: "pedro@gmail.com" },
        });

        expect(screen.getByLabelText("Cliente")).toHaveValue("pedro@gmail.com");
        expect(screen.getByText("PED-PEDRO")).toBeInTheDocument();
        expect(screen.queryByText("PED-ANA")).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Ver compra" }))
            .toHaveAttribute("href", "/admin/pedidos/pedido-2/boleta");
    });
});
