import { Routes, Route } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Categorias from "./components/Categorias";
import Carrusel from "./components/Carrusel";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Cabecera />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;