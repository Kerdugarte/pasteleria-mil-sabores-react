import { useState } from "react";
function Contacto() {
    const [formulario, setFormulario] = useState({ nombre: "", correo: "", telefono: "", asunto: "", mensaje: "" });

    function cambiarCampo(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function evitarEnvio(evento) {
        evento.preventDefault();
    }

    return (
        <main className="pagina-contacto container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-titulos">Contáctanos</h1>
                <p className="texto-general">
                    ¿Tienes alguna duda o un pedido especial?
                    Estamos felices de ayudarte.
                </p>
            </header>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <section className="formulario-contacto">
                        <h2 className="letra-titulos mb-4">Envíanos un mensaje</h2>
                        <p className="texto-general">Formulario de diseño para esta etapa.</p>

                        <form className="texto-general" onSubmit={evitarEnvio}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formulario.nombre}
                                    onChange={cambiarCampo}
                                    className="form-control"
                                    placeholder="Ingresa tu nombre"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">
                                    Correo electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={formulario.correo}
                                    onChange={cambiarCampo}
                                    className="form-control"
                                    placeholder="ejemplo@correo.cl"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">
                                    Teléfono (opcional)
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formulario.telefono}
                                    onChange={cambiarCampo}
                                    className="form-control"
                                    placeholder="+56 9 1234 5678"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="asunto" className="form-label">
                                    Asunto *
                                </label>
                                <select
                                    id="asunto"
                                    name="asunto"
                                    value={formulario.asunto}
                                    onChange={cambiarCampo}
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>
                                        Selecciona una opción
                                    </option>
                                    <option value="consulta">
                                        Consulta general
                                    </option>
                                    <option value="pedido">
                                        Pedido especial
                                    </option>
                                    <option value="producto">
                                        Información de productos
                                    </option>
                                    <option value="otro">
                                        Otro motivo
                                    </option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="mensaje" className="form-label">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formulario.mensaje}
                                    onChange={cambiarCampo}
                                    className="form-control"
                                    rows="5"
                                    placeholder="Escribe aquí tu mensaje..."
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled
                                    className="contacto-boton"
                                >
                                    Enviar mensaje
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

        </main>
    );
}

export default Contacto;
