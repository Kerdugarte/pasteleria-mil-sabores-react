import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import Paginacion from "../components/Paginacion";
import FiltroProductos from "../components/FiltroProductos";
import { obtenerProductos } from "../assets/js/Datos";

function Productos() {
    const producto = obtenerProductos();
    const [paginaActual, setPaginaActual] = useState(1);
    const [parametros, setParametros] = useSearchParams();
    const categoriaActual = parametros.get("categoria") || "";

    const productosPorPagina = 8;

    function cambiarCategoria(categoria) {
        setParametros(categoria ? { categoria } : {});
        setPaginaActual(1);
    }

    const productosFiltrados = producto.filter((item) => {
        return categoriaActual === "" || item.categoria === categoriaActual;
    });

    const totalPaginas = Math.ceil(
        productosFiltrados.length / productosPorPagina
    );

    const paginaVisible = Math.min(paginaActual, Math.max(totalPaginas, 1));
    const inicio = (paginaVisible - 1) * productosPorPagina;

    const productosVisibles = productosFiltrados.slice(
        inicio,
        inicio + productosPorPagina
    );

    return (
        <main className="container py-5">
            <header className="encabezado-productos">
                <h1 className="letra-titulos">Nuestros Productos</h1>

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
                    paginaActual={paginaVisible}
                    totalPaginas={totalPaginas}
                    cambiarPagina={setPaginaActual}
                />
            )}
        </main>
    );
}

export default Productos;