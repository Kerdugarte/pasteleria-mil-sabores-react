import { beforeEach, describe, test, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ReportesAdmin from "../pages/admin/ReportesAdmin";


//TEST 10 :)

describe("Reportes", () => {
    beforeEach(() => {
        localStorage.clear();

        localStorage.setItem(
            "pedidos",
            JSON.stringify([
                {
                    id: "1",
                    numero: "PED-ANTERIOR",
                    cliente: "Ker",
                    fecha: "20-10-2026",
                    fechaRegistro: "2026-10-20",
                    total: 10000,
                    estado: "entregado",
                    pago: "pagado",
                    productos: [
                        { id: 1, nombre: "Torta", precio: 3000, cantidad: 2 },
                        { id: 2, nombre: "Galletas", precio: 1000, cantidad: 4 },
                    ],
                },
                {
                    id: "2",
                    numero: "PED-ACTUAL",
                    cliente: "Profe",
                    fecha: "25-10-2026",
                    fechaRegistro: "2026-10-25",
                    total: 20000,
                    estado: "pendiente",
                    pago: "pagado",
                    productos: [
                        { id: 1, nombre: "Torta", precio: 3000, cantidad: 3 },
                        { id: 2, nombre: "Galletas", precio: 1000, cantidad: 6 },
                        { id: 3, nombre: "Cupcake", precio: 5000, cantidad: 1 },
                    ],
                },
                {
                    id: "3",
                    numero: "PED-CANCELADO",
                    cliente: "Sui",
                    fecha: "25-10-2026",
                    fechaRegistro: "2026-10-25",
                    total: 50000,
                    estado: "cancelado",
                    pago: "pagado",
                    productos: [
                        { id: 4, nombre: "Producto cancelado", precio: 1000, cantidad: 50 },
                    ],
                },
            ])
        );
    });

    test("filtra las ventas por fecha sin sumar pedidos cancelados", () => {
        render(<ReportesAdmin />);

        fireEvent.change(screen.getByLabelText("Desde"), {
            target: { value: "2026-10-25" },
        });

        fireEvent.change(screen.getByLabelText("Hasta"), {
            target: { value: "2026-10-25" },
        });

        expect(screen.getByText("PED-ACTUAL")).toBeInTheDocument();
        expect(screen.queryByText("PED-ANTERIOR")).not.toBeInTheDocument();

        const tarjetaTotal = screen
            .getByRole("heading", { name: "Total vendido" })
            .closest("article");

        expect(
            within(tarjetaTotal).getByText("$20.000")
        ).toBeInTheDocument();
    });

    test("agrupa los productos, suma sus unidades e importes y los ordena por ventas", () => {
        render(<ReportesAdmin />);

        const tabla = screen.getByRole("table", { name: "Productos más vendidos" });
        const filas = within(tabla).getAllByRole("row").slice(1);
        const datos = filas.map((fila) =>
            within(fila).getAllByRole("cell").map((celda) => celda.textContent)
        );


        expect(datos).toEqual([
            ["Galletas", "10", "$10.000"],
            ["Torta", "5", "$15.000"],
            ["Cupcake", "1", "$5.000"],
        ]);
        expect(within(tabla).queryByText("Producto cancelado")).not.toBeInTheDocument();
    });

});