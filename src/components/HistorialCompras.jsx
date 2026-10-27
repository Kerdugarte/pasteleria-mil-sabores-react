import { useSearchParams, Link } from "react-router-dom";
import { obtenerPedidos } from "../assets/js/pedidos";
import { obtenerSesion, obtenerUsuarios } from "../assets/js/usuarios";

function HistorialCompras({ esAdmin = false }) {
    
    const [parametros, setParametros] = useSearchParams();
    const usuario = obtenerSesion();
    const pedidos = obtenerPedidos();
    const clientes = obtenerUsuarios().filter((item) => item.rol === "cliente").map((item) => item.email);
    pedidos.forEach((pedido) => {
        if (pedido.email && !clientes.includes(pedido.email)) clientes.push(pedido.email);
    });
    const email = esAdmin ? parametros.get("cliente") || "" : usuario?.email;
    const compras = pedidos.filter((pedido) => pedido.email === email && pedido.pago === "pagado");
    const estados = { pendiente: "Pendiente", preparacion: "En preparación", listo: "Listo", entregado: "Entregado", cancelado: "Cancelado" };

    function cambiarCliente(evento) {
        setParametros(evento.target.value ? { cliente: evento.target.value } : {});
    }

    return (
        <section className="mt-4" aria-label="Historial de compras">
            <h2 className="letra-titulos mb-4">Historial de compras</h2>
            {esAdmin && (
                <div className="mb-4">
                    <label htmlFor="clienteHistorial" className="form-label">Cliente</label>
                    <select id="clienteHistorial" className="form-select" value={email} onChange={cambiarCliente}>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map((correo) => <option key={correo} value={correo}>{correo}</option>)}
                    </select>
                </div>
            )}
            <div className="table-responsive tabla-admin">
                <table className="table align-middle">
                    <thead><tr><th>Pedido</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Detalle</th></tr></thead>
                    <tbody>
                        {compras.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.numero || pedido.id}</td><td>{pedido.fecha}</td>
                                <td>${pedido.total.toLocaleString("es-CL")}</td>
                                <td>{estados[pedido.estado] || pedido.estado}</td>
                                <td><Link className={esAdmin ? "boton-admin" : "boton-cliente"} to={esAdmin ? `/admin/pedidos/${pedido.id}/boleta` : `/pago/correcto/${pedido.id}`}>Ver compra</Link></td>
                            </tr>
                        ))}
                        {compras.length === 0 && <tr><td colSpan={5}>{esAdmin && !email ? "Selecciona un cliente para ver sus compras." : "No hay compras registradas para este cliente."}</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HistorialCompras;
