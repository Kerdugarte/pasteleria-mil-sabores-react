import { Link } from "react-router-dom";

function Categorias() {
    return (
        <section className="categorias">
            <h2 className="letra-Titulos">Productos destacados</h2>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Torta Especial de Cumpleaños.png"
                                className="card-img-top"
                                alt="Torta Especial de Cumpleaños"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Torta Especial de Cumpleaños
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Mousse de Chocolate.png"
                                className="card-img-top"
                                alt="Mousse de Chocolate"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Mousse de Chocolate
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Torta Sin Azúcar de Naranja.png"
                                className="card-img-top"
                                alt="Torta Sin Azúcar de Naranja"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Torta Sin Azúcar de Naranja
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Cheesecake.png"
                                className="card-img-top"
                                alt="Cheesecake"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">Cheesecake</p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Galletas Veganas de Avena.png"
                                className="card-img-top"
                                alt="Galletas Veganas de Avena"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Galletas Veganas de Avena
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <img
                                src="/img/Tiramisú.png"
                                className="card-img-top"
                                alt="Tiramisú"
                            />

                            <div className="card-body">
                                <p className="card-title texto-general">Tiramisú</p>
                            </div>
                        </article>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <Link to="/productos" className="boton-ver-mas">
                        Ver más
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Categorias;