import React, { useEffect, useState } from 'react';
import { FormularioDoador } from '../../Components/FormularioDoador';
import { Login } from '../../Components/';
//import { FormularioONG } from '../../Components/FormularioONG';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom'
import { registrarToken } from '../../Service/index';
import { mostrarMensagem } from '../../Components/Toastr/index';

export const Cadastro = () => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();
  const [login, setLogin] = useState();

  useEffect(() => {
    if (isExpired) {
      mostrarMensagem("error", "Faça login novamente", "Usuário deslogado");
      history('/cadastro');
    }

    registrarToken(localStorage.getItem("USUARIO_LOGADO"))
  }, [decodedToken])
  return (
    <main>
      <button onClick={() => setLogin(!login)} >
        {login ? "ir para Cadastro" : "ir para login"}
      </button>
      {
        login ? <Login></Login> : <FormularioDoador methodForm='post' />
      }
    </main>
  )
}
