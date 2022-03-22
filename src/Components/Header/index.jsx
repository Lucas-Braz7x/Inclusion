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

           <nav id="navbar" className="navbar navbar-expand-lg">
            <ul className="navbar-nav item-list">
              <li>
                <Link to="/" style={{"color": "white"}}>Página Inicial</Link>
              </li>
              <li>
                <Link to="/Equipamentos" style={{"color": "white"}}>Equipamentos</Link>
              </li>
              <li>
                <Link to="/Time" style={{"color": "white"}}>Time</Link>
              </li>
              <li>
                <Link to="/Contatos" style={{"color": "white"}}>Contatos</Link>
              </li>
              <li>
                <Link to='/cadastro' className="getstarted scrollto">Doação</Link>  
              </li>
              <li>
                <Link to="/cadastro/ong" className="getstarted scrollto" style={{"color": "white"}}>Ongs</Link>  
              </li>
            </ul>
          </nav>

          </div>
        </div>

      </header>

      )
    }
    
