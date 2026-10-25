import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { obtenerProductos, guardarProductos } from "../../assets/js/Datos";
import { obtenerCategorias } from "../../assets/js/categorias";

function NuevoProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productos = obtenerProductos();
    const categorias = obtenerCategorias();
    const actual = productos.find((item) => item.id === Number(id));
    const [imagen, setImagen] = useState(actual ? actual.imagen : "");
    const [error, setError] = useState("");
    const [leyendoImagen, setLeyendoImagen] = useState(false);
    const [errorImagen, setErrorImagen] = useState("");

    function seleccionarImagen(event) {
        const archivo = event.target.files[0];

        setImagen("");
        setErrorImagen("");

        if (!archivo) {
            return;
        }

        const formatosPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!formatosPermitidos.includes(archivo.type)) {
            setErrorImagen("Selecciona una imagen JPG, PNG o WebP.");
            event.target.value = "";
            return;
        }

        if (archivo.size > 2 * 1024 * 1024) {
            setErrorImagen("La imagen debe pesar como máximo 2 MB.");
            event.target.value = "";
            return;
        }

        const lector = new FileReader();

        setLeyendoImagen(true);

        lector.onload = () => {
            setLeyendoImagen(false);
            setImagen(lector.result);
        };

        lector.onerror = () => {
            setLeyendoImagen(false);
            setErrorImagen("No se pudo leer la imagen.");
        };

        lector.readAsDataURL(archivo);
    }

    function guardarProducto(event) {
        event.preventDefault();
        setError("");
        const datos = new FormData(event.currentTarget);
        const nombre = datos.get("nombre").trim();
        const precio = Number(datos.get("precio"));
        const stock = Number(datos.get("stock"));
        const categoria = datos.get("categoria");

        if (!nombre || !Number.isInteger(precio) || precio < 1 ||
            !Number.isInteger(stock) || stock < 0 || !imagen || leyendoImagen || errorImagen ||
            !categorias.some((item) => item.valor === categoria)) {
            setError("Revisa los datos y selecciona una foto válida.");
            return;
        }

        const nuevo = {
            id: actual ? actual.id : new Date().getTime(),
            nombre,
            precio,
            stock,
            categoria,
            imagen,
            tamano: datos.get("tamano").trim(),
            descripcion: datos.get("descripcion").trim(),
        };
        const actualizados = actual
            ? productos.map((item) => item.id === actual.id ? nuevo : item)
            : [...productos, nuevo];

        try {
            guardarProductos(actualizados);
            navigate("/admin/productos");
        } catch {
            setError("No se pudo guardar. Si la foto es muy grande, prueba una más pequeña.");
        }
    }

    if (id && !actual) {
        return <p>Producto no encontrado. <Link to="/admin/productos">Volver a productos</Link></p>;
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <Link
                    to="/admin/productos"
                    className="flecha-volver-admin"
                    aria-label="Volver a productos"
                    title="Volver a productos"
                >
                    <span aria-hidden="true">←</span>
                </Link>

                <h1 className="letra-Titulos">
                    {actual ? "Editar producto" : "Nuevo producto"}
                </h1>

                <p className="texto-general">
                    Completa los datos y selecciona una foto.
                </p>
            </header>

            {error && <p className="alert alert-danger" role="alert">{error}</p>}
            <form onSubmit={guardarProducto}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="nombreProducto"
                            className="form-label"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="nombreProducto"
                            name="nombre"
                            defaultValue={actual ? actual.nombre : ""}
                            className="form-control"
                            placeholder="Torta de Chocolate"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="precioProducto"
                            className="form-label"
                        >
                            Precio
                        </label>

                        <input
                            type="number"
                            id="precioProducto"
                            name="precio"
                            defaultValue={actual ? actual.precio : ""}
                            className="form-control"
                            placeholder="45000"
                            min="1"
                            step="1"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="stockProducto"
                            className="form-label"
                        >
                            Stock disponible
                        </label>

                        <input
                            type="number"
                            id="stockProducto"
                            name="stock"
                            defaultValue={actual ? actual.stock : ""}
                            className="form-control"
                            placeholder="Cantidad de unidades"
                            min="0"
                            step="1"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="categoriaProducto"
                            className="form-label"
                        >
                            Categoría
                        </label>

                        <select
                            id="categoriaProducto"
                            name="categoria"
                            className="form-select"
                            defaultValue={actual ? actual.categoria : ""}
                            required
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>

                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.valor}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label
                            htmlFor="imagenProducto"
                            className="form-label"
                        >
                            Foto del producto
                        </label>

                        <input
                            type="file"
                            id="imagenProducto"
                            name="imagen"
                            className="form-control"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={seleccionarImagen}
                            required={!actual}
                        />

                        <p className="form-text">
                            JPG, PNG o WebP. Máximo 2 MB.
                        </p>

                        {errorImagen && (
                            <p className="text-danger" role="alert">
                                {errorImagen}
                            </p>
                        )}

                        {imagen && (
                            <img
                                src={imagen}
                                alt="Vista previa del producto"
                                className="foto-producto-admin mt-3"
                            />
                        )}
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="tamanoProducto" className="form-label">Tamaño o presentación</label>
                        <input
                            id="tamanoProducto"
                            name="tamano"
                            className="form-control"
                            defaultValue={actual ? actual.tamano : ""}
                            placeholder="Mediana · 12 personas o por unidad"
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="descripcionProducto" className="form-label">Descripción</label>
                        <textarea
                            id="descripcionProducto"
                            name="descripcion"
                            className="form-control"
                            rows={4}
                            defaultValue={actual ? actual.descripcion : ""}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <div className="acciones-formulario-admin">
                            <button
                                type="submit"
                                className="boton-admin"
                                disabled={leyendoImagen}
                            >
                                Guardar producto
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NuevoProducto;