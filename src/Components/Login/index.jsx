import React, { useState } from 'react';
import { api, registrarToken } from '../../Service/index';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { mostrarMensagem } from '../../Components';

import './styles.scss';

import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
//import { Button } from '../UI/Button';

import Logo from "./assets/inclusion-logo.png";

export const Login = () => {
  const history = useNavigate();
  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioSenha, setUsuarioSenha] = useState('');


  /* useEffect(() => {
    const token = localStorage.getItem("USUARIO_LOGADO");
    if (token) {
      history('/');
    }
  }, []) */


  const handleSubmit = (e) => {
    e.preventDefault();

    const msgs = validarFormulario(usuarioEmail, usuarioSenha);

    if (msgs && msgs.length > 0) {
      msgs.forEach((mensagem) => {
        mostrarMensagem("warning", mensagem, "Atenção");
      });

      return false;
    }

    api.post("/doador/login", {
      "email": usuarioEmail,
      "senha": usuarioSenha
    })
      .then((response) => {
        salvarLocal(response.data);
        mostrarMensagem("success", "Usuário autenticado", "Bem-vindo");
        history('/');
      })
      .catch(error => {
        mostrarMensagem("error", error.response.data.message, "Falha ao autenticar usuário")
      });

  }

  const salvarLocal = (token) => {
    registrarToken(token);
    localStorage.setItem("USUARIO_LOGADO", token);
    console.log("Usuario logado com sucesso");
  }


  const validarFormulario = (email, senha) => {
    const mensagens = [];

    console.log(email)
    if (!email) {
      mensagens.push("O campo email é obrigatório");
    } else if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      mensagens.push("Informe um email válido");
    }

    if (senha.length < 3) {
      mensagens.push("A senha precisa conter 3 caracteres ou mais");
    }

    return mensagens;
  }

  return (

    <main>


      
        
          <div className="wrap-login justify-content-center">
            <form className="login-form" onSubmit={(evento) => handleSubmit(evento)}>
              <span className="login-form-title"> Bem vindo! </span>

              <span className="login-form-title">
                <img src={Logo} alt="inclusion" />
              </span>

              <div className="wrap-input">
                <input
                  className="has-val input"
                  type="email"

                  onChange={(e) => setUsuarioEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>

              <div className="wrap-input">
                <input
                  className="has-val input"
                  type="password"

                  onChange={(e) => setUsuarioSenha(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
              </div>
              <div className="container-login-form-btn">
                <button onClick={handleSubmit} type="submit" className="login-form-btn" >Login</button>
              </div>
              <div className="text-center">
                <span className="txt1">Não possui conta? </span>
                <Link className="form-doador" to="/cadastro/doador">Cadastrar como Doador.</Link>
              </div>
              <div className="text-center">
                <span className="txt1">Você é Ong? </span>
                <Link className="form-ong" to="/cadastro/ong">Cadastrar sua ONG.</Link>
              </div>
              <div className="text-center">
                <span className="txt1">Esqueceu a Senha? </span>
                <Link className="senha" to="/alterarsenha">Esqueci minha senha.</Link>
              </div>

            </form>
          </div>
        
      
    </main>
  )
}



