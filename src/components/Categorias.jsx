import { Link } from "react-router-dom";
import { obtenerProductos } from "../assets/js/Datos";

function Categorias() {
    const productos = obtenerProductos();
    const destacados = [15, 5, 7, 8, 14, 6]
        .map((id) => productos.find((item) => item.id === id))
        .filter((item) => item !== undefined);

    return (
        <section className="categorias">
            <h2 className="letra-titulos">Productos destacados</h2>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {destacados.map((item) => (
                        <div className="col" key={item.id}>
                            <Link to={`/productos/${item.id}`} className="card h-100 enlace-destacado">
                                <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                                <div className="card-body texto-general">
                                    <p className="card-title texto-general">{item.nombre}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-4">
                    <Link to="/productos" className="boton-ver-mas">Ver mas</Link>
                </div>
            </div>
        </section>
    );
}

export default Categorias;
