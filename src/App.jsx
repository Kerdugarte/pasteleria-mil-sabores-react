import { Routes, Route } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Categorias from "./components/Categorias";
import Carrusel from "./components/Carrusel";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Cabecera />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;