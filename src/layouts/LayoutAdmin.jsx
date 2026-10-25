import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { obtenerSesion, cerrarSesion } from "../assets/js/usuarios";
import MenuAdmin from "../components/MenuAdmin";
function LayoutAdmin() {
  const usuario = obtenerSesion();
  const navigate = useNavigate();

  function salir() {
      cerrarSesion();
      navigate("/login", { replace: true });
  }

  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container-fluid p-3 p-lg-4 layout-admin">
      <div className="row g-4">
        <div className="col-12 col-lg-3 col-xl-2 columna-menu-admin">
          <MenuAdmin alCerrarSesion={salir} />
        </div>

        <main className="col-12 col-lg-9 col-xl-10">
          <div className="contenido-admin">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
