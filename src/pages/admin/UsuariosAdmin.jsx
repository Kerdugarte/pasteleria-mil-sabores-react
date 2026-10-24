import { useState } from "react";
import { Link } from "react-router-dom";
import { usuarios } from "../../assets/js/usuarios";

function UsuariosAdmin() {
    const [busqueda, setBusqueda] = useState("");

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

            <div className="row g-4">
                {administradores.map((usuario) => (
                    <div
                        className="col-12 col-lg-6"
                        key={usuario.email}
                    >
                        <article className="tarjeta-usuario-admin h-100">
                            <h2>{usuario.nombre}</h2>

                            <p className="text-break">
                                {usuario.email}
                            </p>

                            <p className="mb-0">
                                <strong>Rol:</strong> Administrador
                            </p>
                        </article>
                    </div>
                ))}
            </div>

            {administradores.length === 0 && (
                <p className="sin-resultados-admin">
                    No hay administradores que coincidan con tu búsqueda.
                </p>
            )}
        </section>
    );
}

export default UsuariosAdmin;