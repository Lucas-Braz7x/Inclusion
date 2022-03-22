import React from 'react';
import './styles.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

export const Footer = () => {
  return (
    <footer id="myFooter">
      <div className="container">
        <ul>

          <li><Link to="/"  >Página Inicial</Link></li>
          <li><Link to="/time"  >Time</Link></li>
          <li><Link to="/equipamentos">Equipamentos</Link></li>
          <li><Link to="/contatos">Contato</Link></li>

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
