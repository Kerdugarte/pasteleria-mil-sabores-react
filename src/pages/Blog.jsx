import { useRef, useState } from "react";
import TarjetaBlog from "../components/TarjetaBlog";
import { publicaciones } from "../assets/js/publicaciones";
import "../assets/css/blog.css";

function Blog() {
    const ventanaArticulo = useRef(null);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState("Todos");
    const publicacionesFiltradas = publicaciones.filter(
        (publicacion) =>
            filtro === "Todos" || publicacion.tipo === filtro
    );
    function leerArticulo(publicacion) {
        setArticuloSeleccionado(publicacion);
        ventanaArticulo.current.showModal();
    }

    return (
        <main className="pagina-blog container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-Titulos">El rincón dulce</h1>
                <p className="texto-general">
                    Bienvenidos al blog de Pastelería Mil Sabores.
                    Descubre recetas, consejos de repostería
                    y novedades preparadas con mucho cariño.
                </p>
            </header>

            <section>
                <h2 className="text-center mb-4">
                    Nuestras publicaciones
                </h2>

                <div className="blog-filtros">
                    {["Todos", "Blog", "Noticias"].map((tipo) => (
                        <button
                            key={tipo}
                            type="button"
                            className={filtro === tipo ? "blog-filtro activo" : "blog-filtro"}
                            aria-pressed={filtro === tipo}
                            onClick={() => setFiltro(tipo)}
                        >
                            {tipo}
                        </button>
                    ))}
                </div>


                <div className="row g-4">
                    {publicacionesFiltradas.map((publicacion) => (
                        <TarjetaBlog
                            key={publicacion.id}
                            publicacion={publicacion}
                            leerMas={() => leerArticulo(publicacion)}
                        />
                    ))}
                </div>

                {publicacionesFiltradas.length === 0 && (
                    <p className="text-center mt-4">
                        Próximamente compartiremos nuevas publicaciones.
                    </p>
                )}

            </section>

            <dialog
                ref={ventanaArticulo}
                className="blog-modal"
                aria-label="Artículo del blog"
            >
                <button
                    type="button"
                    className="blog-modal-cerrar"
                    aria-label="Cerrar artículo"
                    onClick={() => ventanaArticulo.current.close()}
                >
                    ×
                </button>

                {articuloSeleccionado && (
                    <>
                        <img
                            src={articuloSeleccionado.imagen}
                            alt={articuloSeleccionado.titulo}
                            className="blog-modal-imagen"
                        />
                        <span className="blog-categoria">{articuloSeleccionado.categoria}</span>
                        <h2>{articuloSeleccionado.titulo}</h2>
                        <p>{articuloSeleccionado.descripcion}</p>
                    </>
                )}
            </dialog>
        </main>
    );
}

export default Blog;
