import React, {useState} from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Login/assets/inclusion-logo.png';
import {Link} from 'react-router-dom';


export const Header = () => {

const [classOn, setClassOn] = useState(false);
      
  return (
    <header>
    <div className="container">
      <div>
      <Link to="/"><img className="logo-cyan" src={logo} alt="logo Cyan"></img></Link>
      </div>
      

      <div className = { classOn ? 'menu-section on' : 'menu-section'} onClick={() => setClassOn(!classOn)}>
           <div className="menu-toggle">
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
           </div>

           <nav>
            <ul>

              <li>
                <a className="text-white" href="/">Página Inicial</a>
              </li>
              <li>
                <a className="text-white" href="/equipamentos">Equipamentos</a>
              </li>
              <li>
                <a className="text-white" href="/time">Time</a>
              </li>
              <li>
                <a className="text-white" href="/contatos">Contatos</a>
              </li>
              <li>
                <a className="text-white" href="/login">Login</a>
              </li>
              
            </ul>
          </nav>

          </div>
        </div>

      </header>

      )
    }
    
