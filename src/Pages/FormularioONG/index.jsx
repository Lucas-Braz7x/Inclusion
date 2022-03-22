import React from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/INCLUSION_PRETO.png';
import "bootstrap-icons/font/bootstrap-icons.css";



export const FormularioONG = () => {

  return (
    <main>
      <div className="cadastro-doador-infos">
            <img src={logo} alt="Imagem da logo inclusion" />
            <h1> Bem-vindo ao Inclusion!</h1>
            <h2> Preencha o formulário abaixo para ajudar <br></br>quem realmente precisa!</h2>
          </div>
      <div className="cadastro-ong m-4 d-flex justify-content-center align-items-stretch">
        <div className="row col-md-7 col-lg-7 col-xl-7">

          <div className="col dados-pessoais">
            <form >
              <label className="control-label">Nome da ONG</label>
              <input id="nomeONG" placeholder="Digite o nome da ONG" className="form-control" />



              <label className="control-label">Email</label>
              <input id="email" type="email" placeholder="Digite o email da ONG" className="form-control" />



              <label className="control-label">Telefone</label>
              <input id="telefone" placeholder="Digite o numero de telefone da ONG" className="form-control" />



              <label className="control-label">Endereço</label>
              <input placeholder="Digite o endereço da ong" className="form-control" />

              <label className="control-label">Senha</label>
              <input id="senha" type='password' placeholder="Digite a senha" className="form-control" />

              <button type="button" className="btn btn-primary btn-lg" onClick={() => alert('Cadastro realizado com sucesso!')} > Enviar</button>

            </form>
          </div>
        </div>
      </div>

    </main>


  )
}
