import React from 'react';
import './styles.css';
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
        <a href="#" className="social-icons"><img className="fa fa-facebook" 
            src="~/assets/facebook.svg" alt="Ícone do facebook"/></a>
        <a href="#" className="social-icons"><img className="fa fa-instagram" 
            src="~/assets/instagram.svg" alt="Ícone do instagram"/></a>
        <a href="#" className="social-icons"><img className="fa fa-twitter" 
            src="~/assets/twitter.svg" alt="Íconde do twitter"/></a>
      </div>
    </footer>
  )
}
