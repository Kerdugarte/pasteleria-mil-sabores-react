import { useState } from "react";
import { Link } from "react-router-dom";
function NuevoUsuario() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "admin"
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
                <h1 className="letra-titulos">Nuevo administrador</h1>
                <p className="texto-general">Vista de diseño: los cambios no se guardan en esta etapa.</p>
            </header>
            <form className="texto-general" onSubmit={evitarEnvio}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input id="nombre" name="nombre" type="text" className="form-control" value={formulario.nombre} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input id="email" name="email" type="email" className="form-control" value={formulario.email} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input id="password" name="password" type="password" className="form-control" value={formulario.password} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <select id="rol" name="rol" className="form-select" value={formulario.rol} onChange={cambiarCampo}>
                                <option value="admin">Administrador</option>
                            </select>
                    </div>
                </div>
                <div className="acciones-formulario-admin mt-4">
                    <Link to="/admin/usuarios" className="boton-admin">Volver</Link>
                    <button type="button" className="boton-admin" disabled>Guardar</button>
                </div>
            </form>
        </section>
    );
}

export default NuevoUsuario;
