import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
    return (
        <article className="card">
            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
            />

            <div className="card-body">
                <h2 className="card-title texto-general">
                    {producto.nombre}
                </h2>

                <p className="precio-producto">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

                <div className="acciones-producto">
                    <Link
                        to={`/productos/${producto.id}`}
                        className="boton-detalle"
                    >
                        Ver detalle
                    </Link>

                    <button
                        type="button"
                        className="boton-agregar"
                        disabled
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;