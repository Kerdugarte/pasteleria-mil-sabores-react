import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuario, guardarSesion } from "../assets/js/usuarios";


function Login() {
    const [formulario, setFormulario] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    function cambiarCampo(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value,
        });

        setError("");
    }

    function iniciarSesion(event) {
        event.preventDefault();

        const usuario = buscarUsuario(
            formulario.email,
            formulario.password
        );

        if (!usuario) {
            setError("Correo o contraseña incorrectos.");
            return;
        }

        if (usuario.rol !== "admin") {
            setError("El acceso de clientes estará disponible al migrar Mi cuenta.");
            return;
        }

        try {
            guardarSesion(usuario);
            navigate("/admin", { replace: true });
        } catch {
            setError("No se pudo guardar la sesión en este navegador.");
        }
    }

    return (
        <main className="container py-5">
            <header className="text-center mb-5">
                <h1 className="letra-Titulos">Bienvenido</h1>

                <p className="texto-general">
                    Ingresa a tu cuenta o regístrate en Pastelería Mil Sabores.
                </p>
            </header>

            <div className="row g-4 justify-content-center align-items-start">
                <div className="col-12 col-lg-5">
                    <section className="acceso-card acceso-login">
                        <h2 className="letra-Titulos mb-4">
                            Iniciar sesión
                        </h2>

                        <form onSubmit={iniciarSesion}>
                            <div className="mb-4">
                                <label htmlFor="emailLogin" className="form-label">
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    id="emailLogin"
                                    name="email"
                                    className="form-control"
                                    placeholder="tu@email.com"
                                    autoComplete="username"
                                    value={formulario.email}
                                    onChange={cambiarCampo}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="passwordLogin" className="form-label">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    id="passwordLogin"
                                    name="password"
                                    className="form-control"
                                    placeholder="Ingresa tu contraseña"
                                    autoComplete="current-password"
                                    value={formulario.password}
                                    onChange={cambiarCampo}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="alert alert-danger" role="alert">
                                    {error}
                                </p>
                            )}

                            <button type="submit" className="boton-acceso w-100">
                                Iniciar sesión
                            </button>
                        </form>
                    </section>
                </div>

                <div className="col-12 col-lg-5">
                    <section className="acceso-card">
                        <h2 className="letra-Titulos mb-4">Crear cuenta</h2>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombreRegistro" className="form-label">
                                    Nombre completo
                                </label>

                                <input
                                    type="text"
                                    id="nombreRegistro"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Ingresa tu nombre"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emailRegistro" className="form-label">
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    id="emailRegistro"
                                    name="email"
                                    className="form-control"
                                    placeholder="tu@email.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fechaNacimiento" className="form-label">
                                    Fecha de nacimiento
                                </label>

                                <input
                                    type="date"
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    className="form-control"
                                    autoComplete="bday"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="passwordRegistro" className="form-label">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    id="passwordRegistro"
                                    name="password"
                                    className="form-control"
                                    placeholder="Crea una contraseña"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                className="boton-acceso w-100"
                                disabled
                            >
                                Crear cuenta
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Login;