import { useState } from "react";
import { obtenerPedidos } from "../../assets/js/pedidos";

function ReportesAdmin() {
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const pedidos = obtenerPedidos();

    const pedidosFiltrados = pedidos.filter((pedido) => {
        return (!desde || pedido.fechaRegistro >= desde) &&
            (!hasta || pedido.fechaRegistro <= hasta);
    });

    const ventas = pedidosFiltrados.filter(
        (pedido) => pedido.pago === "pagado" && pedido.estado !== "cancelado"
    );
    const totalVendido = ventas.reduce((suma, pedido) => suma + pedido.total, 0);
    const pendientes = pedidosFiltrados.filter((pedido) => pedido.estado === "pendiente");
    const productosVendidos = [];

    ventas.forEach((pedido) => {
        (pedido.productos || []).forEach((item) => {
            const existente = productosVendidos.find((producto) => producto.id === item.id);
            if (existente) {
                existente.cantidad += item.cantidad;
                existente.total += item.precio * item.cantidad;
            } else {
                productosVendidos.push({
                    id: item.id,
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    total: item.precio * item.cantidad,
                });
            }
        });
    });

    productosVendidos.sort((a, b) => b.cantidad - a.cantidad || b.total - a.total);


    return (
        <section>
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Ventas y pedidos</h1>
                <p>Resumen de los pedidos y las ventas simuladas de la pastelería.</p>
            </header>

            <div className="row g-3 mb-4 filtro-fechas-admin">
                <div className="col-12 col-md-6">
                    <label htmlFor="ventasDesde" className="form-label">Desde</label>
                    <input type="date" id="ventasDesde" className="form-control" value={desde} max={hasta || undefined} onChange={(event) => setDesde(event.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="ventasHasta" className="form-label">Hasta</label>
                    <input type="date" id="ventasHasta" className="form-control" value={hasta} min={desde || undefined} onChange={(event) => setHasta(event.target.value)} />
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-4">
                    <article className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Total vendido (simulado)</h2>
                        <p className="fs-2 fw-bold mb-0">${totalVendido.toLocaleString("es-CL")}</p>
                    </article>
                </div>
                <div className="col-12 col-lg-4">
                    <article className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Pedidos registrados</h2>
                        <p className="fs-2 fw-bold mb-0">{pedidosFiltrados.length}</p>
                    </article>
                </div>
                <div className="col-12 col-lg-4">
                    <article className="card resumen-admin h-100 p-4">
                        <h2 className="h4">Pedidos pendientes</h2>
                        <p className="fs-2 fw-bold mb-0">{pendientes.length}</p>
                    </article>
                </div>
            </div>

            <h2 className="h4 mb-3">Productos más vendidos</h2>
            <div className="table-responsive tabla-admin mb-4">
                <table className="table align-middle" aria-label="Productos más vendidos">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Unidades vendidas</th>
                            <th scope="col">Importe antes de descuentos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosVendidos.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.total.toLocaleString("es-CL")}</td>
                            </tr>
                        ))}
                        {productosVendidos.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    No hay productos vendidos en este período.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2 className="h4 mb-3">Detalle de pedidos</h2>
            <div className="table-responsive tabla-admin">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Pedido</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.numero || pedido.id}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.fecha}</td>
                                <td>${pedido.total.toLocaleString("es-CL")}</td>
                                <td>{pedido.estado === "preparacion" ? "En preparación" : pedido.estado}</td>
                                <td>{pedido.pago === "pagado" ? "Correcto (simulado)" : "Sin confirmar"}</td>
                            </tr>
                        ))}
                        {pedidosFiltrados.length === 0 && (
                            <tr><td colSpan={6} className="text-center py-4">No hay pedidos en este período.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ReportesAdmin;
