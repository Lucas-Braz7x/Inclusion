import React from 'react';
import './styles.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/INCLUSION_logo.png';

export const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">

        <h1 className="logo me-auto">
          <a href="/">
            <img src={logo} alt="Imagem da logo inclusion" />
          </a>
        </h1>

        <nav id="navbar" className="navbar navbar-expand-lg">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <ul className="navbar-nav item-list">

            <li className="nav-item">
              <a className="nav-link scrollto" href="/">Página
                Inicial</a>
            </li>

            <li className="nav-item">
              <a className="nav-link scrollto" href="/Equipamentos">Equipamentos</a>
            </li>

            <li className="nav-item">
              <a className="nav-link scrollto" href="/Time">Time</a>
            </li>

            <li className="nav-item">
              <a className="nav-link scrollto" href="/Contatos">Contatos</a>
            </li>

            <li className="nav-item">
              <a className="getstarted scrollto" href='/cadastro'>Fazer Doação</a>
            </li>

            <li className="nav-item">
              <a className="getstarted scrollto">Ongs</a>
            </li>

          </ul>

          <i className="bi bi-list mobile-nav-toggle"></i>

        </nav>

      </div>

    </header>
  )
}
