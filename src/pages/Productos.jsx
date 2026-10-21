import TarjetaProducto from "../components/TarjetaProducto";

function Productos() {
    const productoEjemplo = {
        id: "prueba",
        nombre: "Tarta de Santiago",
        precio: 15000,
        imagen: "/img/Tarta de Santiago.png",
    };






    return (
        <main className="container py-5">
            <h1 className="letra-Titulos">Nuestros Productos</h1>

            <p className="texto-general">
                Encuentra el dulce perfecto para cada ocasión
            </p>

            <hr className="separador" />

            <div className="productos-contenedor">
                <section
                    className="tarjetas-contenedor"
                    aria-label="Catálogo de productos"
                >
                    <TarjetaProducto producto={productoEjemplo} />
                </section>
            </div>
        </main>
    );
}

export default Productos;