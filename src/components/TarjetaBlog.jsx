function TarjetaBlog({ publicacion, leerMas }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <article className="blog-tarjeta">
                <img
                    src={publicacion.imagen}
                    alt={publicacion.titulo}
                    className="blog-imagen"
                />

                <div className="blog-contenido">
                    <span className="blog-categoria">
                        {publicacion.categoria}
                    </span>

                    <h3>{publicacion.titulo}</h3>

                    <p>{publicacion.descripcion}</p>

                    <button
                        type="button"
                        className="blog-boton"
                        onClick={leerMas}
                    >
                        Leer más
                    </button>
                </div>
            </article>
        </div>
    );
}

export default TarjetaBlog;
