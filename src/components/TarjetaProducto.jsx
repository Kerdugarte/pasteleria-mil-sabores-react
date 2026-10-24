import { Link } from "react-router-dom";

function TarjetaProducto({ producto, esAdmin = false }) {
    return (
        <article className="card h-100">
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

                {esAdmin && (
                    <p className="stock-producto-admin">
                        <strong>Stock:</strong>{" "}
                        {producto.stock ?? "Sin registrar"}
                    </p>
                )}

                <div className="acciones-producto">
                    {esAdmin ? (
                        <>
                            <button
                                type="button"
                                className="boton-detalle"
                                disabled
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                className="boton-agregar"
                                disabled
                            >
                                Eliminar
                            </button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;