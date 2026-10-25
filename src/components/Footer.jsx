function Footer() {
    return (
        <footer>
            <div className="footer-cols">
                <div className="footer-columna">
                    <img
                        src="/img/logo.png"
                        className="logo"
                        alt="Pastelería Mil Sabores"
                    />

                </div>

                <div className="footer-columna">
                    <h3 className="letra-titulos">Horarios</h3>

                    <ul className="texto-general">
                        <li>Lunes a viernes: 09:00 - 19:00</li>
                        <li>Sábado: 10:00 - 18:00</li>
                        <li>Domingo: Cerrado</li>
                    </ul>
                </div>

                <div className="footer-columna">
                    <h3 className="letra-titulos">Contacto</h3>

                    <ul className="texto-general">
                        <li>+56 9 1234 5678</li>
                        <li>paste@milsabores.cl</li>
                        <li>Santiago, Chile</li>
                    </ul>
                </div>

                <div className="footer-columna">
                    <h3 className="letra-titulos">Síguenos</h3>

                    <div>
                        <img
                            src="/img/iconosredes.png"
                            className="redes-sociales"
                            alt="Redes sociales"
                        />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; 2026 Pastelería Mil Sabores.
                    Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
