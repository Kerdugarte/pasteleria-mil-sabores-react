function Historia() {
    return (
        <section className="historia-inicio">
            <div className="historia-texto">
                <p className="historia-mini">BIENVENIDOS A</p>

                <h2 className="letra-titulos">
                    Pastelería Mil Sabores
                </h2>

                <div className="linea-historia"></div>

                <p className="texto-general">
                    Nuestra pasión comenzó en el corazón de nuestra cocina familiar,
                    horneando con recetas tradicionales pasadas de generación en generación.
                    Nos dedicamos a crear momentos dulces e inolvidables para cada uno de
                    nuestros clientes, seleccionando siempre los ingredientes más frescos
                    y de la más alta calidad en Santiago.
                </p>

                <a
                    href="https://maps.app.goo.gl/XWQrZZQRH1wkxiRa6"
                    className="boton-visitanos"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visítanos →
                </a>
            </div>

            <div className="historia-imagen">
                <img
                    src="/img/pasteleria.png"
                    alt="Pastelería Mil Sabores"
                />
            </div>
        </section>
    );
}

export default Historia;
