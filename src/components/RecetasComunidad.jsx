import { useState } from "react";

function RecetasComunidad() {
    const recetas = [
        {
            id: 1,
            autor: "Equipo Mil Sabores",
            titulo: "Crema chantilly firme",
            dificultad: "Fácil",
            contenido: "Enfría la crema y el recipiente antes de batir. Comienza a velocidad media y detente cuando la crema forme picos firmes para evitar que se corte."
        }
    ];
    const [formulario, setFormulario] = useState({ autor: "", titulo: "", dificultad: "Fácil", contenido: "" });
    function cambiarCampo(evento) {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
    }

    return (
        <section className="blog-comunidad mt-5" aria-labelledby="titulo-comunidad">
            <h2 id="titulo-comunidad" className="letra-titulos">Recetas de nuestra comunidad</h2>
            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <form className="blog-formulario texto-general" onSubmit={(evento) => evento.preventDefault()}>
                        <h3 className="texto-general">Comparte tu receta o consejo</h3>
                        <label htmlFor="receta-autor">Tu nombre</label>
                        <input id="receta-autor" name="autor" value={formulario.autor} onChange={cambiarCampo} required maxLength={80} />
                        <label htmlFor="receta-titulo">Título de la receta</label>
                        <input id="receta-titulo" name="titulo" value={formulario.titulo} onChange={cambiarCampo} required maxLength={120} />
                        <label htmlFor="receta-dificultad">Dificultad</label>
                        <select id="receta-dificultad" name="dificultad" value={formulario.dificultad} onChange={cambiarCampo}>
                            <option>Fácil</option>
                            <option>Media</option>
                            <option>Avanzada</option>
                        </select>
                        <label htmlFor="receta-contenido">Preparación o consejo</label>
                        <textarea id="receta-contenido" name="contenido" value={formulario.contenido} onChange={cambiarCampo} rows={5} required maxLength={3000} />
                        <p>Formulario de diseño para esta etapa.</p>
                        <button type="submit" className="blog-boton" disabled>Publicar receta</button>
                    </form>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="blog-lista-recetas" aria-live="polite">
                        {recetas.map((receta) => (
                            <article key={receta.id} className="blog-receta">
                                <span className="blog-categoria">{receta.dificultad}</span>
                                <h3>{receta.titulo}</h3>
                                <p className="blog-preparacion">{receta.contenido}</p>
                                <p className="blog-datos">Aporte de: {receta.autor}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecetasComunidad;
