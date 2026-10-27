import { useRef, useState } from "react";
import { agregarProducto, obtenerCarrito } from "../assets/js/carrito";
import { Link } from "react-router-dom";
import CantidadProducto from "./CantidadProducto";
function TarjetaProducto({ producto, esAdmin = false, esDetalle = false }) {
    const ventana = useRef(null);
    const confirmacion = useRef(null);
    const [cantidadAgregada, setCantidadAgregada] = useState(0);
    const [cantidad, setCantidad] = useState(1);
    const [disponibles, setDisponibles] = useState(0);
    const [errorCantidad, setErrorCantidad] = useState("");
    const existente = obtenerCarrito().find((item) => item.id === producto.id);
    const cantidadEnCarrito = existente ? existente.cantidad : 0;
    const maximo = producto.stock - cantidadEnCarrito;

    function cambiarCantidad(nuevaCantidad) {
        setCantidad(nuevaCantidad);
        setErrorCantidad("");
    }

    function abrirCantidad() {
        setDisponibles(maximo);
        setCantidad(1);
        setErrorCantidad("");
        ventana.current.showModal();
    }

    function agregarAlCarrito(evento) {
        evento.preventDefault();
        setErrorCantidad("");

        try {
            agregarProducto(producto.id, cantidad);
            setCantidadAgregada(cantidad);
            setCantidad(1);

            if (!esDetalle) {
                ventana.current.close();
            }

            confirmacion.current.showModal();
        } catch (error) {
            setErrorCantidad(error.message || "No se pudo guardar el carrito.");
        }
    }

    function cerrarCantidad() {
        ventana.current.close();
    }

    function cerrarConfirmacion() {
        confirmacion.current.close();
    }

    return (
        <article className="card h-100">
            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
            />

            <div className="card-body texto-general">
                <h2 className="card-title texto-general">
                    {producto.nombre}
                </h2>

                {esDetalle && (
                    <>
                        <p className="tamano-detalle-producto">{producto.tamano}</p>
                        <p className="descripcion-detalle-producto">{producto.descripcion}</p>
                    </>
                )}

                <p className="precio-producto">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

                {esAdmin && (
                    <p className="stock-producto-admin">
                        <strong>Stock:</strong>{" "}
                        {producto.stock ?? "Sin registrar"}
                    </p>
                )}

                {esDetalle && (
                    <CantidadProducto
                        cantidad={cantidad}
                        cambiarCantidad={cambiarCantidad}
                        maximo={maximo}
                        className="cantidad-detalle-producto"
                    />
                )}
                {esDetalle && errorCantidad && <p role="alert">{errorCantidad}</p>}

                <div className="acciones-producto">
                    {esAdmin ? (
                        <>
                            <Link
                                to={`/admin/productos/${producto.id}/editar`}
                                className="boton-detalle"
                            >
                                Editar
                            </Link>

                            <button type="button" className="boton-agregar" disabled>
                                Eliminar
                            </button>
                        </>
                    ) : (
                        <>
                            {!esDetalle && (
                                <Link
                                    to={`/productos/${producto.id}`}
                                    className="boton-detalle"
                                >
                                    Ver detalle
                                </Link>
                            )}

                            <button
                                type="button"
                                className="boton-agregar"
                                onClick={esDetalle ? agregarAlCarrito : abrirCantidad}
                                disabled={producto.stock === 0 || (esDetalle && maximo === 0)}
                            >
                                {producto.stock === 0 ? "Agotado" : "Agregar al carrito"}
                            </button>
                        </>
                    )}
                </div>

            </div>

            {!esAdmin && (
                <dialog
                    ref={confirmacion}
                    className="ventana-cantidad-producto confirmacion-carrito-producto"
                    aria-label="Producto agregado al carrito"
                >
                    <span className="icono-agregado-carrito" aria-hidden="true">✓</span>
                    <h2>¡Agregado al carrito!</h2>
                    <p>{producto.nombre}</p>
                    <p>Cantidad agregada: {cantidadAgregada}</p>
                    <div className="acciones-cantidad-producto">
                        <button type="button" onClick={cerrarConfirmacion}>
                            Seguir comprando
                        </button>
                        <Link to="/carrito">Ver mi carrito</Link>
                    </div>
                </dialog>
            )}

            {!esAdmin && !esDetalle && (
                <dialog
                    ref={ventana}
                    className="ventana-cantidad-producto"
                    aria-label={`Agregar ${producto.nombre} al carrito`}
                >
                    <h2>¿Cuántas unidades quieres agregar?</h2>
                    <p>{producto.nombre}</p>
                    {disponibles > 0 ? (
                        <form className="texto-general" onSubmit={agregarAlCarrito}>
                            <p className="titulo-cantidad-producto">Cantidad</p>
                            <CantidadProducto
                                cantidad={cantidad}
                                cambiarCantidad={cambiarCantidad}
                                maximo={disponibles}
                                className="control-cantidad-producto"
                            />
                            {errorCantidad && <p role="alert">{errorCantidad}</p>}
                            <div className="acciones-cantidad-producto">
                                <button type="button" onClick={cerrarCantidad}>
                                    Cancelar
                                </button>
                                <button type="submit">Confirmar</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p>Este producto ya está en tu carrito con la cantidad máxima.</p>
                            <button type="button" onClick={cerrarCantidad}>
                                Cerrar
                            </button>
                        </>
                    )}
                </dialog>
            )}
        </article>
    );
}

export default TarjetaProducto;
