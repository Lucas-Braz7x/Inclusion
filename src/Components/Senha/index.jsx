import React from 'react';
import './styles.scss';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import  Logo from "./assets/inclusion-logo.png";

export const Senha = () => {
  return (

    <main>


          <div className="wrap-login justify-content-center">
            <form className="login-form"  >
              <span className="login-form-title"> Bem vindo! </span>
              <span className="login-form-title">
                  <img src={Logo} alt="inclusion" />
              </span>

              <div className="wrap-input">
                <input className= "has-val input" type="email" />
                  <span className="focus-input" data-placeholder="Email"></span>
              </div>
              <div className="wrap-input">
                <input className="has-val input"  />
                <span className="focus-input" data-placeholder="New Password"></span>
              </div>
              <div className="wrap-input">
                <input className="has-val input"/>
                <span className="focus-input" data-placeholder="Confirm"></span>
              </div>
              <div className="container-login-form-btn">
                <button  type= "submit" className="login-form-btn" >Login</button>
              </div>

            </form>
          </div>


    </main>
  )
}
