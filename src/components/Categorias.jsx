import { Link } from "react-router-dom";

function Categorias() {
    return (
        <section className="categorias">
            <h2 className="letra-Titulos">Categorías populares</h2>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Torta Especial de Cumpleaños.png"
                                    className="card-img-top"
                                    alt="Tortas"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">Tortas</p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Mousse de Chocolate.png"
                                    className="card-img-top"
                                    alt="Postres individuales"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Postres individuales
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Tarta de Santiago.png"
                                    className="card-img-top"
                                    alt="Pastelería tradicional"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">
                                    Pastelería tradicional
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Cheesecake.png"
                                    className="card-img-top"
                                    alt="Sin azúcar"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">Sin azúcar</p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Galletas Veganas de Avena.png"
                                    className="card-img-top"
                                    alt="Veganos"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">Veganos</p>
                            </div>
                        </article>
                    </div>

                    <div className="col">
                        <article className="card h-100">
                            <Link to="/productos">
                                <img
                                    src="/img/Tiramisú.png"
                                    className="card-img-top"
                                    alt="Tiramisú"
                                />
                            </Link>

                            <div className="card-body">
                                <p className="card-title texto-general">Tiramisú</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categorias;