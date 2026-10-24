
import "../assets/css/contacto.css";
function Contacto() {
  return (
    <main className="pagina-contacto container py-5">
      <div className="text-center mb-5">
        <h1>Contáctanos</h1>
        <p>
          ¿Tienes alguna duda o un pedido especial?
          Estamos felices de ayudarte.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <section className="formulario-contacto">
            <h2 className="mb-4">Envíanos un mensaje</h2>

            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
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
                  className="form-select"
                  defaultValue=""
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
                  className="form-control"
                  rows="5"
                  placeholder="Escribe aquí tu mensaje..."
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
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
