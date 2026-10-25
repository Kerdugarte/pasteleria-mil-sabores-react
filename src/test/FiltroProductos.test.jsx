import { beforeEach, describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FiltroProductos from "../components/FiltroProductos";


//TEST 6 :)

describe("Filtro de categorias", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("selecciona una categoria", () => {
        const cambiarCategoria = vi.fn();

        render(
            <FiltroProductos
                categoriaActual=""
                cambiarCategoria={cambiarCategoria}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Categorias" })
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Tortas cuadradas" })
        );

        expect(cambiarCategoria).toHaveBeenCalledWith("tortas-cuadradas");
    });

    test("permite volver a todos los productos", () => {
        const cambiarCategoria = vi.fn();

        render(
            <FiltroProductos
                categoriaActual="tortas-cuadradas"
                cambiarCategoria={cambiarCategoria}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Categorias" })
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Todos los productos" })
        );

        expect(cambiarCategoria).toHaveBeenCalledWith("");
    });
});


