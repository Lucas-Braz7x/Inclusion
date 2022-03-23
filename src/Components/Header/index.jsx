import React, { useState } from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Login/assets/inclusion-logo.png';
import { Link } from 'react-router-dom';


export const Header = () => {

  const [classOn, setClassOn] = useState(false);

  return (
    <header>
      <div className="container">
        <div>
          <Link to="/"><img className="logo-cyan" src={logo} alt="logo Cyan"></img></Link>
        </div>


        <div className={classOn ? 'menu-section on' : 'menu-section'} onClick={() => setClassOn(!classOn)}>
          <div className="menu-toggle">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>

          <nav>
            <ul>
              <li>
                <Link className="text-white" to="/">Página Inicial</Link>
              </li>
              <li>
                <Link className="text-white" to="/equipamentos">Equipamentos</Link>
              </li>
              <li>
                <Link className="text-white" to="/time">Time</Link>
              </li>
              <li>
                <Link className="text-white" to="/contatos">Contatos</Link>
              </li>
              <li>
                <Link className="text-white" to="/login">Login</Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>

    </header>

  )
}

