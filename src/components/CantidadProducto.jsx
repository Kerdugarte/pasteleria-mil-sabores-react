function CantidadProducto({ cantidad, cambiarCantidad, maximo, className }) {
    return (
        <div className={className} role="group" aria-label="Cantidad">
            <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={cantidad <= 1}
                onClick={() => cambiarCantidad(cantidad - 1)}
            >
                −
            </button>

            <output aria-live="polite" aria-label="Unidades seleccionadas">
                {cantidad}
            </output>

            <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={cantidad >= maximo}
                onClick={() => cambiarCantidad(cantidad + 1)}
            >
                +
            </button>
        </div>
    );
}

export default CantidadProducto;
