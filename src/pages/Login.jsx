import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { buscarUsuario, guardarSesion, obtenerSesion, obtenerUsuarios, guardarUsuarios } from "../assets/js/usuarios";
function Login() {
    const [formulario, setFormulario] = useState({
        email: "",
        password: "",
    });

    const [registro, setRegistro] = useState({ nombre: "", email: "", fechaNacimiento: "", password: "" });
    const [error, setError] = useState("");
    const [errorRegistro, setErrorRegistro] = useState("");
    const [mensajeRegistro, setMensajeRegistro] = useState("");

    function cambiarRegistro(evento) {
        const { name, value } = evento.target;
        setRegistro({ ...registro, [name]: value });
        setErrorRegistro("");
        setMensajeRegistro("");
    }
    const navigate = useNavigate();
    const location = useLocation();
    const destinoCliente = location.state?.volver === "/pago" ? "/pago" : "/mi-cuenta";

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

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim()) || !formulario.password.trim()) {
            setError("Ingresa un correo válido y tu contraseña.");
            return;
        }

        const usuario = buscarUsuario(
            formulario.email,
            formulario.password.trim()
        );

        if (!usuario) {
            setError("Correo o contraseña incorrectos.");
            return;
        }

        try {
            guardarSesion(usuario);
            const destino = usuario.rol === "admin" ? "/admin" : destinoCliente;
            navigate(destino, { replace: true });
        } catch {
            setError(
                "No se pudo guardar la sesión en este navegador."
            );
        }
    }

    function registrarCliente(evento) {
        evento.preventDefault();
        setErrorRegistro("");
        setMensajeRegistro("");
        const nombre = registro.nombre.trim();
        const email = registro.email.trim().toLowerCase();

        const fecha = registro.fechaNacimiento;
        const password = registro.password.trim();

        if (!nombre || !email || !fecha || !password) {
            setErrorRegistro("Debes completar todos los campos.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorRegistro("Ingresa un email válido.");
            return;
        }
        const usuarios = obtenerUsuarios();
        if (usuarios.some((usuario) => usuario.email.toLowerCase() === email)) {
            setErrorRegistro("Este correo ya está registrado. Puedes iniciar sesión.");
            return;
        }
        try {
            guardarUsuarios([...usuarios, { nombre, email, fechaNacimiento: fecha, password, rol: "cliente" }]);
            setFormulario({ email, password: "" });
            setError("");
            setRegistro({ nombre: "", email: "", fechaNacimiento: "", password: "" });
            setMensajeRegistro("Cuenta creada correctamente. Ya puedes ingresar.");
        } catch {
            setErrorRegistro("No se pudo guardar la cuenta. Inténtalo nuevamente.");
        }
    }

    const usuarioActivo = obtenerSesion();

    if (usuarioActivo?.rol === "admin") {
        return <Navigate to="/admin" replace />;
    }

    if (usuarioActivo?.rol === "cliente") {
        return <Navigate to={destinoCliente} replace />;
    }

    return (
        <main className="container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-titulos">Bienvenido</h1>

                <p className="texto-general">
                    Tu rincón más dulce comienza aquí.
                </p>
            </header>

            <div className="row g-4 justify-content-center align-items-start">
                <div className="col-12 col-lg-5">
                    <section className="acceso-card acceso-login">
                        <h2 className="letra-titulos mb-4">
                            Iniciar sesión
                        </h2>

                        <p className="texto-general">¡Bienvenido de vuelta!</p>
                        <form id="formLogin" className="texto-general" onSubmit={iniciarSesion} noValidate>
                            <div className="mb-4">
                                <label
                                    htmlFor="emailLogin"
                                    className="form-label"
                                >
                                    Email
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
                                <label
                                    htmlFor="passwordLogin"
                                    className="form-label"
                                >
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    id="passwordLogin"
                                    name="password"
                                    className="form-control"
                                    placeholder="********"
                                    autoComplete="current-password"
                                    value={formulario.password}
                                    onChange={cambiarCampo}
                                    required
                                />
                            </div>

                            {error && (
                                <p
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="boton-acceso w-100"
                            >
                                Ingresar
                            </button>

                        </form>
                    </section>
                </div>

                <div className="col-12 col-lg-5">
                    <section className="acceso-card acceso-registro texto-general">
                        <h2 className="letra-titulos mb-4">
                            Crear cuenta
                        </h2>

                        <p className="texto-general">Completa tus datos para crear tu cuenta</p>
                        <form id="formRegistro" className="texto-general" onSubmit={registrarCliente} noValidate>
                            <div className="mb-3">
                                <label htmlFor="nombreRegistro" className="form-label">Nombre completo</label>
                                <input id="nombreRegistro" name="nombre" type="text" className="form-control" placeholder="Ingresa tu nombre" autoComplete="name" value={registro.nombre} onChange={cambiarRegistro} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailRegistro" className="form-label">Email</label>
                                <input id="emailRegistro" name="email" type="email" className="form-control" placeholder="tu@email.com" autoComplete="email" value={registro.email} onChange={cambiarRegistro} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                                <input id="fechaNacimiento" name="fechaNacimiento" type="date" className="form-control" autoComplete="bday" value={registro.fechaNacimiento} onChange={cambiarRegistro} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="passwordRegistro" className="form-label">Contraseña</label>
                                <input id="passwordRegistro" name="password" type="password" className="form-control" placeholder="********" autoComplete="new-password" value={registro.password} onChange={cambiarRegistro} required />
                            </div>
                            {errorRegistro && <p className="alert alert-danger" role="alert">{errorRegistro}</p>}
                            {mensajeRegistro && <p className="alert alert-success" role="status">{mensajeRegistro}</p>}
                            <button type="submit" className="boton-acceso w-100">Registrarme</button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Login;
