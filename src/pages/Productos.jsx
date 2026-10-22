import { useState } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import Paginacion from "../components/Paginacion";
import FiltroProductos from "../components/FiltroProductos";
import { producto } from "../js/Datos.js";

function Productos() {
    const [paginaActual, setPaginaActual] = useState(1);
    const [categoriaActual, setCategoriaActual] = useState("");

    const productosPorPagina = 8;

    function cambiarCategoria(categoria) {
        setCategoriaActual(categoria);
        setPaginaActual(1);
    }

    const productosFiltrados = producto.filter((item) => {
        return categoriaActual === "" || item.categoria === categoriaActual;
    });

    const totalPaginas = Math.ceil(
        productosFiltrados.length / productosPorPagina
    );

    const inicio = (paginaActual - 1) * productosPorPagina;

    const productosVisibles = productosFiltrados.slice(
        inicio,
        inicio + productosPorPagina
    );

    return (
        <main className="container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-Titulos">Nuestros Productos</h1>

                <p className="texto-general">
                    Encuentra el dulce perfecto para cada ocasión
                </p>
            </header>

            <div className="barra-catalogo">
                <FiltroProductos
                    categoriaActual={categoriaActual}
                    cambiarCategoria={cambiarCategoria}
                />

                <p className="contador-productos" role="status">
                    {productosFiltrados.length} productos encontrados
                </p>
            </div>

            <section
                className="tarjetas-contenedor"
                aria-label="Catálogo de productos"
            >
                {productosVisibles.length > 0 ? (
                    productosVisibles.map((item) => (
                        <TarjetaProducto
                            key={item.id}
                            producto={item}
                        />
                    ))
                ) : (
                    <p className="sin-resultados">
                        No hay productos en esta categoría.
                    </p>
                )}
            </section>

            {totalPaginas > 1 && (
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    cambiarPagina={setPaginaActual}
                />
            )}
        </main>
    );
}

export default Productos;