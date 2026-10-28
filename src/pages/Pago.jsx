import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { obtenerSesion } from "../assets/js/usuarios";
import { obtenerCarrito } from "../assets/js/carrito";
import { calcularCompra, realizarPagoSimulado } from "../assets/js/pago";
function Pago() {
    const usuario = obtenerSesion();
    const carrito = obtenerCarrito();
    const [idIntento] = useState(() => crypto.randomUUID());
    const [formulario, setFormulario] = useState({ nombre: usuario?.nombre || "", telefono: "", tipo: "retiro", direccion: "", comuna: "", codigo: "" });
    const [error, setError] = useState("");
    const [procesando, setProcesando] = useState(false);
    const navigate = useNavigate();

    function cambiarCampo(evento) {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
    }

    function pagar(evento) {
        evento.preventDefault();
        if (procesando) return;
        setProcesando(true);
        setError("");
        try {
            const resultado = evento.nativeEvent.submitter.value;
            const pedido = realizarPagoSimulado(idIntento, resultado, formulario);
            navigate(pedido ? `/pago/correcto/${pedido.id}` : "/pago/error", { replace: true });
        } catch (errorPago) {
            setError(errorPago.message);
            setProcesando(false);
        }
    }

    const resumen = calcularCompra(carrito, usuario?.email, formulario.tipo, formulario.codigo);

    if (!usuario) return <Navigate to="/login" state={{ volver: "/pago" }} replace />;

    if (usuario.rol !== "cliente") return <Navigate to="/admin" replace />;

    if (carrito.length === 0 && !procesando) return <Navigate to="/carrito" replace />;

    return (
        <main className="container py-5 pagina-pago">
            <header className="encabezado-carrito-cliente">
                <h1 className="letra-titulos" >Confirmar compra</h1>
            </header>
            <form className="row g-4 texto-general" onSubmit={pagar}>
                <div className="col-12 col-lg-6">
                    <section className="panel-pago-cliente h-100">
                        <h2 className="h4">Datos de entrega</h2>
                        <label htmlFor="compraNombre" className="form-label">Nombre de quien recibe</label>
                        <input id="compraNombre" name="nombre" className="form-control mb-3" value={formulario.nombre} onChange={cambiarCampo} autoComplete="name" required maxLength={80} />
                        <p className="text-break">Correo: {usuario.email}</p>
                        <label htmlFor="compraTelefono" className="form-label">Teléfono de contacto</label>
                        <input id="compraTelefono" name="telefono" type="tel" className="form-control mb-3" value={formulario.telefono} onChange={cambiarCampo} autoComplete="tel" required maxLength={20} />
                        <label htmlFor="compraEntrega" className="form-label">Forma de entrega</label>
                        <select id="compraEntrega" name="tipo" className="form-select mb-3" value={formulario.tipo} onChange={cambiarCampo}>
                            <option value="retiro">Retiro en tienda — gratis</option>
                            <option value="envio">Envío a domicilio</option>
                        </select>
                        {formulario.tipo === "envio" && <>
                            <label htmlFor="compraDireccion" className="form-label">Dirección</label>
                            <input id="compraDireccion" name="direccion" className="form-control mb-3" value={formulario.direccion} onChange={cambiarCampo} autoComplete="street-address" required maxLength={150} />
                            <label htmlFor="compraComuna" className="form-label">Comuna</label>
                            <input id="compraComuna" name="comuna" className="form-control mb-3" value={formulario.comuna} onChange={cambiarCampo} required maxLength={80} />
                            <p>Envío: $3.000. Gratis sobre $60.000 en productos, antes de descuentos.</p>
                        </>}
                        <label htmlFor="compraCodigo" className="form-label">Código promocional (opcional)</label>
                        <input id="compraCodigo" name="codigo" className="form-control" value={formulario.codigo} onChange={cambiarCampo} maxLength={20} />
                        <p className="mt-3">Primera compra: 10% automático. DUOC40: 40%. Se aplica un solo descuento.</p>
                    </section>
                </div>
                <div className="col-12 col-lg-6">
                    <section className="panel-pago-cliente h-100">
                        <h2 className="h4">Resumen del pedido</h2>
                        <ul className="detalle-pago-cliente">
                            {carrito.map((item) => <li key={item.id}><span>{item.nombre} × {item.cantidad}</span><strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong></li>)}
                        </ul>
                        <p>Productos: ${resumen.subtotal.toLocaleString("es-CL")}</p>
                        <p>Descuento ({resumen.porcentaje}%): −${resumen.descuento.toLocaleString("es-CL")}</p>
                        <p>Entrega: ${resumen.costoEnvio.toLocaleString("es-CL")}</p>
                        <p className="total-pago-cliente">Total: ${resumen.total.toLocaleString("es-CL")}</p>
                        <p>Pago simulado: selecciona un resultado. No se realizan cobros.</p>
                        {error && <p className="alert alert-danger" role="alert">{error}</p>}
                        <div className="d-flex flex-wrap gap-3 mt-4">
                            <button type="submit" value="correcto" className="boton-cliente" disabled={procesando}>Simular pago correcto</button>
                            <button type="submit" value="error" className="boton-cliente boton-cliente-secundario" disabled={procesando}>Simular pago con error</button>
                        </div>
                        <Link to="/carrito" className="volver-pago-cliente">← Volver al carrito</Link>
                    </section>
                </div>
            </form>
        </main>
    );
}

export default Pago;
