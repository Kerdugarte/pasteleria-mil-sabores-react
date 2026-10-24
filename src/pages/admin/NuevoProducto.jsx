import { Link } from "react-router-dom";

function NuevoProducto() {
    return (
        <section>
            <header className="mb-4">
                <h1 className="letra-Titulos">
                    Nuevo producto
                </h1>

                <p className="texto-general">
                    Completa los datos del producto.
                </p>
            </header>

            <form>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="form-control"
                            placeholder="Torta de Chocolate"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="precio" className="form-label">
                            Precio
                        </label>

                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            className="form-control"
                            placeholder="45000"
                            min="1"
                            step="1"
                            required
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="categoria" className="form-label">
                            Categoría
                        </label>

                        <select
                            id="categoria"
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
                        <label htmlFor="imagen" className="form-label">
                            Ruta de la imagen
                        </label>

                        <input
                            type="text"
                            id="imagen"
                            name="imagen"
                            className="form-control"
                            placeholder="/img/Torta de Chocolate.png"
                            required
                        />
                    </div>

                    <div className="col-12 d-flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="boton-admin"
                            disabled
                        >
                            Guardar producto
                        </button>

                        <Link
                            to="/admin/productos"
                            className="boton-admin"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NuevoProducto;