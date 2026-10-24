import { Link } from "react-router-dom";

function PanelAdmin() {
    return (
        <section>
            <header className="mb-4">
                <h1 className="letra-Titulos">
                    Panel de administración
                </h1>

                <p className="texto-general">
                    Bienvenido a Pastelería Mil Sabores.
                    Selecciona una sección para comenzar.
                </p>
            </header>

            <div className="row g-4">
                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card h-100 p-4">
                        <h2 className="h4">Productos</h2>

                        <p>
                            Consulta y administra los productos
                            de la pastelería.
                        </p>

                        <Link
                            to="/admin/productos"
                            className="btn btn-outline-secondary mt-auto"
                        >
                            Ver productos
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card h-100 p-4">
                        <h2 className="h4">Categorías</h2>

                        <p>
                            Organiza las categorías del catálogo.
                        </p>

                        <Link
                            to="/admin/categorias"
                            className="btn btn-outline-secondary mt-auto"
                        >
                            Ver categorías
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card h-100 p-4">
                        <h2 className="h4">Usuarios</h2>

                        <p>
                            Consulta y administra los usuarios
                            registrados.
                        </p>

                        <Link
                            to="/admin/usuarios"
                            className="btn btn-outline-secondary mt-auto"
                        >
                            Ver usuarios
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PanelAdmin;