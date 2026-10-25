import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductos, guardarProductos } from "../../assets/js/Datos";
import { obtenerCategorias } from "../../assets/js/categorias";

function NuevoProducto() {
    const { id } = useParams();
    const actual = obtenerProductos().find((item) => item.id === Number(id));
    const categorias = obtenerCategorias();
    const [formulario, setFormulario] = useState({
        nombre: actual?.nombre || "",
        precio: actual?.precio || "",
        stock: actual?.stock ?? "",
        categoria: actual?.categoria || "",
        tamano: actual?.tamano || "",
        descripcion: actual?.descripcion || ""
    });

    const [mensaje, setMensaje] = useState("");

    function cambiarCampo(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function guardarStock(evento) {
        evento.preventDefault();
        if (!actual) return;
        const stock = Number(formulario.stock);
        if (String(formulario.stock).trim() === "" || !Number.isInteger(stock) || stock < 0) {
            setMensaje("Ingresa un stock entero igual o mayor a cero.");
            return;
        }
        try {
            const productos = obtenerProductos().map((item) => item.id === actual.id ? { ...item, stock } : item);
            guardarProductos(productos);
            setMensaje("Stock actualizado correctamente.");
        } catch {
            setMensaje("No se pudo guardar el stock.");
        }
    }

    if (id && !actual) {
        return <p>Registro no encontrado. <Link to="/admin/productos">Volver</Link></p>;
    }

    return (
        <section className="formulario-producto-admin">
            <header className="encabezado-admin">
                <h1 className="letra-titulos">{actual ? "Editar producto" : "Nuevo producto"}</h1>
                <p className="texto-general">{actual ? "Actualiza el stock del producto. Los demás datos son de consulta en esta etapa." : "Vista de diseño: los cambios no se guardan en esta etapa."}</p>
            </header>
            <form className="texto-general" onSubmit={guardarStock}>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input id="nombre" disabled={Boolean(actual)} name="nombre" type="text" className="form-control" value={formulario.nombre} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input id="precio" disabled={Boolean(actual)} name="precio" type="number" className="form-control" value={formulario.precio} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input id="stock" name="stock" min="0" step="1" required type="number" className="form-control" value={formulario.stock} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="categoria" className="form-label">Categoría</label>
                        <select id="categoria" disabled={Boolean(actual)} name="categoria" className="form-select" value={formulario.categoria} onChange={cambiarCampo}>
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((categoria) => <option key={categoria.id} value={categoria.valor}>{categoria.nombre}</option>)}
                            </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="imagen" className="form-label">Foto del producto</label>
                        <input id="imagen" disabled={Boolean(actual)} type="file" className="form-control" accept="image/*" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="tamano" className="form-label">Tamaño</label>
                        <input id="tamano" disabled={Boolean(actual)} name="tamano" type="text" className="form-control" value={formulario.tamano} onChange={cambiarCampo} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea id="descripcion" disabled={Boolean(actual)} name="descripcion" className="form-control" rows={4} value={formulario.descripcion} onChange={cambiarCampo} />
                    </div>
                </div>
                <p role="status" className="mt-3">{mensaje}</p>
                <div className="acciones-formulario-admin mt-4">
                    <Link to="/admin/productos" className="boton-admin">Volver</Link>
                    <button type="submit" className="boton-admin" disabled={!actual}>{actual ? "Guardar stock" : "Guardar"}</button>
                </div>
            </form>
        </section>
    );
}

export default NuevoProducto;
