import { Link } from "react-router-dom";
import { obtenerCategorias } from "../../assets/js/categorias";

function CategoriasAdmin() {
    const categorias = obtenerCategorias();
    return (
        <section>
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Categorías</h1>
                <p className="texto-general">Consulta las categorías del catálogo.</p>
            </header>
            <Link to="/admin/categorias/nueva" className="boton-admin mb-4">+ Nueva categoría</Link>
            <div className="row g-4">
                {categorias.map((categoria) => (
                    <div key={categoria.id} className="col-12 col-md-6 col-xl-4">
                        <article className="card resumen-admin texto-general h-100 p-4">
                            <h2 className="h4">{categoria.nombre}</h2>
                            <p>{categoria.valor}</p>
                            <button type="button" className="boton-admin mt-auto" disabled>Eliminar</button>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoriasAdmin;
