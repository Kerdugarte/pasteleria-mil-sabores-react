import { Navigate, Outlet, useNavigate } from "react-router-dom";
import MenuAdmin from "../components/MenuAdmin";
import {
  obtenerSesion,
  cerrarSesion,
} from "../assets/js/usuarios";

function LayoutAdmin() {
  const navigate = useNavigate();
  const usuario = obtenerSesion();

  function salir() {
    cerrarSesion();
    navigate("/login", { replace: true });
  }

  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container-fluid p-3 p-lg-4">
      <div className="row g-4">
        <div className="col-12 col-lg-3 col-xl-2">
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