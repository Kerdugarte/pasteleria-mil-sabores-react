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
                    productos: [],
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
                    productos: [],
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
                    productos: [],
                },
            ])
        );
    });

    test("filtra los pedidos por fecha", () => {
        render(<ReportesAdmin />);

        fireEvent.change(screen.getByLabelText("Desde"), {
            target: { value: "2026-10-25" },
        });

        fireEvent.change(screen.getByLabelText("Hasta"), {
            target: { value: "2026-10-25" },
        });

        expect(screen.getByText("PED-ACTUAL")).toBeInTheDocument();
        expect(screen.queryByText("PED-ANTERIOR")).not.toBeInTheDocument();
    });

    test("excluye pedidos cancelados del total vendido", () => {
        render(<ReportesAdmin />);

        const tarjetaTotal = screen
            .getByRole("heading", { name: "Total vendido" })
            .closest("article");

        expect(
            within(tarjetaTotal).getByText("$30.000")
        ).toBeInTheDocument();
    });
});