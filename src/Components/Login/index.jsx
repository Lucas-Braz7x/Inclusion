import React, { useState } from 'react';
import { api, registrarToken } from '../../Service/index';
import { useNavigate } from 'react-router-dom';
import { mostrarMensagem } from '..';

import './styles.scss';

import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { Button } from '../UI/Button';

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
        mostrarMensagem("success", mensagem, "Atenção");
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
      .catch(e => {
        mostrarMensagem("error", e.response.data, "Falha ao autenticar usuário")
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



      <div className="form-container">
        <form onSubmit={(evento) => handleSubmit(evento)}>

          <div className=" dados">
            <label htmlFor='email' className="control-label ">Email: </label>
            <input
              type='email'
              name='email' id='email'
              onChange={evento => setUsuarioEmail(evento.target.value)}
              className="form-control"
            />
          </div>

          <div className=" dados">
            <label htmlFor='senha' className="control-label ">Senha: </label>
            <input
              type='password'
              name='senha' id='senha'
              onChange={evento => setUsuarioSenha(evento.target.value)}
              className="form-control"
            />

          </div>
          <Button type='submit'>Login</Button>
        </form>
      </div>
    </main>
  )
}
