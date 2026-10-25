
import { Routes, Route, Link } from "react-router-dom";
import LayoutPublico from "./layouts/LayoutPublico";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import PanelAdmin from "./pages/admin/PanelAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import NuevoUsuario from "./pages/admin/NuevoUsuario";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import NuevaCategoria from "./pages/admin/NuevaCategoria";
import Blog from "./pages/Blog";


function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
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
        <Route path="productos/nuevo" element={<NuevoProducto />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="categorias" element={<CategoriasAdmin />} />
        <Route path="categorias/nueva" element={<NuevaCategoria />}
        />
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