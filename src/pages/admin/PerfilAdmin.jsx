
function PerfilAdmin() {
    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Mi perfil</h1>
                <p className="texto-general">
                    Consulta tus datos personales.
                </p>
            </header>

            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-4">
                    <article className="card resumen-admin p-4 text-center">
                        <div className="avatar-perfil-admin" aria-hidden="true">
                            A
                        </div>
                        <h2 className="h4">Administrador</h2>
                        <p className="text-break">admin@pasteleria.cl</p>
                        <p className="mb-0">
                            <strong>Rol:</strong> Administrador
                        </p>
                    </article>
                </div>

                <div className="col-12 col-lg-8">
                    <article className="card resumen-admin p-4">
                        <h2 className="h4 mb-4">Información personal</h2>

                        <form className="texto-general" onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-3">
                                <label htmlFor="perfilNombre" className="form-label">
                                    Nombre completo
                                </label>
                                <input
                                    id="perfilNombre"
                                    type="text"
                                    className="form-control"
                                    defaultValue="Administrador"
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="perfilEmail" className="form-label">
                                    Correo electrónico
                                </label>
                                <input
                                    id="perfilEmail"
                                    type="email"
                                    className="form-control"
                                    defaultValue="admin@pasteleria.cl"
                                    readOnly
                                />
                            </div>

                            <div className="acciones-formulario-admin">
                                <button
                                    type="button"
                                    className="boton-admin"

                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default PerfilAdmin;
