import { Routes, Route, Link } from "react-router-dom";
import LayoutPublico from "./layouts/LayoutPublico";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import PanelAdmin from "./pages/admin/PanelAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";

function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <main className="container py-5 text-center">
            <h1 className="letra-Titulos">Página no encontrada</h1>
            <Link to="/">Volver al inicio</Link>
          </main>
        } />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<PanelAdmin />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="*" element={
          <section>
            <h1 className="letra-Titulos">Página no disponible</h1>
            <p className="texto-general">Esta sección administrativa todavía no está creada.</p>
            <Link to="/admin">Volver al panel</Link>
          </section>
        } />
      </Route>
    </Routes>
  );
}

export default App;
