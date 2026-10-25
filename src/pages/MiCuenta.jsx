import { Link, Navigate, useNavigate } from "react-router-dom";
import { obtenerSesion, cerrarSesion } from "../assets/js/usuarios";

function MiCuenta() {
    const usuario = obtenerSesion();
    const navigate = useNavigate();

    function salir() {
        cerrarSesion();
        navigate("/login", { replace: true });
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.rol === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return (
        <main className="container py-5 cuenta-cliente">
            <header className="encabezado-cuenta-cliente">
                <h1 className="letra-Titulos">Mi cuenta</h1>
                <p>Hola, {usuario.nombre}. Bienvenido a Mil Sabores.</p>
            </header>

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <section className="tarjeta-cuenta-cliente text-center h-100">
                        <div className="avatar-cuenta-cliente" aria-hidden="true">
                            {usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <h2>{usuario.nombre}</h2>
                        <p>Cliente de Pastelería Mil Sabores</p>
                        <button type="button" className="boton-cliente boton-cliente-secundario" onClick={salir}>
                            Cerrar sesión
                        </button>
                    </section>
                </div>

                <div className="col-12 col-lg-8">
                    <section className="tarjeta-cuenta-cliente h-100">
                        <h2>Mis datos</h2>
                        <div className="dato-cuenta-cliente">
                            <h3>Nombre completo</h3>
                            <p>{usuario.nombre}</p>
                        </div>
                        <div className="dato-cuenta-cliente">
                            <h3>Correo electrónico</h3>
                            <p className="text-break">{usuario.email}</p>
                        </div>
                        <div className="d-flex flex-wrap gap-3 mt-4">
                            <Link to="/carrito" className="boton-cliente">Ver mi carrito</Link>
                            <Link to="/productos" className="boton-cliente boton-cliente-secundario">Seguir comprando</Link>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default MiCuenta;
