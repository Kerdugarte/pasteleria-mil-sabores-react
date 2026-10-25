import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginacion from "../components/Paginacion";


// TESTE 5 :)


describe("Paginación", () => {
    test("solicita la página siguiente al hacer clic", () => {
        const cambiarPagina = vi.fn();

        render(
            <Paginacion
                paginaActual={1}
                totalPaginas={3}
                cambiarPagina={cambiarPagina}
            />
        );

        const boton = screen.getByRole("button", {
            name: "Página siguiente",
        });

        fireEvent.click(boton);

        expect(cambiarPagina).toHaveBeenCalledWith(2);
    });

    test("deshabilita avanzar en la última página", () => {
        const cambiarPagina = vi.fn();

        render(
            <Paginacion
                paginaActual={3}
                totalPaginas={3}
                cambiarPagina={cambiarPagina}
            />
        );

        const boton = screen.getByRole("button", {
            name: "Página siguiente",
        });

        expect(boton).toBeDisabled();

        fireEvent.click(boton);

        expect(cambiarPagina).not.toHaveBeenCalled();
    });
});