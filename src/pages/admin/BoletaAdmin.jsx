import { Link, useParams } from "react-router-dom";
import { obtenerPedidos } from "../../assets/js/pedidos";

function BoletaAdmin() {
    const { id } = useParams();
    const pedido = obtenerPedidos().find((item) => String(item.id) === id);
    const estados = {
        pendiente: "Pendiente",
        preparacion: "En preparación",
        listo: "Listo",
        entregado: "Entregado",
        cancelado: "Cancelado",
    };

    if (!pedido) {
        return (
            <section>
                <h1 className="letra-Titulos">Pedido no encontrado</h1>
                <Link to="/admin/pedidos">Volver a pedidos</Link>
            </section>
        );
    }

    return (
        <section className="boleta-admin">
            <header className="encabezado-admin">
                <h1 className="letra-Titulos">Boleta del pedido</h1>
                <p className="texto-general">Comprobante de compra simulada.</p>
            </header>
            <div className="d-flex justify-content-between flex-wrap gap-3 mb-4 acciones-boleta-admin">
                <Link to="/admin/pedidos" className="boton-admin">← Volver a pedidos</Link>
                <button type="button" className="boton-admin" onClick={() => window.print()}>
                    Imprimir
                </button>
            </div>
            <article className="card resumen-admin p-4 p-md-5">
                <img src="/img/logoLetra.png" alt="Pastelería Mil Sabores" className="logo-boleta-admin" />
                <h2 className="h4">Pedido {pedido.numero || pedido.id}</h2>
                <p><strong>Fecha:</strong> {pedido.fecha}</p>
                <p><strong>Cliente:</strong> {pedido.cliente}</p>
                <p className="text-break"><strong>Correo:</strong> {pedido.email || "Sin registrar"}</p>
                <p><strong>Estado:</strong> {estados[pedido.estado] || pedido.estado}</p>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio unitario</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(pedido.productos || []).map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>${item.precio.toLocaleString("es-CL")}</td>
                                    <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="fs-3 fw-bold text-end">Total: ${pedido.total.toLocaleString("es-CL")}</p>
            </article>
        </section>
    );
}

export default BoletaAdmin;
