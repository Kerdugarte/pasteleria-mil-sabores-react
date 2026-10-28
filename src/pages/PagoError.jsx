import { Link } from "react-router-dom";

function PagoError() {
    return (
        <main className="container py-5 pagina-pago">
            <section className="panel-pago-cliente resultado-pago-cliente">
                <div className="icono-resultado-pago icono-error-pago" aria-hidden="true">×</div>
                <h1 className="letra-titulos">Pago con error</h1>
                <p>No se completó el pago.</p>
                <p>Tus productos siguen en el carrito. Puedes revisar la compra e intentarlo nuevamente.</p>
                <p>No se creó ningún pedido ni se realizó ningún cobro.</p>
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                    <Link to="/pago" className="boton-cliente">Reintentar</Link>
                    <Link to="/carrito" className="boton-cliente boton-cliente-secundario">Volver al carrito</Link>
                </div>
            </section>
        </main>
    );
}

export default PagoError;
