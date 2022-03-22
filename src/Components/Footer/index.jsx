import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Footer = () => {
  return (
    <footer id="myFooter">
      <div className="container">
        <ul>

          <li><Link to="/">Sobre</Link></li>
          <li><Link to="/time">Time</Link></li>
          <li><Link to="/equipamentos">Equipamentos</Link></li>
          <li><Link to="/Ong">Ong Amigas</Link></li>
          <li><Link to="/Doador">Doadores</Link></li>
          <li><Link to="/Contatos">Contato</Link></li>

        </ul>
        <p className="footer-copyright">© 2021 Copyright - Squad 42</p>
      </div>

      <div className="footer-social">

        <a href="#"><img className='social-icons'
          src={require('../../assets/facebook.svg').default} alt="Ícone do facebook" />
        </a>
        <a href="#"><img className='social-icons'
          src={require('../../assets/instagram.svg').default} alt="Ícone do instagram" />
        </a>
        <a href="#"><img className='social-icons'
          src={require('../../assets/twitter.svg').default} alt="Íconde do twitter" />
        </a>

      </div>

    </footer>
  )
}
