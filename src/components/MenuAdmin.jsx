import { NavLink } from "react-router-dom";

function MenuAdmin({ alCerrarSesion }) {
    return (
        <aside className="menu-admin">
            <NavLink to="/admin" className="logo-admin">
                <img
                    src="/img/logoLetra.png"
                    alt="Pastelería Mil Sabores"
                />
            </NavLink>

            <p className="menu-admin-titulo">Administración</p>

            <nav aria-label="Menú del administrador">
                <ul className="menu-admin-enlaces">
                    <li>
                        <NavLink to="/admin" end>
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/ordenes">
                            Órdenes y boletas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/productos">
                            Productos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/categorias">
                            Categorias
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/usuarios">
                            Usuarios
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/reportes">
                            Reportes
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/perfil">
                            Mi perfil
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="menu-admin-inferior">
                <NavLink to="/">
                    Volver a la tienda
                </NavLink>

                <button type="button" onClick={alCerrarSesion}>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}

export default MenuAdmin;