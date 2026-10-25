function ConfirmarEliminar({ ventana, nombre, eliminar, esProducto = false }) {
    return (
        <dialog ref={ventana} className="ventana-admin" aria-label="Confirmar eliminación">
            <h2>¿Eliminar este registro?</h2>
            <p>{nombre}</p>
            <p>Esta acción no se puede deshacer.</p>
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                <button type="button" className="boton-admin" onClick={() => ventana.current.close()}>
                    Cancelar
                </button>
                <button type="button" className={esProducto ? "boton-admin boton-eliminar-producto" : "boton-admin boton-eliminar-categoria"} onClick={eliminar}>
                    Eliminar
                </button>
            </div>
        </dialog>
    );
}

export default ConfirmarEliminar;
