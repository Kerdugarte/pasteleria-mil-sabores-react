import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { obtenerSesion } from "../assets/js/usuarios";
import { obtenerCarrito } from "../assets/js/carrito";
import { realizarPagoSimulado } from "../assets/js/pago";

function Pago() {
    const usuario = obtenerSesion();
    const carrito = obtenerCarrito();
    const [idIntento] = useState(() => crypto.randomUUID());
    const [error, setError] = useState("");
    const [procesando, setProcesando] = useState(false);
    const navigate = useNavigate();

    if (!usuario) {
        return <Navigate to="/login" state={{ volver: "/pago" }} replace />;
    }

    if (usuario.rol !== "cliente") {
        return <Navigate to="/admin" replace />;
    }

    if (carrito.length === 0 && !procesando) {
        return <Navigate to="/carrito" replace />;
    }

    function pagar(resultado) {
        if (procesando) {
            return;
        }

        setProcesando(true);
        setError("");

        try {
            const pedido = realizarPagoSimulado(idIntento, resultado);

            if (pedido) {
                navigate(`/pago/correcto/${pedido.id}`, { replace: true });
            } else {
                navigate("/pago/error", { replace: true });
            }
        } catch {
            setError("No se pudo completar la simulación. Tu carrito se conserva; inténtalo nuevamente.");
            setProcesando(false);
        }
    }

    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    return (
        <main className="container py-5 pagina-pago">
            <header className="encabezado-carrito-cliente">
                <h1 className="letra-Titulos">Confirmar compra</h1>
                <p>Revisa tus productos antes de continuar.</p>
            </header>

            <div className="row g-4 justify-content-center">
                <div className="col-12 col-lg-8">
                    <section className="panel-pago-cliente">
                        <h2>Resumen del pedido</h2>
                        <p>Cliente: {usuario.nombre}</p>
                        <ul className="detalle-pago-cliente">
                            {carrito.map((item) => (
                                <li key={item.id}>
                                    <span>{item.nombre} × {item.cantidad}</span>
                                    <strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="total-pago-cliente">Total: ${total.toLocaleString("es-CL")}</p>
                        <div className="nota-simulacion-pago">
                            <h3>Pago simulado</h3>
                            <p>Esta demostración no realiza cobros. Elige un resultado para probar el flujo.</p>
                        </div>
                        {error && <p className="alert alert-danger" role="alert">{error}</p>}
                        <div className="d-flex flex-wrap gap-3 mt-4">
                            <button type="button" className="boton-cliente" disabled={procesando} onClick={() => pagar("correcto")}>
                                Simular pago correcto
                            </button>
                            <button type="button" className="boton-cliente boton-cliente-secundario" disabled={procesando} onClick={() => pagar("error")}>
                                Simular pago con error
                            </button>
                        </div>
                        <Link to="/carrito" className="volver-pago-cliente">← Volver al carrito</Link>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Pago;
