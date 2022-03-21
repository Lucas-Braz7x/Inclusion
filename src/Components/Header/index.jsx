import React from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Login/assets/inclusion-logo.png';
import { Link } from 'react-router-dom';
//import { MdReorder } from "react-icons/md";


export const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">

        <div className="login-form-title">
          <img src={logo} alt="inclusion" />
        </div>

        <nav id="navbar" className="navbar navbar-expand-lg">

          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggle-icon"></span>
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
              <Link className="getstarted scrollto" to="/cadastro/ong" >Ongs</Link>

            </li>

          </ul>

          <i className="bi bi-list mobile-nav-toggle"></i>

        </nav>

      </div>

    </header>
  )
}
