import React, {useState} from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/INCLUSION.png';
//import { MdReorder } from "react-icons/md";
import { FiLogOut } from 'react-icons/fi';


export const Header = () => {

  const [botaoOn, setBotaoOn] = useState(false);
  return (
    <header>
    <div className="container">

      <div className="navbar-header">
      <img className="logo" src= {logo} alt="logo Inclusion"/>

      <div className = { botaoOn ? 'menu-section on' : 'menu-section'} onClick={() => setBotaoOn(!botaoOn)}>
           <div className="menu-toggle">
           <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>

           </div>

           <nav>
            <ul>

              <li>
                <a href="/">Página Inicial</a>
              </li>
              <li>
                <a href="/equipamentos">Equipamentos</a>
              </li>
              <li>
                <a href="/time">Time</a>
              </li>
              <li>
                <a href="/contatos">Contatos</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a className={botaoOn ? 'show' : 'hide'} href="/login">Voltar<FiLogOut className="FiLogOut" /> </a>

              </li>
            </ul>
          </nav>

          </div>
        </div>
        </div>
      </header>
  )
}

