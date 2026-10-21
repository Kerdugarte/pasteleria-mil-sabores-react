import { Link } from "react-router-dom";

function Cabecera() {
    return (
        <header>
            <nav className="menu">
                <ul>
                    <li>
                        <img
                            src="/img/logoLetra.png"
                            className="menu-logo"
                            alt="Pastelería Mil Sabores"
                        />
                    </li>

                    <li>  <Link to="/" className="texto-general">Inicio</Link> </li>


                    <li>
                        <Link to="/productos" className="texto-general">
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="texto-general">
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" aria-label="Mi cuenta">
                            <img
                                src="/img/icono-perfil.png"
                                className="img-iconos"
                                alt=""
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/carrito" aria-label="Carrito de compras">
                            <img
                                src="/img/icono-carro.png"
                                className="img-iconos"
                                alt=""
                            />
                        </Link>
                    </li>
                </ul>

                <div className="buscador">
                    <input
                        type="search"
                        placeholder="Buscar productos..."
                        aria-label="Buscar productos"
                    />
                </div>
            </nav>
        </header >
    );
}

export default Cabecera;