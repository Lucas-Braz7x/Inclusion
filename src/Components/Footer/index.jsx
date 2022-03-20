import React from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Footer = () => {
  return (
    <footer id="myFooter">
      <div className="container">
        <ul>

          <li><a >Sobre</a></li>
          <li><a >Time</a></li>
          <li><a >Equipamentos</a></li>
          <li><a >Ong Amigas</a></li>
          <li><a >Doadores</a></li>
          <li><a href="/Contatos">Contato</a></li>

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
