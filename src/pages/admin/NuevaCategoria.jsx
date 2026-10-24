import { Link } from "react-router-dom";

function NuevaCategoria() {
    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <Link
                    to="/admin/categorias"
                    className="flecha-volver-admin"
                    aria-label="Volver a categorías"
                    title="Volver a categorías"
                >
                    <span aria-hidden="true">←</span>
                </Link>

                <h1 className="letra-Titulos">
                    Nueva categoría
                </h1>

                <p className="texto-general">
                    Completa los datos de la categoría.
                </p>
            </header>

            <form onSubmit={(event) => event.preventDefault()}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="nombreCategoria"
                            className="form-label"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="nombreCategoria"
                            name="nombre"
                            className="form-control"
                            placeholder="Tortas especiales"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="valorCategoria"
                            className="form-label"
                        >
                            Código de categoría
                        </label>

                        <input
                            type="text"
                            id="valorCategoria"
                            name="valor"
                            className="form-control"
                            placeholder="tortas-especiales"
                            required
                        />

                        <p className="form-text">
                            Usa minúsculas y guiones, sin espacios ni tildes.
                        </p>
                    </div>

                    <div className="col-12">
                        <div className="acciones-formulario-admin">
                            <button
                                type="button"
                                className="boton-admin"
                                disabled
                            >
                                Guardar categoría
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NuevaCategoria;