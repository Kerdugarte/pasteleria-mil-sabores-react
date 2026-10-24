import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/contacto.css";
function Contacto() {
    const navigate = useNavigate();
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [errorEnvio, setErrorEnvio] = useState("");
    
const enviarFormulario = (event) => {
  event.preventDefault();
  setErrorEnvio("");

  const formulario = event.currentTarget;

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const datos = new FormData(formulario);

  const mensaje = {
    id: crypto.randomUUID(),
    nombre: datos.get("nombre").trim(),
    correo: datos.get("correo").trim(),
    telefono: datos.get("telefono").trim(),
    asunto: datos.get("asunto"),
    mensaje: datos.get("mensaje").trim(),
    fecha: new Date().toISOString()
  };

  if (!mensaje.nombre || !mensaje.mensaje) {
    setErrorEnvio("Completa los campos obligatorios.");
    return;
  }

  try {
    const guardados = JSON.parse(
      localStorage.getItem("mensajesContacto") || "[]"
    );

    if (!Array.isArray(guardados)) {
      throw new Error("Datos almacenados inválidos");
    }

    localStorage.setItem(
      "mensajesContacto",
      JSON.stringify([...guardados, mensaje])
    );

    formulario.reset();
    setMostrarConfirmacion(true);
  } catch (error) {
    console.error(error);
    setErrorEnvio(
      "No pudimos guardar tu mensaje. Inténtalo nuevamente."
    );
  }
};

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

            <form onSubmit={enviarFormulario}>
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
      
{errorEnvio && (
  <div className="alert alert-danger mt-3" role="alert">
    {errorEnvio}
  </div>
)}

{mostrarConfirmacion && (
  <div className="contacto-modal-fondo">
    <div
      className="contacto-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-confirmacion"
    >
      <div className="contacto-modal-icono">
        ✓
      </div>

      <h2 id="titulo-confirmacion">
        ¡Mensaje enviado con éxito!
      </h2>

      <p>
        Tu mensaje fue guardado correctamente.
        Gracias por contactarnos.
      </p>

      <div className="contacto-modal-botones">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>

        <button
          type="button"
          onClick={() => navigate("/productos")}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

export default Contacto;
