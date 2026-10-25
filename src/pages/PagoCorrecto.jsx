import { Link, Navigate, useParams } from "react-router-dom";
import { obtenerSesion } from "../assets/js/usuarios";
import { obtenerPedidos } from "../assets/js/pedidos";

function PagoCorrecto() {
    const { id } = useParams();
    const usuario = obtenerSesion();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const pedido = obtenerPedidos().find(
        (item) => item.id === id && item.email === usuario.email && item.pago === "pagado"
    );

    if (!pedido) {
        return <Navigate to="/carrito" replace />;
    }

    const estados = {
        pendiente: "Pendiente de preparación",
        preparacion: "En preparación",
        listo: "Listo",
        entregado: "Entregado",
        cancelado: "Cancelado",
    };

    return (
        <main className="container py-5 pagina-pago">
            <section className="panel-pago-cliente resultado-pago-cliente">
                <div className="icono-resultado-pago" aria-hidden="true">✓</div>
                <h1 className="letra-Titulos">Pago correcto</h1>
                <p>Tu pedido de prueba fue registrado correctamente.</p>
                <div className="datos-resultado-pago">
                    <p><strong>Pedido:</strong> {pedido.numero}</p>
                    <p><strong>Fecha:</strong> {pedido.fecha}</p>
                    <p><strong>Total:</strong> ${pedido.total.toLocaleString("es-CL")}</p>
                    <p><strong>Estado:</strong> {estados[pedido.estado] || pedido.estado}</p>
                </div>
                <p>Pago simulado: no se realizó ningún cobro real.</p>
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                    <Link to="/mi-cuenta" className="boton-cliente">Ir a mi cuenta</Link>
                    <Link to="/productos" className="boton-cliente boton-cliente-secundario">Seguir comprando</Link>
                </div>
            </section>
        </main>
    );
}

export default PagoCorrecto;
