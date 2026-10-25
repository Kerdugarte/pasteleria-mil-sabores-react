import { Link } from "react-router-dom";
import { obtenerProductos } from "../assets/js/Datos";

function StockCritico() {
    const criticos = obtenerProductos().filter((item) => item.stock <= 5).sort((a, b) => a.stock - b.stock);

    return (
        <section id="stock-critico" className="stock-critico-admin mt-4 mb-4" aria-label="Productos con stock crítico">
            <div className="encabezado-stock-admin">
                <h2 className="h4 mb-0">Productos con stock crítico</h2>
                <span>5 unidades o menos</span>
            </div>
            <div className="table-responsive tabla-admin">
                <table className="table align-middle tabla-stock-inicio">
                    <thead><tr><th>Producto</th><th>Stock</th><th>Estado</th><th>Acción</th></tr></thead>
                    <tbody>
                        {criticos.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td><td>{item.stock}</td>
                                <td>{item.stock === 0 ? "Agotado" : "Stock bajo"}</td>
                                <td><Link className="boton-admin" to={`/admin/productos/${item.id}/editar`}>Actualizar stock</Link></td>
                            </tr>
                        ))}
                        {criticos.length === 0 && <tr><td colSpan={4}>No hay productos con stock crítico.</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default StockCritico;
