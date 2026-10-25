function Paginacion({ paginaActual, totalPaginas, cambiarPagina }) {
    return (
        <nav className="paginacion-productos" aria-label="Páginas del catálogo">
            <button
                type="button"
                aria-label="Página anterior"
                disabled={paginaActual === 1}
                onClick={() => cambiarPagina(paginaActual - 1)}
            >
                «
            </button>

            {Array.from({ length: totalPaginas }, (_, indice) => {
                const numero = indice + 1;

                return (
                    <button
                        key={numero}
                        type="button"
                        className={paginaActual === numero ? "activo" : ""}
                        aria-current={paginaActual === numero ? "page" : undefined}
                        onClick={() => cambiarPagina(numero)}
                    >
                        {numero}
                    </button>
                );
            })}

            <button
                type="button"
                aria-label="Página siguiente"
                disabled={paginaActual === totalPaginas}
                onClick={() => cambiarPagina(paginaActual + 1)}
            >
                »
            </button>
        </nav>
    );
}

export default Paginacion;
