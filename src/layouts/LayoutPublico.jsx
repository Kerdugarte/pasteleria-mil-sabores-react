import { Outlet } from "react-router-dom";
import Cabecera from "../components/Cabecera";
import Footer from "../components/Footer";

function LayoutPublico() {
  return (
    <>
      <Cabecera />
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutPublico;
