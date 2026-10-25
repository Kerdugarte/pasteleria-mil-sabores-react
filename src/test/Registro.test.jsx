import { beforeEach, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";


// TEST 4  :)


describe("Registro de clientes", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("muestra un error si hay campos vacíos", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Registrarme" })
        );

        expect(
            screen.getByText("Debes completar todos los campos.")
        ).toBeInTheDocument();

        expect(localStorage.getItem("usuarios")).toBeNull();
    });

    test("crea una cuenta con datos válidos", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Nombre completo"), {
            target: { value: "Ana Pérez" },
        });

        fireEvent.change(
            screen.getByLabelText("Email", { selector: "#emailRegistro" }),
            { target: { value: "ana@gmail.com" } }
        );

        fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
            target: { value: "2000-05-15" },
        });

        fireEvent.change(
            screen.getByLabelText("Contraseña", {
                selector: "#passwordRegistro",
            }),
            { target: { value: "1234" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Registrarme" })
        );

        expect(
            screen.getByText("Cuenta creada correctamente. Ya puedes ingresar.")
        ).toBeInTheDocument();

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));

        expect(usuarios).toContainEqual(
            expect.objectContaining({
                nombre: "Ana Pérez",
                email: "ana@gmail.com",
                rol: "cliente",
            })
        );
    });
});