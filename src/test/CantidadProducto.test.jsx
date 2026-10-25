import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CantidadProducto from "../components/CantidadProducto";

/// TEST 2  :) 

describe('Aumenta la cantidad', () => {

    test('Aumenta la cantidad', () => {
        const cambiarCantidad = vi.fn();


        render(
            <CantidadProducto
                cantidad={1}
                maximo={5}
                cambiarCantidad={cambiarCantidad}
            />
        );


        const botonEnPantalla = screen.getByRole("button", {
            name: "Aumentar cantidad"
        })

        fireEvent.click(botonEnPantalla);

        expect(cambiarCantidad).toHaveBeenCalledWith(2);

    })



    test("no permite disminuir la cantidad por debajo de 1", () => {
        const cambiarCantidad = vi.fn();

        render(
            <CantidadProducto
                cantidad={1}
                maximo={5}
                cambiarCantidad={cambiarCantidad}
            />
        );


        const botonEnPantalla = screen.getByRole("button", {
            name: "Disminuir cantidad"
        })

        expect(botonEnPantalla).toBeDisabled();


    });
})