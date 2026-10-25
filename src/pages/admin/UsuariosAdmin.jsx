import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmarEliminar from "../../components/ConfirmarEliminar";
import { obtenerUsuarios, guardarUsuarios, obtenerSesion } from "../../assets/js/usuarios";

function UsuariosAdmin() {
    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState(obtenerUsuarios);
    const [seleccionado, setSeleccionado] = useState(null);
    const [error, setError] = useState("");
    const ventana = useRef(null);
    const sesion = obtenerSesion();

    function confirmarEliminar(usuario) {
        if (usuario.email === sesion?.email) {
            return;
        }
        setSeleccionado(usuario);
        setError("");
        ventana.current.showModal();
    }

    function eliminarUsuario() {
        if (!seleccionado || seleccionado.email === obtenerSesion()?.email) {
            return;
        }
        const actualizados = usuarios.filter((item) => item.email !== seleccionado.email);
        try {
            guardarUsuarios(actualizados);
            setUsuarios(actualizados);
            ventana.current.close();
        } catch {
            ventana.current.close();
            setError("No se pudo eliminar el administrador. Inténtalo nuevamente.");
        }
    }


    const administradores = usuarios.filter((usuario) => {
        const texto = busqueda.trim().toLowerCase();

        const coincideBusqueda =
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.email.toLowerCase().includes(texto);

        return usuario.rol === "admin" && coincideBusqueda;
    });

    return (
        <section className="usuarios-admin">
            <header className="encabezado-admin">
                <h1 className="letra-Titulos">
                    Administradores
                </h1>

                <p className="texto-general">
                    Consulta los administradores de la pastelería.
                </p>
            </header>

            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <div className="row g-3 align-items-center mb-4">
                <div className="col-12 col-lg-7">
                    <label
                        htmlFor="buscarAdministrador"
                        className="visually-hidden"
                    >
                        Buscar por nombre o correo
                    </label>

                    <input
                        type="search"
                        id="buscarAdministrador"
                        className="form-control buscador-usuarios-admin"
                        placeholder="Buscar por nombre o correo..."
                        value={busqueda}
                        onChange={(event) =>
                            setBusqueda(event.target.value)
                        }
                    />
                </div>

                <div className="col-12 col-lg-5 text-lg-end">
                    <Link
                        to="/admin/usuarios/nuevo"
                        className="boton-admin"
                    >
                        + Nuevo administrador
                    </Link>
                </div>
            </div>

            <p className="contador-admin" role="status">
                Administradores encontrados: {administradores.length}
            </p>

            <div className="table-responsive tabla-admin">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo electrónico</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {administradores.map((usuario) => (
                            <tr key={usuario.email}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>Administrador</td>
                                <td>
                                    <button
                                        type="button"
                                        className="boton-admin boton-eliminar-categoria"
                                        disabled={usuario.email === sesion?.email}
                                        title={usuario.email === sesion?.email ? "No puedes eliminar tu cuenta activa" : "Eliminar administrador"}
                                        onClick={() => confirmarEliminar(usuario)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {administradores.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    No hay administradores que coincidan con tu búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmarEliminar
                ventana={ventana}
                nombre={seleccionado ? seleccionado.nombre : ""}
                eliminar={eliminarUsuario}
            />
        </section>
    );
}

export default UsuariosAdmin;