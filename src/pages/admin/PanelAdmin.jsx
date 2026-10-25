import { Link } from "react-router-dom";
import { obtenerPedidos } from "../../assets/js/pedidos";
import { obtenerProductos } from "../../assets/js/Datos";
import { obtenerCategorias } from "../../assets/js/categorias";
import { obtenerUsuarios, obtenerSesion } from "../../assets/js/usuarios";

function PanelAdmin() {
    const producto = obtenerProductos();
    const productosCriticos = producto
        .filter((item) => item.stock <= 5)
        .sort((a, b) => a.stock - b.stock);
    const categorias = obtenerCategorias();
    const usuarios = obtenerUsuarios();
    const usuario = obtenerSesion();
    const pedidosNuevos = obtenerPedidos().filter(
        (pedido) => pedido.estado === "pendiente"
    );
    const administradores = usuarios.filter(
        (item) => item.rol === "admin"
    );

    const resumen = [
        { nombre: "Productos", cantidad: producto.length, ruta: "/admin/productos" },
        { nombre: "Categorías", cantidad: categorias.length, ruta: "/admin/categorias" },
        { nombre: "Administradores", cantidad: administradores.length, ruta: "/admin/usuarios" },
    ];


    return (
        <section className="inicio-admin">
            <header className="bienvenida-inicio-admin">
                <div className="row g-0 align-items-center">
                    <div className="col-12 col-lg-6">
                        <div className="texto-inicio-admin">
                            <h1 className="saludo-inicio-admin">
                                Hola, {usuario?.nombre || "Administrador"}.
                            </h1>
                            <p className="descripcion-inicio-admin">
                                Tu pastelería, organizada en un solo lugar.
                                Gestiona el catálogo y encuentra lo que necesitas para comenzar.
                            </p>
                            <Link to="/admin/productos/nuevo" className="boton-admin">
                                + Nuevo producto
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="logo-bienvenida-inicio-admin">
                            <img src="/img/logoLetra.png" alt="Pastelería Mil Sabores" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="titulo-seccion-inicio-admin">
                <h2>Resumen general</h2>
            </div>

            <div className="row g-4">
                {resumen.map((item) => (
                    <div className="col-12 col-md-6 col-xl-4" key={item.nombre}>
                        <Link to={item.ruta} className="numero-inicio-admin h-100">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                                <h3>{item.nombre}</h3>
                                <span className="flecha-inicio-admin" aria-hidden="true">↗</span>
                            </div>
                            <p className="cantidad-inicio-admin">{item.cantidad}</p>
                        </Link>
                    </div>
                ))}
            </div>


            <section className="mt-4" aria-label="Productos con stock crítico">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                    <h2 className="h4 mb-0">Productos con stock crítico</h2>
                    <span>5 unidades o menos</span>
                </div>
                <div className="table-responsive tabla-admin">
                    <table className="table align-middle tabla-stock-inicio" aria-label="Stock crítico">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosCriticos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.stock === 0 ? "Agotado" : "Stock bajo"}</td>
                                    <td>
                                        <Link to={`/admin/productos/${item.id}/editar`} className="boton-admin">
                                            Actualizar stock
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {productosCriticos.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        No hay productos con stock crítico.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="aviso-inicio-admin">
                <div role="status">
                    <h2>Pedidos nuevos</h2>
                    <p>
                        {pedidosNuevos.length > 0
                            ? `Tienes ${pedidosNuevos.length} pedido(s) pendiente(s) por atender.`
                            : "No tienes pedidos nuevos."}
                    </p>
                </div>
                <Link to="/admin/pedidos" className="boton-admin">
                    Ver pedidos
                </Link>
            </div>


            <div className="aviso-inicio-admin">
                <div>
                    <h2>Ventas</h2>
                    <p>Accede a los reportes de la pastelería.</p>
                </div>
                <Link to="/admin/reportes" className="boton-admin">
                    Ver ventas
                </Link>
            </div>
        </section>
    );
}

export default PanelAdmin;
