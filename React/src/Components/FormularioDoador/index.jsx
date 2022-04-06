import React, { useEffect } from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/INCLUSION_PRETO.png';
import { api, registrarToken } from '../../Service/index';
import { mostrarMensagem } from '../Toastr';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { ShowPassword } from '..';
import * as P from 'prop-types';

export const FormularioDoador = ({ methodForm, idDoador }) => {
  const isMethodForm = methodForm ? methodForm : 'post';


  useEffect(() => {
    if (idDoador) {
      registrarToken(localStorage.getItem("USUARIO_LOGADO"));
    }
  })
  console.log(isMethodForm)
  const handleSubmitForm = (event) => {
    event.preventDefault();

    const values = {
      "nomeDoador": document.getElementById('nome').value,
      "email": document.getElementById('email').value,
      "telefone": document.getElementById("telefone").value,
      "cep": document.getElementById("cep").value,
      "endereco": document.getElementById("endereco").value,
      "estado": document.getElementById("estado").value,
      "senha": document.getElementById("senha").value
    }
    console.log(values)
    const senhaRepetida = document.getElementById("senhaRepetida").value;

    const msgError = validations(values, senhaRepetida);

    if (msgError.length > 0 && !idDoador) {
      msgError.map((message) => mostrarMensagem("error", message, "Atenção"));

      return;
    }

    isMethodForm == "post" ? saveDoador(values) : updateDoador(values)
  }

  const updateDoador = (values) => {
    values.email = ''
    api.patch(`/doador/${idDoador}`, values)
      .then((response) => {
        if (response.status == 200) {
          document.querySelector('form').reset();
        }
        mostrarMensagem("success", "", "Doador atualizado com sucesso");
      })
      .catch(error => mostrarMensagem("error", error.response.data.message, "Error ao atualizar doador"));
  }

  const saveDoador = (values) => {

    api.post("/doador/cadastro", values)
      .then((response) => {
        if (response.status == 200) {
          document.querySelector('form').reset();
        }
        mostrarMensagem("success", "", "Doador cadastrado com sucesso")
      })
      .catch(() => mostrarMensagem("error", "Email já cadastrado", "Error ao cadastrar doador"));
  }

  const validations = (values, senhaRepetida) => {
    const msg = [];

    if (!values.nomeDoador) {
      msg.push("Preencha o campo nome");
    }
    if (!values.email) {
      msg.push("Preencha o campo email");
    }
    if (!values.telefone) {
      msg.push("Preencha o campo telefone");
    }
    if (!values.endereco) {
      msg.push("Preencha o campo endereço");
    }
    if (!values.estado) {
      msg.push("Preencha o campo estado");
    }
    if (!values.cep) {
      msg.push("Preencha o campo cep");
    }
    if (!values.senha) {
      msg.push("Preencha o campo senha");
    }
    if (!senhaRepetida) {
      msg.push("Digite a senha 2x");
    }

    if (senhaRepetida.length < 8 || values.senha.length < 8) {
      msg.push("A senha deve conter 8 ou mais caracteres");
    }

    if (values.senha !== senhaRepetida) {
      msg.push("As senhas devem ser iguais")
    }

    return msg;
  }

  return (
    <main>
      <div className="cadastro-doador-infos">
        <img src={logo} alt="Imagem da logo inclusion" />
        <h1> Bem-vindo ao Inclusion!</h1>
        <h2> Preencha o formulário abaixo {isMethodForm == 'post' ?
          "para ajudar quem realmente precisa!" : "para atualizar os seus dados pessoais"}</h2>
      </div>
      <div className="cadastro-doador m-4 d-flex justify-content-center align-items-stretch">
        <div id='formContainer' className="row col-md-3 col-lg-3 col-xl-4 ">

          <div className="col dados-pessoais ">
            <form onSubmit={(evento) => handleSubmitForm(evento)}
            >

              <label className="control-label">Nome</label>
              <input id="nome" placeholder="Digite o seu nome..." className="form-control" />


              <label className="control-label">Email</label>
              <input id="email" type="email" placeholder="Digite o seu email" className="form-control" />

              <label className="control-label">Telefone</label>
              <input id="telefone" placeholder="Digite o seu telefone" maxLength="11" className="form-control" />

              <label className="control-label">Endereço</label>
              <input id="endereco" placeholder="Digite o seu endereço" className="form-control" />

              <label className="control-label">CEP</label>
              <input id="cep" placeholder="Digite o seu cep..." minLength="8" maxLength="8" type="number" className="form-control" />

              <label className="control-label">Estado</label>
              <input id="estado" placeholder="Digite o seu estado..." minLength="2" maxLength="2" type="text" className="form-control" />

              <label className="control-label">Senha    </label><ShowPassword idInput="senha" />
              <input id="senha" type="password" placeholder="Digite a sua senha" minLength="8" className="form-control" />


              <label className="control-label">Senha    </label><ShowPassword idInput="senhaRepetida" />
              <input id="senhaRepetida" type="password" placeholder="Digite a senha" minLength="8" className="form-control" />


              <div>

              </div>
              <button type="submit" className="btn btn-primary btn-lg"> Enviar</button>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

FormularioDoador.propTypes = {
  methodForm: P.string,
  idDoador: P.number
}
