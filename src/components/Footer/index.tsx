import "./styles.scss";

const Footer: React.FC = () => {
const year = new Date().getFullYear();
  return (
    <div className="login-footer">

    <footer className="footer">
        <div className="footer__nav">
            <ul className="footer__nav__list">
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Sobre</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Ajuda</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Imprensa</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">API</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Carreiras</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Privacidade</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Termos</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Localizações</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Contas mais relevantes</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Hashtags</a>
                </li>
                <li className="footer__nav__list__item">
                    <a href="#" className="footer__nav__list__item__link">Idioma</a>
                </li>
            </ul>
        </div>
      <p>© {year} Moments from Doodly. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
};

export default Footer;
