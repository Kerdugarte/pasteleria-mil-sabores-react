import { useState } from "react";

const categorias = [
    { valor: "", nombre: "Todos los productos" },
    { valor: "tortas-cuadradas", nombre: "Tortas cuadradas" },
    { valor: "tortas-circulares", nombre: "Tortas circulares" },
    { valor: "postres-individuales", nombre: "Postres individuales" },
    { valor: "postres-sin-azucar", nombre: "Sin azúcar" },
    { valor: "pasteleria-tradicional", nombre: "Pastelería tradicional" },
    { valor: "postres-sin-gluten", nombre: "Sin gluten" },
    { valor: "postres-veganos", nombre: "Veganos" },
    { valor: "tortas-especiales", nombre: "Tortas especiales" },
];

function FiltroProductos({ categoriaActual, cambiarCategoria }) {
    const [abierto, setAbierto] = useState(false);

    function seleccionarCategoria(valor) {
        cambiarCategoria(valor);
        setAbierto(false);
    }

    return (
        <div
            className="filtro-desplegable"
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setAbierto(false);
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setAbierto(false);
                    event.currentTarget
                        .querySelector(".boton-categorias")
                        .focus();
                }
            }}
        >
            <button
                type="button"
                className="boton-categorias"
                aria-expanded={abierto}
                aria-controls="opciones-categorias"
                onClick={() => setAbierto(!abierto)}
            >
                <span aria-hidden="true">☰</span>
                Categorías
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