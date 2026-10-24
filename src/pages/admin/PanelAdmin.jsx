import { Link } from "react-router-dom";
import { producto } from "../../assets/js/Datos";
import { usuarios } from "../../assets/js/usuarios";

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
                    <div className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Productos</h2>

                        <p className="display-5 fw-bold">
                            {producto.length}
                        </p>

                        <p>
                            Productos disponibles en el catálogo.
                        </p>

                        <Link
                            to="/admin/productos"
                            className="boton-admin mt-auto"
                        >
                            Ver productos
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Categorías</h2>

                        <p>
                            Organiza las categorías del catálogo.
                        </p>

                        <Link
                            to="/admin/categorias"
                            className="boton-admin mt-auto"
                        >
                            Ver categorías
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <div className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Usuarios</h2>

                        <p className="display-5 fw-bold">
                            {usuarios.length}
                        </p>

                        <p>
                            Usuarios definidos en los datos de ejemplo.
                        </p>

                        <Link
                            to="/admin/usuarios"
                            className="boton-admin mt-auto"
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