import { beforeEach, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../pages/Carrito";

//TEST 7 :)


describe("Carrito", () => {
    beforeEach(() => {
        localStorage.clear();

        const producto = {
            id: 1,
            nombre: "Torta de chocolate",
            precio: 10000,
            stock: 5,
            imagen: "/img/torta.jpg",
        };

        localStorage.setItem("productos", JSON.stringify([producto]));
        localStorage.setItem(
            "carrito",
            JSON.stringify([{ ...producto, cantidad: 1 }])
        );
    });

    test("actualiza el total al aumentar la cantidad", () => {
        render(
            <MemoryRouter>
                <Carrito />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Agregar una unidad de Torta de chocolate",
            })
        );

        expect(screen.getByText("Unidades: 2")).toBeInTheDocument();
        expect(screen.getByText("$20.000")).toBeInTheDocument();

        const carrito = JSON.parse(localStorage.getItem("carrito"));
        expect(carrito[0].cantidad).toBe(2);
    });

    test("muestra el carrito vacío al quitar el último producto", () => {
        render(
            <MemoryRouter>
                <Carrito />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Quitar producto" })
        );

        expect(
            screen.getByRole("heading", { name: "Tu carrito está vacío" })
        ).toBeInTheDocument();

        expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([]);
    });
});