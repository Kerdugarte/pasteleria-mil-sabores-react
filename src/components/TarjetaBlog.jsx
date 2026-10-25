function TarjetaBlog({ publicacion }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <article className="blog-tarjeta">
                <img
                    src={publicacion.imagen}
                    alt={publicacion.titulo}
                    className="blog-imagen"
                />

                <div className="blog-contenido texto-general">
                    <span className="blog-categoria">
                        {publicacion.categoria}
                    </span>

                    <h3 className="texto-general">{publicacion.titulo}</h3>

                    <p>{publicacion.descripcion}</p>

                    <button
                        type="button"
                        className="blog-boton"
                        disabled
                    >
                        Leer más
                    </button>
                </div>
            </article>
        </div>
    );
}

export default TarjetaBlog;
