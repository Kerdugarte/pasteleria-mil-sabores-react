import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { obtenerUsuarios, guardarUsuarios } from "../../assets/js/usuarios";

function NuevoUsuario() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function guardarUsuario(event) {
        event.preventDefault();
        const datos = new FormData(event.currentTarget);
        const nombre = datos.get("nombre").trim();
        const email = datos.get("email").trim().toLowerCase();
        const password = datos.get("password");
        const usuarios = obtenerUsuarios();

        if (!nombre || password.trim().length < 8) {
            setError("Completa el nombre y una contraseña de al menos 8 caracteres.");
            return;
        }

        if (usuarios.some((item) => item.email.toLowerCase() === email)) {
            setError("Este correo ya está registrado.");
            return;
        }

        try {
            guardarUsuarios([...usuarios, { nombre, email, password, rol: "admin" }]);
            navigate("/admin/usuarios");
        } catch {
            setError("No se pudo guardar el administrador. Inténtalo nuevamente.");
        }
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <Link
                    to="/admin/usuarios"
                    className="flecha-volver-admin"
                    aria-label="Volver a administradores"
                    title="Volver a administradores"
                >
                    <span aria-hidden="true">←</span>
                </Link>

                <h1 className="letra-Titulos">
                    Nuevo administrador
                </h1>

                <p className="texto-general">
                    Completa los datos del nuevo administrador.
                </p>
            </header>

            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <form onSubmit={guardarUsuario}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="nombreUsuario"
                            className="form-label"
                        >
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            id="nombreUsuario"
                            name="nombre"
                            className="form-control"
                            placeholder="Ingresa el nombre"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="correoUsuario"
                            className="form-label"
                        >
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="correoUsuario"
                            name="email"
                            className="form-control"
                            placeholder="ejemplo@correo.cl"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="passwordUsuario"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="passwordUsuario"
                            name="password"
                            className="form-control"
                            placeholder="Crea una contraseña"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <p className="form-text">
                            Debe tener al menos 8 caracteres.
                        </p>
                    </div>

                    <div className="col-12">
                        <div className="acciones-formulario-admin">
                            <button
                                type="submit"
                                className="boton-admin"
                            >
                                Guardar administrador
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NuevoUsuario;