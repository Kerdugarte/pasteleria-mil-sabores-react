import { useState } from "react";
import "../assets/css/blog.css";

const publicaciones = [
  {
    id: 1,
    tipo: "Blog",
    titulo: "Secretos para una torta perfecta",
    categoria: "Consejos",
    descripcion:
      "Descubre algunos consejos para preparar tortas suaves, esponjosas y deliciosas.",
    imagen: "/img/torta.jpg"
  },
  {
    id: 2,
    tipo: "Blog",
    titulo: "Postres sin azúcar",
    categoria: "Vida saludable",
    descripcion:
      "Conoce alternativas para disfrutar de deliciosos postres sin azúcar añadida.",
    imagen: "/img/sin-azucar.jpg"
  },
  {
    id: 3,
    tipo: "Blog",
    titulo: "El arte de decorar cupcakes",
    categoria: "Repostería",
    descripcion:
      "Aprende ideas sencillas para decorar cupcakes y sorprender en tus celebraciones.",
    imagen: "/img/cupcakes.jpg"
  }
];


function TarjetaBlog({ publicacion, onLeerMas }) {
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
            onClick={onLeerMas}
          >
            Leer más
          </button>
        </div>
      </article>
    </div>
  );
}



function Blog() {
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
    const [filtro, setFiltro] = useState("Todos");
    const publicacionesFiltradas = publicaciones.filter(
  (publicacion) =>
    filtro === "Todos" || publicacion.tipo === filtro
);
  return (
    <main className="pagina-blog container py-5">
      <div className="text-center mb-5">
        <h1>El rincón dulce</h1>
        <p>
          Bienvenidos al blog de Pastelería Mil Sabores.
          Descubre recetas, consejos de repostería
          y novedades preparadas con mucho cariño.
        </p>
      </div>

        <section>
        <h2 className="text-center mb-4">
            Nuestras publicaciones
        </h2>
        
        <div className="blog-filtros">
        {["Todos", "Blog", "Noticias"].map((tipo) => (
            <button
            key={tipo}
            type="button"
            className={`blog-filtro ${
                filtro === tipo ? "activo" : ""
            }`}
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
                onLeerMas={() => setArticuloSeleccionado(publicacion)}
            />
            ))}
        </div>

        {publicacionesFiltradas.length === 0 && (
        <p className="text-center mt-4">
            Próximamente compartiremos nuevas publicaciones.
        </p>
        )}
        
        </section>
        
        {articuloSeleccionado && (
        <div className="blog-modal-fondo">
            <div
            className="blog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-titulo"
            >
            <button
                type="button"
                className="blog-modal-cerrar"
                aria-label="Cerrar artículo"
                onClick={() => setArticuloSeleccionado(null)}
            >
                ×
            </button>

            <img
                src={articuloSeleccionado.imagen}
                alt={articuloSeleccionado.titulo}
                className="blog-modal-imagen"
            />

            <span className="blog-categoria">
                {articuloSeleccionado.categoria}
            </span>

            <h2 id="blog-modal-titulo">
                {articuloSeleccionado.titulo}
            </h2>

            <p>{articuloSeleccionado.descripcion}</p>
            </div>
        </div>
        )}

    </main>
  );
}

export default Blog;
