import { Link } from "react-router-dom";

function NuevoUsuario() {
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

            <form onSubmit={(event) => event.preventDefault()}>
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
                                type="button"
                                className="boton-admin"
                                disabled
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