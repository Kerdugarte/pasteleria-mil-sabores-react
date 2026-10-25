import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";


// TEST 3       :)


describe('Inicio de sesion', () => {

    test('muestra u error con credenciales incorretas', () => {
        localStorage.clear(); // limpiar 

        render(
            <MemoryRouter>
                <Login /> //renderiso
            </MemoryRouter>
        );


        fireEvent.change(screen.getByLabelText("Email", { selector: "#emailLogin" }), {
            target: { value: "incorrecto@gmail.com" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña", { selector: "#passwordLogin" }), {
            target: { value: "incorrecta" },
        });


        const botonEnPantalla = screen.getByRole('button', {
            name: "Ingresar"
        })


        fireEvent.click(botonEnPantalla);

        expect(screen.getByText("Correo o contraseña incorrectos.")
        ).toBeInTheDocument();


    })


    test('guarda la sesión con credenciales correctas"', () => {
        localStorage.clear(); // limpiar 

        render(
            <MemoryRouter>
                <Login /> //renderiso
            </MemoryRouter>
        );


        fireEvent.change(screen.getByLabelText("Email", { selector: "#emailLogin" }), {
            target: { value: "kerly@gmail.com" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña", { selector: "#passwordLogin" }), {
            target: { value: "1234" },
        });


        const botonEnPantalla = screen.getByRole('button', {
            name: "Ingresar"
        })


        fireEvent.click(botonEnPantalla);



        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

        expect(usuario.email).toBe("kerly@gmail.com");
    })


})