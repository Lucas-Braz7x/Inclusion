import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import { mostrarMensagem } from '../../Components';
import { FormularioDoador } from '../../Components/FormularioDoador';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { useNavigate } from 'react-router-dom';
import { registrarToken } from '../../Service';

export const Config = () => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const [idDoador, setIdDoador] = useState('');
  const history = useNavigate();

  useEffect(() => {
    console.log(decodedToken)
    if (isExpired) {
      mostrarMensagem("error", "Faça login novamente", "Usuário deslogado");
      history('/login');
    } else {
      registrarToken(localStorage.getItem("USUARIO_LOGADO"))
      setIdDoador(decodedToken)
    }
  })
  return (
    <>
      {idDoador &&
        <FormularioDoador methodForm='update' idDoador={idDoador.id} />
      }
    </>

  )
}
