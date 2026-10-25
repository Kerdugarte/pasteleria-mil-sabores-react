import { useState } from "react";
import { Link } from "react-router-dom";
function NuevaCategoria() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        valor: ""
    });

    function cambiarCampo(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function evitarEnvio(evento) {
        evento.preventDefault();
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <h1 className="letra-titulos">Nueva categoría</h1>
                <p className="texto-general">Vista de diseño: los cambios no se guardan en esta etapa.</p>
            </header>
            <form className="texto-general" onSubmit={evitarEnvio}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input id="nombre" name="nombre" type="text" className="form-control" value={formulario.nombre} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="valor" className="form-label">Código de categoría</label>
                        <input id="valor" name="valor" type="text" className="form-control" value={formulario.valor} onChange={cambiarCampo} />
                    </div>
                </div>
                <div className="acciones-formulario-admin mt-4">
                    <Link to="/admin/categorias" className="boton-admin">Volver</Link>
                    <button type="button" className="boton-admin" disabled>Guardar</button>
                </div>
            </form>
        </section>
    );
}

export default NuevaCategoria;
