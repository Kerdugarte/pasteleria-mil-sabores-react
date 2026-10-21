function TarjetaProducto({ producto }) {
    return (
        <article className="card">
            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
            />

            <div className="card-body">
                <h2 className="card-title texto-general">
                    {producto.nombre}
                </h2>

                <p className="texto-general">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>
            </div>
        </article>
    );
}

export default TarjetaProducto;