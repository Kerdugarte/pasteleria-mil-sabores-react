import { Link } from "react-router-dom";
import { obtenerUsuarios } from "../../assets/js/usuarios";

function UsuariosAdmin() {
    const usuarios = obtenerUsuarios().filter((usuario) => usuario.rol === "admin");
    return (
        <section>
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Administradores</h1>
                <p className="texto-general">Consulta los administradores de la pastelería.</p>
            </header>
            <Link to="/admin/usuarios/nuevo" className="boton-admin mb-4">+ Nuevo administrador</Link>
            <div className="table-responsive tabla-admin">
                <table className="table align-middle">
                    <thead><tr><th>Nombre</th><th>Correo electrónico</th><th>Rol</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.email}>
                                <td>{usuario.nombre}</td><td>{usuario.email}</td>
                                <td>Administrador</td>
                                <td>
                                    <div className="d-flex flex-wrap gap-2">
                                        <button type="button" className="boton-admin" disabled>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default UsuariosAdmin;
