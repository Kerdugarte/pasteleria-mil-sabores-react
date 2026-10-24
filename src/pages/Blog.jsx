
const publicaciones = [
  {
    id: 1,
    titulo: "Secretos para una torta perfecta",
    categoria: "Consejos",
    descripcion:
      "Descubre algunos consejos para preparar tortas suaves, esponjosas y deliciosas.",
    imagen: "/blog/torta.jpg"
  },
  {
    id: 2,
    titulo: "Postres sin azúcar",
    categoria: "Vida saludable",
    descripcion:
      "Conoce alternativas para disfrutar de deliciosos postres sin azúcar añadida.",
    imagen: "/blog/sin-azucar.jpg"
  },
  {
    id: 3,
    titulo: "El arte de decorar cupcakes",
    categoria: "Repostería",
    descripcion:
      "Aprende ideas sencillas para decorar cupcakes y sorprender en tus celebraciones.",
    imagen: "/blog/cupcakes.jpg"
  }
];

function TarjetaBlog({ publicacion }) {
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

          <button type="button" className="blog-boton">
            Leer más
          </button>
        </div>
      </article>
    </div>
  );
}


function Blog() {
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

        <div className="row g-4">
            {publicaciones.map((publicacion) => (
            <TarjetaBlog
                key={publicacion.id}
                publicacion={publicacion}
            />
            ))}
        </div>
        </section>
    </main>
  );
}

export default Blog;
