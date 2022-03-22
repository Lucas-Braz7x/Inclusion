import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { mostrarMensagem, ShowPassword } from '../../Components';
import { api } from '../../Service';
import * as P from 'prop-types';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import logo from '../../assets/INCLUSION_PRETO.png';



export const FormularioONG = ({ idOng }) => {
  const methodForm = 'post'
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const values = {
      "nomeOng": document.getElementById('nomeOng').value,
      "email": document.getElementById('emailOng').value,
      "cnpj": document.getElementById('cnpj').value,
      "telefone": document.getElementById("telefoneOng").value,
      "cep": document.getElementById("cepOng").value,
      "endereco": document.getElementById("enderecoOng").value,
      "estado": document.getElementById("estadoOng").value,
      "senha": document.getElementById("senhaOng").value


    }
    console.log(values)
    const senhaRepetida = document.getElementById("senhaOngRepetida").value;

    const msgError = validations(values, senhaRepetida);

    if (msgError.length > 0 && !idOng) {
      msgError.map((message) => mostrarMensagem("error", message, "Atenção"));

      return;
    }
    methodForm == "post" ? saveDoador(values) : updateDoador(values)

  }

  const updateDoador = (values) => {
    console.log(idOng)
    const id = 1;
    api.patch(`/ong/${id}`, values)
      .then((response) => {
        if (response.status == 200) {
          document.querySelector('form').reset();
        }
        mostrarMensagem("success", "", "ONG atualizada com sucesso")
      })
      .catch(error => mostrarMensagem("error", error.response.data.message, "Error ao atualizar doador"));
  }

  const saveDoador = (values) => {

    api.post("/ong/cadastro", values)
      .then((response) => {
        if (response.status == 200) {
          document.querySelector('form').reset();
        }
        mostrarMensagem("success", "", "Ong cadastrado com sucesso")
      })
      .catch(error => mostrarMensagem("error", error.response.data.message, "Error ao cadastrar ONG"));


  }

  const validations = (values, senhaRepetida) => {
    const msg = [];

    if (!values.nomeOng && values.nomeOng == '') {
      console.log('entrou aqui')
      msg.push("Preencha o campo nome");
    }
    if (!values.email) {
      msg.push("Preencha o campo email");
    }
    if (!values.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msg.push("Informe um email válido");
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

    if (!values.cnpj) {
      msg.push("Preencha o campo cpnj");
    }

    if (values.cnpj.length != 14) {
      msg.push("O campo CNPJ deve conter 14 caracteres");
    }


    if (values.senha.length < 8) {
      msg.push("A senha precisa conter 8 caracteres ou mais");
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
        <h2> Preencha o formulário abaixo para ajudar quem realmente precisa!</h2>
      </div>
      <div className="cadastro-ong m-4 d-flex justify-content-center align-items-stretch">
        <div className="row col-md-3 col-lg-3 col-xl-4">

          <div className="col dados-pessoais">
            <form onSubmit={(evento) => handleSubmitForm(evento)}>
              <label className="control-label">Nome da ONG</label>
              <input id="nomeOng" placeholder="Digite o nome da ONG" className="form-control" />

              <label className="control-label">Email</label>
              <input id="emailOng" type="email" placeholder="Digite o email da ONG" className="form-control" />

              <label className="control-label">CNPJ</label>
              <input id="cnpj" maxLength={14} type="number" placeholder="Digite o email da ONG" className="form-control" />

              <label className="control-label">Telefone</label>
              <input id="telefoneOng" maxLength={11} minLength={10} type='number'
                placeholder="Digite o numero de telefone da ONG" className="form-control" />

              <label className="control-label">Endereço</label>
              <input id="enderecoOng" placeholder="Digite o endereço da ong" className="form-control" />

              <label className="control-label">Estado</label>
              <input id="estadoOng" maxLength={2} placeholder="Digite o estado da ong" className="form-control" />

              <label className="control-label">CEP</label>
              <input id="cepOng" minLength={2} maxLength={2} placeholder="Digite o CEP da ong" className="form-control" />

              <label className="control-label">Senha: </label><ShowPassword idInput={"senhaOng"} />
              <input id="senhaOng" minLength={8} type='password' placeholder="Digite a senha" className="form-control" />


              <label className="control-label">Repita a senha: </label><ShowPassword idInput={"senhaOngRepetida"} />
              <input id="senhaOngRepetida" minLength={8} type='password' placeholder="Digite a senha" className="form-control" />


              <button type="submit" className="btn btn-primary btn-lg" > Enviar</button>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

FormularioONG.propTypes = {
  methodForm: P.string,
  idOng: P.number
}
