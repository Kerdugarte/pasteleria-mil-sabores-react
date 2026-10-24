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
    contenido: "Para lograr una torta perfecta, es importante seguir algunos pasos clave. Primero, asegúrate de medir correctamente los ingredientes y utilizar productos frescos. Precalienta el horno a la temperatura adecuada y evita abrir la puerta durante la cocción para mantener la temperatura constante. Además, no sobre mezcles la masa, ya que esto puede afectar la textura. Por último, deja enfriar la torta antes de desmoldarla para evitar que se rompa. Siguiendo estos consejos, podrás disfrutar de una torta deliciosa y bien presentada.",
    imagen: "/img/torta.jpg"
  },
  {
    id: 2,
    tipo: "Blog",
    titulo: "Postres sin azúcar",
    categoria: "Vida saludable",
    descripcion:
      "Conoce alternativas para disfrutar de deliciosos postres sin azúcar añadida.",
    contenido: "Este queque de limón, almendra y cereza suena una mezcla inusual, pero queda muy rico. Amo los queques, así que siempre ando buscando y pensando en nuevos sabores para hacer distintos.Los queques de limón son de mis favoritos y esta vez quise hacerlo también con almendras y con un glaseado de cerezas. La combinación de sabores es exquisita y es perfecto para el verano porque es bien cítrico y no tan dulce. El limón y las almendras son muy buenos amigos, es una mezcla de sabores muy rica, así que son carta segura en una receta. Quedaría riquísimo también en galletas, por ejemplo.¡Es muy fácil de hacer! Así que no hay excusas. Tengo muchas otras recetas de queques publicadas en mi página, varios de ellos también tienen limón, así que te invito a que vayas a verlas.¡Cuéntame si lo haces!@caro_pasteles_duoc.",
    imagen: "/img/queque-limon.png"
  },
  {
    id: 3,
    tipo: "Blog",
    titulo: "El arte de decorar cupcakes",
    categoria: "Repostería",
    descripcion:"Aprende ideas sencillas para decorar cupcakes y sorprender en tus celebraciones.",
    contenido: "Decorar cupcakes puede ser una actividad divertida y creativa. Puedes utilizar diferentes tipos de glaseado, como buttercream o fondant, para crear diseños únicos. Añadir toppings como frutas, chispas de chocolate o confites también puede darle un toque especial. Experimenta con colores y texturas para hacer que tus cupcakes sean visualmente atractivos. Recuerda que la presentación es clave, así que dedica tiempo a decorar cada cupcake con cuidado y atención al detalle.",
    imagen: "/img/cupcakes.jpg"
  },
  {
    id: 4,
    tipo: "Noticias",
    titulo: "Innovación y textura: la pastelería reinterpreta sus clásicos con ingredientes locales",
    categoria: "Novedades",
    descripcion: "La repostería contemporánea combina técnicas tradicionales con ingredientes locales para crear nuevas experiencias dulces.",
    contenido: "La repostería contemporánea da un giro creativo al combinar técnicas tradicionales de la alta pastelería con ingredientes locales e insumos no convencionales. Las nuevas tendencias se alejan del exceso de azúcares refinados para dar protagonismo a fermentaciones naturales, harinas alternativas como las de frutos secos o legumbres, y combinaciones botánicas que integran hierbas aromáticas y flores comestibles. Esta propuesta busca ofrecer postres más ligeros y equilibrados, priorizando el contraste de texturas desde crujientes artesanales hasta mousses aireadas sin perder el carácter indulgente que define al arte dulce.",
    imagen: "/img/Cheesecake.png"

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
        <div className="blog-encabezado text-center mb-5">
        <h1 className="letra-Titulos">El rincón dulce</h1>
        <p className="texto-general blog-introduccion">
            Un rincón para compartir nuestra pasión por la repostería,
            descubrir nuevas tendencias y disfrutar de cada dulce inspiración.
        </p>
        </div>

        <section>
        <h2 className="letra-Titulos text-center mb-4">
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

            <p>
                {articuloSeleccionado.contenido ||
                articuloSeleccionado.descripcion}
            </p>
            </div>
        </div>
        )}

    </main>
  );
}

export default Blog;
