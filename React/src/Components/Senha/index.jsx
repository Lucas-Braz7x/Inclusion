import React from 'react';
import './styles.scss';
import Logo from "./assets/inclusion-logo.png";
import { api } from '../../Service';
import { mostrarMensagem } from '../Toastr';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { ShowPassword } from '../'
import { useNavigate } from 'react-router-dom';

export const Senha = () => {
  const history = useNavigate();
  const handleSubmitFormRecover = (event) => {
    event.preventDefault();

    const values = {
      "email": document.getElementById('emailRecuperacao').value,
      "senha": document.getElementById('senhaRecuperacao').value
    }
    const senhaRepetida = document.getElementById('senhaRecuperacaoRepetida').value;

    const msgError = validations(values, senhaRepetida);
    if (msgError.length > 0) {
      msgError.map((message) => mostrarMensagem("error", message, "Atenção"))
      return;
    }
    api.patch("doador/atualizar", values).then(() => {
      mostrarMensagem("success", "", "Senha atualizada!")
      history('/login')

    }).catch(error => mostrarMensagem("error", error.response, "Error ao recuperar a senha"));
  }

  const validations = (values, senhaRepetida) => {
    const msg = [];

    if (!values.email && values.email == undefined) {
      msg.push("Preencha o campo email");
    } else if (!values.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msg.push("Informe um email válido");
    }
    if (!values.senha) {
      msg.push("Preencha o campo senha");
    } else if (values.senha.length < 8) {
      msg.push("O campo senha deve conter 8 ou mais caracteres");
    }
    if (!senhaRepetida) {
      msg.push("Digite a senha duas vezes");
    }
    if (values.senha != senhaRepetida) {
      msg.push("As senhas devem ser iguais");
    }
    return msg;
  }

  return (
    <main>
      <div className="wrap-login justify-content-center">
        <form
          onSubmit={(evento) => handleSubmitFormRecover(evento)}
          className="login-form"  >
          <span className="login-form-title"> Bem vindo! </span>
          <span className="login-form-title">
            <img src={Logo} alt="inclusion" />
          </span>

          <div className="wrap-input">
            <input id='emailRecuperacao' className="has-val input" type="email" />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>
          <div className="wrap-input">
            <input id="senhaRecuperacao" className="has-val input" type='password' />
            <span className="focus-input" data-placeholder="New Password"></span>
            <ShowPassword idInput="senhaRecuperacao" />
          </div>
          <div className="wrap-input">
            <input id="senhaRecuperacaoRepetida" className="has-val input" type='password' />
            <span className="focus-input" data-placeholder="Confirm"></span>
            <ShowPassword idInput="senhaRecuperacaoRepetida" />
          </div>
          <div className='checkbox-input'>
          </div>
          <div className="container-login-form-btn">
            <button type="submit" id='button' className="login-form-btn" >Recuperar senha</button>
          </div>
        </form>
      </div>
    </main>
  )
}
