import { useState } from "react";
import { obtenerSesion, obtenerUsuarios, guardarUsuarios, guardarSesion } from "../../assets/js/usuarios";
function PerfilAdmin() {
    const [usuario, setUsuario] = useState(obtenerSesion);
    const [formulario, setFormulario] = useState(() => ({ nombre: obtenerSesion()?.nombre || "", email: obtenerSesion()?.email || "" }));
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    function guardarPerfil(event) {
        event.preventDefault();
        setError("");
        setMensaje("");
        const nombre = formulario.nombre.trim();
        const email = formulario.email.trim().toLowerCase();
        const usuarios = obtenerUsuarios();
        const actual = usuarios.find((item) => item.email === usuario.email);

        if (!actual) {
            setError("No se encontró la cuenta del administrador.");
            return;
        }

        if (!nombre) {
            setError("Completa el nombre.");
            return;
        }

        if (usuarios.some((item) => item.email !== usuario.email && item.email.toLowerCase() === email)) {
            setError("Este correo ya está registrado.");
            return;
        }

        const actualizado = { ...actual, nombre, email };
        const actualizados = usuarios.map((item) => item.email === usuario.email ? actualizado : item);

        try {
            guardarUsuarios(actualizados);
            try {
                guardarSesion(actualizado);
            } catch (errorSesion) {
                guardarUsuarios(usuarios);
                throw errorSesion;
            }
            setUsuario({ nombre, email, rol: actualizado.rol });
            setFormulario({ nombre, email });
            setMensaje("Tus datos fueron actualizados.");
        } catch {
            setError("No se pudieron guardar los cambios. Inténtalo nuevamente.");
        }
    }

    function cambiarCampo(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    if (!usuario) {
        return <p>No hay una sesión iniciada.</p>;
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Mi perfil</h1>
                <p className="texto-general">Consulta y actualiza tus datos.</p>
            </header>

            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-4">
                    <article className="card resumen-admin p-4 text-center">
                        <div className="avatar-perfil-admin" aria-hidden="true">
                            {usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="h4">{usuario.nombre}</h2>
                        <p className="text-break">{usuario.email}</p>
                        <p className="mb-0"><strong>Rol:</strong> Administrador</p>
                    </article>
                </div>

                <div className="col-12 col-lg-8">
                    <article className="card resumen-admin p-4">
                        <h2 className="h4 mb-4">Información personal</h2>
                        {error && <p className="alert alert-danger" role="alert">{error}</p>}
                        {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}
                        <form className="texto-general" onSubmit={guardarPerfil}>
                            <div className="mb-3">
                                <label htmlFor="perfilNombre" className="form-label">Nombre completo</label>
                                <input id="perfilNombre" name="nombre" className="form-control" value={formulario.nombre} onChange={cambiarCampo} autoComplete="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="perfilEmail" className="form-label">Correo electrónico</label>
                                <input id="perfilEmail" type="email" name="email" className="form-control" value={formulario.email} onChange={cambiarCampo} autoComplete="email" required />
                            </div>
                            <div className="acciones-formulario-admin">
                                <button type="submit" className="boton-admin">Guardar cambios</button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default PerfilAdmin;
