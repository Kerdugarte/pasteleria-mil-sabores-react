import { describe, expect, test } from "vitest";
import TarjetaProducto from "../components/TarjetaProducto";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// TEST 1   :) 
describe('Prueba unitaria para boton Agregar al carrito', () => {

    const producto = {
        id: 1,
        nombre: "Torta de chocolate",
        precio: 45000,
        imagen: "/img/torta.jpg",
        stock: 10,
    };


    test('debe renderizar el boton', () => {

        render(<MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>)

        // Busco un elemento de tipo  boton 
        const botonEnPatalla = screen.getByRole("button",
            { name: "Agregar al carrito" });


        expect(botonEnPatalla).toBeInTheDocument();

    })

    test("dar un click al boton", () => {
        render(
            <MemoryRouter>
                <TarjetaProducto producto={producto} />
            </MemoryRouter>);

        const botonEnPantalla = screen.getByRole("button", {
            name: "Agregar al carrito",
        });

        fireEvent.click(botonEnPantalla);

        expect(
            screen.getByRole("heading", {
                name: "¿Cuántas unidades quieres agregar?",
            })
        ).toBeInTheDocument();
    });
})







