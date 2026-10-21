import { NavLink } from "react-router-dom";

function Cabecera() {
    return (
        <header>
            <nav className="menu" aria-label="Navegación principal">
                <ul>
                    <li>
                        <img
                            src="/img/logoLetra.png"
                            className="menu-logo"
                            alt="Pastelería Mil Sabores"
                        />
                    </li>

                    <li>
                        <NavLink to="/" end className="texto-general">
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/productos" className="texto-general">
                            Productos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contacto" className="texto-general">
                            Contacto
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/login"
                            className="texto-general"
                            aria-label="Mi cuenta"
                        >
                            <img
                                src="/img/icono-perfil.png"
                                className="img-iconos"
                                alt=""
                            />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/carrito"
                            className="texto-general"
                            aria-label="Carrito de compras"
                        >
                            <img
                                src="/img/icono-carro.png"
                                className="img-iconos"
                                alt=""
                            />
                        </NavLink>
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
        </header>
    );
}

export default Cabecera;