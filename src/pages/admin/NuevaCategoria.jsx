import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { obtenerCategorias, guardarCategorias } from "../../assets/js/categorias";

function NuevaCategoria() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categorias = obtenerCategorias();
    const actual = categorias.find((item) => item.id === Number(id));
    const [error, setError] = useState("");

    function guardarCategoria(event) {
        event.preventDefault();
        const datos = new FormData(event.currentTarget);
        const nombre = datos.get("nombre").trim();
        const valor = datos.get("valor").trim();
        const repetida = categorias.some((item) => item.id !== actual?.id &&
            (item.valor === valor || item.nombre.toLowerCase() === nombre.toLowerCase()));

        if (!nombre || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(valor) || repetida) {
            setError("Revisa el nombre y el código. La categoría no debe estar repetida.");
            return;
        }

        const nueva = { id: actual ? actual.id : new Date().getTime(), nombre, valor };
        const actualizadas = actual
            ? categorias.map((item) => item.id === actual.id ? nueva : item)
            : [...categorias, nueva];

        try {
            guardarCategorias(actualizadas);
            navigate("/admin/categorias");
        } catch {
            setError("No se pudo guardar la categoría. Inténtalo nuevamente.");
        }
    }

    if (id && !actual) {
        return <p>Categoría no encontrada. <Link to="/admin/categorias">Volver a categorías</Link></p>;
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <Link
                    to="/admin/categorias"
                    className="flecha-volver-admin"
                    aria-label="Volver a categorías"
                    title="Volver a categorías"
                >
                    <span aria-hidden="true">←</span>
                </Link>

                <h1 className="letra-Titulos">
                    {actual ? "Editar categoría" : "Nueva categoría"}
                </h1>

                <p className="texto-general">
                    Completa los datos de la categoría.
                </p>
            </header>

            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <form onSubmit={guardarCategoria}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="nombreCategoria"
                            className="form-label"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="nombreCategoria"
                            name="nombre"
                            defaultValue={actual ? actual.nombre : ""}
                            className="form-control"
                            placeholder="Tortas especiales"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="valorCategoria"
                            className="form-label"
                        >
                            Código de categoría
                        </label>

                        <input
                            type="text"
                            id="valorCategoria"
                            name="valor"
                            defaultValue={actual ? actual.valor : ""}
                            readOnly={Boolean(actual)}
                            className="form-control"
                            placeholder="tortas-especiales"
                            required
                        />

                        <p className="form-text">
                            {actual ? "El código se mantiene para conservar la relación con los productos." : "Usa minúsculas y guiones, sin espacios ni tildes."}
                        </p>
                    </div>

                    <div className="col-12">
                        <div className="acciones-formulario-admin">
                            <button
                                type="submit"
                                className="boton-admin"
                            >
                                Guardar categoría
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NuevaCategoria;