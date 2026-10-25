import { Link } from "react-router-dom";

function Carrusel() {
    //carrusel de bootstrap
    //aqui cambian las clases y la ruta de imagenes y cerrar las etiquetas />
    return (
        <section
            id="carouselExampleIndicators"
            className="carousel slide mi-carrusel"
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>

                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>

                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="/img/slide1.png"
                        className="d-block w-100"
                        alt="Promoción Pastelería Mil Sabores"
                    />
                    <Link to="/ofertas" className="boton-ofertas-carrusel">
                        Ver ofertas →
                    </Link>
                </div>

                <div className="carousel-item">
                    <img
                        src="/img/slide2.png"
                        className="d-block w-100"
                        alt="Promoción Pastelería Mil Sabores"
                    />
                    <Link to="/ofertas" className="boton-ofertas-carrusel">
                        Ver ofertas →
                    </Link>
                </div>

                <div className="carousel-item">
                    <img
                        src="/img/slide3.png"
                        className="d-block w-100"
                        alt="Promoción Pastelería Mil Sabores"
                    />
                    <Link to="/ofertas" className="boton-ofertas-carrusel">
                        Ver ofertas →
                    </Link>
                </div>
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"></span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
            </button>
        </section>
    );
}

export default Carrusel;
