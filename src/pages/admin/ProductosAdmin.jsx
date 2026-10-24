import { useState } from "react";
import TarjetaProducto from "../../components/TarjetaProducto";
import FiltroProductos from "../../components/FiltroProductos";
import { producto } from "../../assets/js/Datos";

function ProductosAdmin() {
    const [busqueda, setBusqueda] = useState("");
    const [categoriaActual, setCategoriaActual] = useState("");

    const productosFiltrados = producto.filter((item) => {
        const coincideNombre = item.nombre
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase());

        const coincideCategoria =
            categoriaActual === "" ||
            item.categoria === categoriaActual;

        return coincideNombre && coincideCategoria;
    });

    return (
        <section className="catalogo-admin">
            <header className="mb-4">
                <h1 className="letra-Titulos">
                    Administrar productos
                </h1>

                <p className="texto-general">
                    Consulta y administra el catálogo de la pastelería.
                </p>
            </header>

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
                        onChange={(event) =>
                            setBusqueda(event.target.value)
                        }
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <FiltroProductos
                        categoriaActual={categoriaActual}
                        cambiarCategoria={setCategoriaActual}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <button
                        type="button"
                        className="boton-admin w-100"
                        disabled
                    >
                        + Nuevo producto
                    </button>
                </div>
            </div>

            <p className="contador-admin" role="status">
                {productosFiltrados.length} productos encontrados
            </p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {productosFiltrados.map((item) => (
                    <div className="col" key={item.id}>
                        <TarjetaProducto
                            producto={item}
                            esAdmin={true}
                        />
                    </div>
                ))}
            </div>

            {productosFiltrados.length === 0 && (
                <p className="sin-resultados-admin">
                    No hay productos que coincidan con tu búsqueda.
                </p>
            )}
        </section>
    );
}

export default ProductosAdmin;