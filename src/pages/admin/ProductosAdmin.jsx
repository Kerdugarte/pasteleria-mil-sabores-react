import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaProducto from "../../components/TarjetaProducto";
import FiltroProductos from "../../components/FiltroProductos";
import Paginacion from "../../components/Paginacion";
import ConfirmarEliminar from "../../components/ConfirmarEliminar";
import { obtenerProductos, guardarProductos } from "../../assets/js/Datos";

function ProductosAdmin() {
    const [productos, setProductos] = useState(obtenerProductos);
    const [seleccionado, setSeleccionado] = useState(null);
    const [error, setError] = useState("");
    const ventana = useRef(null);

    function confirmarEliminar(item) {
        setSeleccionado(item);
        ventana.current.showModal();
    }

    function eliminarProducto() {
        const actualizados = productos.filter((item) => item.id !== seleccionado.id);
        try {
            guardarProductos(actualizados);
            setProductos(actualizados);
            setPaginaActual(1);
            setError("");
            ventana.current.close();
        } catch {
            ventana.current.close();
            setError("No se pudo eliminar el producto. Inténtalo nuevamente.");
        }
    }

    const [busqueda, setBusqueda] = useState("");
    const [categoriaActual, setCategoriaActual] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    const productosPorPagina = 6;

    function cambiarBusqueda(event) {
        setBusqueda(event.target.value);
        setPaginaActual(1);
    }

    function cambiarCategoria(categoria) {
        setCategoriaActual(categoria);
        setPaginaActual(1);
    }

    const productosFiltrados = productos.filter((item) => {
        const coincideNombre = item.nombre
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase());

        const coincideCategoria =
            categoriaActual === "" ||
            item.categoria === categoriaActual;

        return coincideNombre && coincideCategoria;
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
        <section className="catalogo-admin">
            <header className="encabezado-admin">
                <h1 className="letra-Titulos">
                    Administrar productos
                </h1>

                <p className="texto-general">
                    Consulta y administra el catálogo de la pastelería.
                </p>
            </header>

            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <div className="row g-3 align-items-center mb-4">
                <div className="col-12 col-lg-5">
                    <label
                        htmlFor="buscarProductoAdmin"
                        className="visually-hidden"
                    >
                        Buscar producto por nombre
                    </label>

                    <input
                        type="search"
                        id="buscarProductoAdmin"
                        className="form-control buscador-admin"
                        placeholder="Buscar un producto..."
                        value={busqueda}
                        onChange={cambiarBusqueda}
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <FiltroProductos
                        categoriaActual={categoriaActual}
                        cambiarCategoria={cambiarCategoria}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <Link
                        to="/admin/productos/nuevo"
                        className="boton-admin w-100"
                    >
                        + Nuevo producto
                    </Link>
                </div>
            </div>

            <p className="contador-admin" role="status">
                {productosFiltrados.length} productos encontrados
            </p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {productosVisibles.map((item) => (
                    <div className="col" key={item.id}>
                        <TarjetaProducto
                            producto={item}
                            esAdmin={true}
                            alEliminar={() => confirmarEliminar(item)}
                        />
                    </div>
                ))}
            </div>

            {productosFiltrados.length === 0 && (
                <p className="sin-resultados-admin">
                    No hay productos que coincidan con tu búsqueda.
                </p>
            )}

            {totalPaginas > 1 && (
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    cambiarPagina={setPaginaActual}
                />
            )}
            <ConfirmarEliminar
                ventana={ventana}
                nombre={seleccionado ? seleccionado.nombre : ""}
                eliminar={eliminarProducto}
                esProducto
            />
        </section>
    );
}

export default ProductosAdmin;