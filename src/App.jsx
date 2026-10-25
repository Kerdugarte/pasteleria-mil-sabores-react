
import { Routes, Route, Link } from "react-router-dom";
import LayoutPublico from "./layouts/LayoutPublico";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Inicio from "./pages/Inicio";
import Ofertas from "./pages/Ofertas";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import MiCuenta from "./pages/MiCuenta";
import Carrito from "./pages/Carrito";
import Pago from "./pages/Pago";
import PagoCorrecto from "./pages/PagoCorrecto";
import PagoError from "./pages/PagoError";
import PanelAdmin from "./pages/admin/PanelAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import NuevoUsuario from "./pages/admin/NuevoUsuario";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import NuevaCategoria from "./pages/admin/NuevaCategoria";
import Blog from "./pages/Blog";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import ReportesAdmin from "./pages/admin/ReportesAdmin";
import PerfilAdmin from "./pages/admin/PerfilAdmin";
import BoletaAdmin from "./pages/admin/BoletaAdmin";


function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/pago/correcto/:id" element={<PagoCorrecto />} />
        <Route path="/pago/error" element={<PagoError />} />
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
        <Route path="productos/:id/editar" element={<NuevoProducto />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="categorias" element={<CategoriasAdmin />} />
        <Route path="categorias/nueva" element={<NuevaCategoria />} />
        <Route path="categorias/:id/editar" element={<NuevaCategoria />} />
        <Route path="pedidos" element={<PedidosAdmin />} />
        <Route path="pedidos/:id/boleta" element={<BoletaAdmin />} />
        <Route path="reportes" element={<ReportesAdmin />} />
        <Route path="perfil" element={<PerfilAdmin />} />

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