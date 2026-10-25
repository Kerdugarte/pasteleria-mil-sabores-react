import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerPedidos, guardarPedidos } from "../../assets/js/pedidos";

function PedidosAdmin() {
    const [pedidos, setPedidos] = useState(obtenerPedidos);
    const [error, setError] = useState("");

    function cambiarEstado(id, nuevoEstado) {
        const pedidosActualizados = pedidos.map((pedido) => {
            if (pedido.id === id) {
                return {
                    ...pedido,
                    estado: nuevoEstado,
                };
            }

            return pedido;
        });

        try {
            guardarPedidos(pedidosActualizados);
            setPedidos(pedidosActualizados);
            setError("");
        } catch {
            setError("No se pudo guardar el cambio de estado. Inténtalo nuevamente.");
        }
    }

    return (
        <section>
            <header className="encabezado-admin">
                <h1 className="letra-Titulos">
                    Pedidos
                </h1>

                <p className="texto-general">
                    Consulta los pedidos y actualiza su estado.
                </p>
            </header>

            {error && (
                <p className="alert alert-danger" role="alert">{error}</p>
            )}

            <div className="table-responsive tabla-admin">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Número</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Boleta</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.numero || pedido.id}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.fecha}</td>
                                <td>
                                    ${pedido.total.toLocaleString("es-CL")}
                                </td>
                                <td>
                                    <label
                                        htmlFor={`estado-${pedido.id}`}
                                        className="visually-hidden"
                                    >
                                        Estado del pedido {pedido.id}
                                    </label>

                                    <select
                                        id={`estado-${pedido.id}`}
                                        className="form-select"
                                        value={pedido.estado}
                                        onChange={(event) =>
                                            cambiarEstado(
                                                pedido.id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="preparacion">En preparación</option>
                                        <option value="listo">Listo</option>
                                        <option value="entregado">Entregado</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                </td>
                                <td>
                                    <Link to={`/admin/pedidos/${pedido.id}/boleta`} className="boton-admin">
                                        Ver boleta
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {pedidos.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-5">
                                    No hay pedidos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default PedidosAdmin;
