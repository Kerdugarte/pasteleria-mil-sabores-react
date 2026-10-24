
import { Routes, Route, Link } from "react-router-dom";

import LayoutPublico from "./layouts/LayoutPublico";
import LayoutAdmin from "./layouts/LayoutAdmin";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import PanelAdmin from "./pages/PanelAdmin";

function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
      </Route>

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<h1>Panel de administración en construcción</h1>} />

        <Route
          path="*"
          element={
            <section>
              <h1 className="letra-Titulos">
                Página no disponible
              </h1>
              <p className="texto-general">
                Esta sección administrativa todavía no está creada.
              </p>
              <Link to="/admin">Volver al panel</Link>
            </section>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

