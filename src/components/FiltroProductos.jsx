import { useState } from "react";
import { obtenerCategorias } from "../assets/js/categorias";
function FiltroProductos({ categoriaActual, cambiarCategoria }) {
    const categorias = [{ valor: "", nombre: "Todos los productos" }, ...obtenerCategorias()];
    const [abierto, setAbierto] = useState(false);

    function seleccionarCategoria(valor) {
        cambiarCategoria(valor);
        setAbierto(false);
    }

    function alternarFiltro() {
        setAbierto(!abierto);
    }

    function cerrarAlSalir(evento) {
        if (!evento.currentTarget.contains(evento.relatedTarget)) setAbierto(false);
    }

    function manejarTecla(evento) {
        if (evento.key === "Escape") {
            setAbierto(false);
            evento.currentTarget.querySelector(".boton-categorias").focus();
        }
    }

    return (
        <div
            className="filtro-desplegable"
            onBlur={cerrarAlSalir}
            onKeyDown={manejarTecla}
        >
            <button
                type="button"
                className="boton-categorias"
                aria-expanded={abierto}
                aria-controls="opciones-categorias"
                onClick={alternarFiltro}
            >
                <span aria-hidden="true">☰</span>
                Categorias
                <span aria-hidden="true">{abierto ? "▴" : "▾"}</span>
            </button>

            {abierto && (
                <div
                    id="opciones-categorias"
                    className="opciones-categorias"
                >
                    {categorias.map((categoria) => (
                        <button
                            key={categoria.valor}
                            type="button"
                            className={
                                categoriaActual === categoria.valor ? "activo" : ""
                            }
                            aria-pressed={categoriaActual === categoria.valor}
                            onClick={() => seleccionarCategoria(categoria.valor)}
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FiltroProductos;
