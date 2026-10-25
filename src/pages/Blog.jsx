import { useState } from "react";
import RecetasComunidad from "../components/RecetasComunidad";
import TarjetaBlog from "../components/TarjetaBlog";
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
    },
    {
        id: 4,
        tipo: "Noticias",
        titulo: "¡Mil Sabores llega a un nuevo lugar!",
        categoria: "Nueva sucursal",
        descripcion:
            "Estamos preparando una nueva sucursal para estar más cerca de ti y compartir nuestros dulces favoritos.",
        imagen: "/img/pasteleria2.png",
    }
];

function Blog() {
    const [filtro, setFiltro] = useState("Todos");
    const publicacionesFiltradas = publicaciones.filter(
        (publicacion) =>
            filtro === "Todos" || publicacion.tipo === filtro
    );

    return (
        <main className="pagina-blog container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-titulos">El rincon dulce</h1>
                <p className="texto-general">
                    Bienvenidos al blog de Pastelería Mil Sabores.
                    Descubre recetas, consejos de repostería
                    y novedades preparadas con mucho cariño.
                </p>
            </header>

            <section>

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
                        />
                    ))}
                </div>

                {publicacionesFiltradas.length === 0 && (
                    <p className="text-center mt-4">
                        Próximamente compartiremos nuevas publicaciones.
                    </p>
                )}

            </section>

            <RecetasComunidad />

        </main>
    );
}

export default Blog;
