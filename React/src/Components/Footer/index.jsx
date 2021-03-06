import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs';
import { useJwt } from 'react-jwt';


export const Footer = () => {
  const { isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));

  return (
    <footer id="myFooter">
      <div className="container">
        <ul>
          <li><Link to="/">Sobre</Link></li>
          <li><Link to="/time">Time</Link></li>
          <li><Link to="/equipamentos">Equipamentos</Link></li>
          <li><Link to="/Contatos">Contato</Link></li>
          <li><Link to="/ong">Ongs parceiras</Link></li>
          {isExpired ? <></> :
            <li><Link to="/config">Configurações</Link></li>
          }

        </ul>
        <p className="footer-copyright">© 2021 Copyright - Squad 42</p>
      </div>

      <div className="footer-social">

        <a href="#" className='social-icons'>
          <BsFacebook />
        </a>
        <a href="#" className='social-icons'>

          <BsInstagram />
        </a>
        <a href="#" className='social-icons'>

          <BsTwitter />
        </a>
        <a href="#" className='social-icons'>
          <BsGithub />
        </a>
        <a href="#" className='social-icons'>
          <BsLinkedin />
        </a>

      </div>

    </footer>
  )
}
