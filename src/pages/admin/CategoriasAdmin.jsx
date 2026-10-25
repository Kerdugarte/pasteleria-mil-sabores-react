import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmarEliminar from "../../components/ConfirmarEliminar";
import { obtenerProductos } from "../../assets/js/Datos";
import { obtenerCategorias, guardarCategorias } from "../../assets/js/categorias";

function CategoriasAdmin() {
    const [categorias, setCategorias] = useState(obtenerCategorias);
    const [seleccionada, setSeleccionada] = useState(null);
    const [error, setError] = useState("");
    const ventana = useRef(null);
    const aviso = useRef(null);

    function confirmarEliminar(categoria) {
        setError("");
        if (obtenerProductos().some((item) => item.categoria === categoria.valor)) {
            setError("Esta categoría tiene productos. Cambia su categoría o elimínalos antes de continuar.");
            aviso.current.showModal();
            return;
        }
        setSeleccionada(categoria);
        ventana.current.showModal();
    }

    function eliminarCategoria() {
        const actualizadas = categorias.filter((item) => item.id !== seleccionada.id);
        try {
            guardarCategorias(actualizadas);
            setCategorias(actualizadas);
            ventana.current.close();
        } catch {
            ventana.current.close();
            setError("No se pudo eliminar la categoría. Inténtalo nuevamente.");
            aviso.current.showModal();
        }
    }

    const [busqueda, setBusqueda] = useState("");

    const categoriasFiltradas = categorias.filter((categoria) => {
        const texto = busqueda.trim().toLowerCase();

        return (
            categoria.nombre.toLowerCase().includes(texto) ||
            categoria.valor.toLowerCase().includes(texto)
        );
    });

    return (
        <section className="categorias-admin">
            <header className="encabezado-admin">
                <h1 className="letra-Titulos">
                    Categorías
                </h1>

                <p className="texto-general">
                    Organiza las categorías de la pastelería.
                </p>
            </header>

            <div className="row g-3 align-items-center mb-4">
                <div className="col-12 col-lg-7">
                    <label
                        htmlFor="buscarCategoria"
                        className="visually-hidden"
                    >
                        Buscar por nombre o código
                    </label>

                    <input
                        type="search"
                        id="buscarCategoria"
                        className="form-control buscador-categorias-admin"
                        placeholder="Buscar por nombre o código..."
                        value={busqueda}
                        onChange={(event) =>
                            setBusqueda(event.target.value)
                        }
                    />
                </div>

                <div className="col-12 col-lg-5 text-lg-end">
                    <Link
                        to="/admin/categorias/nueva"
                        className="boton-admin"
                    >
                        + Nueva categoría
                    </Link>
                </div>
            </div>

            <p className="contador-admin" role="status">
                Categorías encontradas: {categoriasFiltradas.length}
            </p>

            <div className="row g-4">
                {categoriasFiltradas.map((categoria) => (
                    <div
                        className="col-12 col-md-6 col-xl-4"
                        key={categoria.id}
                    >
                        <article className="card resumen-admin h-100 p-4">
                            <h2 className="h4">
                                {categoria.nombre}
                            </h2>

                            <p className="text-break">
                                {categoria.valor}
                            </p>

                            <div className="acciones-categoria-admin mt-auto">
                                <button
                                    type="button"
                                    className="boton-admin boton-eliminar-categoria"
                                    onClick={() => confirmarEliminar(categoria)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    </div>
                ))}
            </div>

            {categoriasFiltradas.length === 0 && (
                <p className="sin-resultados-admin">
                    No hay categorías que coincidan con tu búsqueda.
                </p>
            )}
            <dialog ref={aviso} className="ventana-admin" aria-label="No se puede eliminar la categoría">
                <h2>No se pudo eliminar</h2>
                <p role="alert">{error}</p>
                <button type="button" className="boton-admin" onClick={() => aviso.current.close()}>
                    Entendido
                </button>
            </dialog>
            <ConfirmarEliminar
                ventana={ventana}
                nombre={seleccionada ? seleccionada.nombre : ""}
                eliminar={eliminarCategoria}
            />
        </section>
    );
}

export default CategoriasAdmin;