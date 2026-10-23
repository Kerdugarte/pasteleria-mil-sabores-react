import { NavLink } from "react-router-dom";

function MenuAdmin({ alCerrarSesion }) {
    return (
        <nav className="menuAdmim" aria-label="Menú del administrador">
            <ul>
                <li>
                    <img
                        src="/img/logoLetra.png"
                        className="menu-logo"
                        alt="Pastelería Mil Sabores"
                    />
                </li>

                <li>
                    <NavLink to="/admin" end>
                        Inicio
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/productos">
                        Productos
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/usuarios">
                        Usuarios
                    </NavLink>
                </li>

                <li>
                    <button type="button" onClick={alCerrarSesion}>
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default MenuAdmin;