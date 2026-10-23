import { Navigate, Outlet, useNavigate } from "react-router-dom";
import MenuAdmin from "../components/MenuAdmin";
import { obtenerSesion, cerrarSesion } from "../assets/js/usuarios";

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
    <>
      <MenuAdmin alCerrarSesion={salir} />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}

export default LayoutAdmin;
