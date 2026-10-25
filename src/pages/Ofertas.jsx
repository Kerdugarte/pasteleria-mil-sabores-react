import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ofertas.css";

function Ofertas() {
    const [mensajeCodigo, setMensajeCodigo] = useState("");

    async function copiarCodigo() {
        try {
            await navigator.clipboard.writeText("DUOC40");
            setMensajeCodigo("Código copiado.");
        } catch {
            setMensajeCodigo("Puedes seleccionar y copiar el código DUOC40.");
        }
    }

    return (
        <main className="container py-5 pagina-ofertas">
            <header className="encabezado-productos">
                <h1 className="letra-Titulos">Ofertas y beneficios</h1>
                <p className="texto-general">Más motivos para disfrutar de Mil Sabores.</p>
            </header>

            <div className="row g-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="tarjeta-oferta h-100">
                        <img src="/img/OfertaHallo.png" alt="Oferta pastel " />
                        <div className="contenido-oferta">
                            <span className="etiqueta-oferta">Especial de temporada</span>
                            <p className="descuento-oferta">30% <span>de descuento</span></p>
                            <h2>Especial de Halloween</h2>
                            <p>Este Halloween, comparte tus dulces favoritos con un 30% de descuento.</p>
                            <a href="https://w.app/znl9mc" className="boton-cliente" target="_blank" rel="noopener noreferrer">
                                Consultar por WhatsApp
                            </a>
                        </div>
                    </article>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="tarjeta-oferta h-100">
                        <img src="/img/OfertaPrimer.png" alt="Primera Compra" />
                        <div className="contenido-oferta">
                            <span className="etiqueta-oferta">Te damos la bienvenida</span>
                            <p className="descuento-oferta">10% <span>de descuento</span></p>
                            <h2>Tu primera compra</h2>
                            <p>Prueba tus primeros sabores de la pastelería con un 10% de descuento en tu primera compra.</p>
                            <Link to="/productos" className="boton-cliente">Elegir mis favoritos</Link>
                        </div>
                    </article>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="tarjeta-oferta h-100">
                        <img src="/img/OfertaDuoc.png" alt="Descuento Duoc" />
                        <div className="contenido-oferta">
                            <span className="etiqueta-oferta">Beneficio estudiantil</span>
                            <p className="descuento-oferta">40% <span>de descuento</span></p>
                            <h2>Estudiantes Duoc UC</h2>
                            <p>Si eres estudiante de Duoc UC, obtén un 40% de descuento con este código promocional.</p>
                            <div className="codigo-oferta">
                                <span>Código promocional</span>
                                <strong>DUOC40</strong>
                            </div>
                            <button type="button" className="boton-cliente" onClick={copiarCodigo}>
                                Copiar código
                            </button>
                            {mensajeCodigo && <p className="mt-3 mb-0" role="status">{mensajeCodigo}</p>}
                        </div>
                    </article>
                </div>

                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="tarjeta-oferta h-100">
                        <img src="/img/OfertaEnvio.png" alt="Envio Gratis" />
                        <div className="contenido-oferta">
                            <span className="etiqueta-oferta">Hasta tu puerta</span>
                            <p className="descuento-oferta">Envío gratis</p>
                            <h2>En compras sobre $60.000</h2>
                            <p>Reúne tus productos favoritos y recibe tu pedido con envío gratis por compras superiores a $60.000.</p>
                            <Link to="/productos" className="boton-cliente">Comenzar mi compra</Link>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}

export default Ofertas;
