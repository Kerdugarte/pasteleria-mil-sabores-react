import { useState } from "react";
import { Link } from "react-router-dom";

function NuevoProducto() {
    const [imagen, setImagen] = useState("");
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

        lector.onload = () => {
            setImagen(lector.result);
        };

        lector.onerror = () => {
            setErrorImagen("No se pudo leer la imagen.");
        };

        lector.readAsDataURL(archivo);
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
                    Nuevo producto
                </h1>

                <p className="texto-general">
                    Completa los datos y selecciona una foto.
                </p>
            </header>

            <form onSubmit={(event) => event.preventDefault()}>
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
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>

                            <option value="tortas-cuadradas">
                                Tortas cuadradas
                            </option>

                            <option value="tortas-circulares">
                                Tortas circulares
                            </option>

                            <option value="postres-individuales">
                                Postres individuales
                            </option>

                            <option value="postres-sin-azucar">
                                Sin azúcar
                            </option>

                            <option value="pasteleria-tradicional">
                                Pastelería tradicional
                            </option>

                            <option value="postres-sin-gluten">
                                Sin gluten
                            </option>

                            <option value="postres-veganos">
                                Veganos
                            </option>

                            <option value="tortas-especiales">
                                Tortas especiales
                            </option>
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
                            required
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

                    <div className="col-12">
                        <div className="acciones-formulario-admin">
                            <button
                                type="button"
                                className="boton-admin"
                                disabled
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