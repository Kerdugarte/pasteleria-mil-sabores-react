import { Link, useParams } from "react-router-dom";
import { obtenerProductos } from "../assets/js/Datos";
import TarjetaProducto from "../components/TarjetaProducto";

function DetalleProducto() {
    const producto = obtenerProductos();
    const { id } = useParams();
    const seleccionado = producto.find((item) => item.id === Number(id));

    if (!seleccionado) {
        return (
            <main className="container py-5 text-center">
                <h1 className="letra-Titulos">Producto no encontrado</h1>
                <Link to="/productos">Volver a productos</Link>
            </main>
        );
    }

    return (
        <main className="container py-5 detalle-producto">
            <header className="encabezado-productos">
                <h1 className="letra-Titulos">Detalle del producto</h1>
            </header>

            <Link to="/productos" className="boton-detalle mb-4">
                ← Volver a productos
            </Link>

            <div className="detalle-producto-tarjeta" key={seleccionado.id}>
                <TarjetaProducto producto={seleccionado} esDetalle />
            </div>
        </main>
    );
}

export default DetalleProducto;
