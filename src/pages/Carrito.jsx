import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerCarrito, guardarCarrito } from "../assets/js/carrito";

function Carrito() {
    const [carrito, setCarrito] = useState(obtenerCarrito);
    const [mensaje, setMensaje] = useState("");

    function actualizarCarrito(actualizado) {
        try {
            guardarCarrito(actualizado);
            setCarrito(actualizado);
            setMensaje("");
        } catch {
            setMensaje("No se pudo guardar el cambio. Inténtalo nuevamente.");
        }
    }

    function cambiarCantidad(id, cantidad) {
        const articulo = carrito.find((item) => item.id === id);

        if (!articulo || cantidad < 1 || cantidad > articulo.stock) {
            return;
        }

        const actualizado = carrito.map((item) =>
            item.id === id ? { ...item, cantidad } : item
        );

        actualizarCarrito(actualizado);
    }

    function quitarProducto(id) {
        const actualizado = carrito.filter((item) => item.id !== id);
        actualizarCarrito(actualizado);
    }

    const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    return (
        <main className="container py-5 pagina-carrito">
            <header className="encabezado-carrito-cliente">
                <h1 className="letra-titulos">Mi carrito</h1>
                <p>Un dulce momento está por comenzar.</p>
            </header>

            {mensaje && <p className="alert alert-danger" role="alert">{mensaje}</p>}

            {carrito.length === 0 ? (
                <section className="carrito-cliente-vacio">
                    <img src="/img/icono-carro.png" alt="" />
                    <h2>Tu carrito está vacío</h2>
                    <p>Encuentra tu próximo favorito en nuestro catálogo.</p>
                    <Link to="/productos" className="boton-cliente">Ver productos</Link>
                </section>
            ) : (
                <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-8">
                        <ul className="lista-carrito-cliente">
                            {carrito.map((item) => (
                                <li className="producto-carrito-cliente" key={item.id}>
                                    <img src={item.imagen} alt={item.nombre} />
                                    <div className="datos-producto-carrito">
                                        <h2>{item.nombre}</h2>
                                        <p>${item.precio.toLocaleString("es-CL")} por unidad</p>
                                        <div className="cantidad-carrito-cliente" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                                            <button
                                                type="button"
                                                aria-label={`Quitar una unidad de ${item.nombre}`}
                                                disabled={item.cantidad === 1}
                                                onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                                            >−</button>
                                            <span aria-live="polite">{item.cantidad}</span>
                                            <button
                                                type="button"
                                                aria-label={`Agregar una unidad de ${item.nombre}`}
                                                disabled={item.cantidad >= item.stock}
                                                onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                                            >+</button>
                                        </div>
                                        <p className="subtotal-carrito-cliente">
                                            Subtotal: ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                        </p>
                                        <button type="button" className="quitar-carrito-cliente" onClick={() => quitarProducto(item.id)}>
                                            Quitar producto
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/productos" className="boton-cliente boton-cliente-secundario">Seguir comprando</Link>
                    </div>

                    <div className="col-12 col-lg-4">
                        <section className="resumen-carrito-cliente">
                            <h2>Resumen de tu carrito</h2>
                            <p>Unidades: {unidades}</p>
                            <div className="total-carrito-cliente" aria-live="polite">
                                <span>Total productos</span>
                                <strong>${total.toLocaleString("es-CL")}</strong>
                            </div>
                            <p className="nota-carrito-cliente">Continúa para revisar el pedido y probar el pago simulado, sin cobros reales.</p>
                            <Link to="/pago" className="boton-cliente w-100">Continuar compra</Link>
                        </section>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Carrito;
