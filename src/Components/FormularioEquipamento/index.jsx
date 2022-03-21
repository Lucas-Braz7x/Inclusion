import React, { useEffect } from 'react';
import { Button } from '../UI/Button';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '..';
import { api, registrarToken } from '../../Service';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';

//import { api } from '../../Service/index';


export const FormularioEquipamento = () => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();

  useEffect(() => {
    if (isExpired) {
      mostrarMensagem("error", "Faça login novamente", "Usuário deslogado");
      history('/cadastro');
    }

    registrarToken(localStorage.getItem("USUARIO_LOGADO"))
  }, [decodedToken])

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const values = {
      equipamento: event.target.equipamento.value,
      descricao: event.target.descricao.value,
      imageUrl: document.getElementById('imageUrl').files[0],
      tipoDeficiencia: document.getElementById('tipoDeficiencia').value
    }

    const msg = validation(values);

    if (msg.length > 0) {
      msg.map((message) => mostrarMensagem("error", message, "Falha ao cadastrar equipamento"));
      return;
    }

    const formData = new FormData();
    formData.append("file", values.imageUrl)

    if (values.imageUrl) {
      const data = await fetch("http://localhost:8080/image", {
        method: 'POST',
        body: formData

      })
      const response = await data.json()
      saveEquipamento(values, response);
    } else {
      saveEquipamento(values, "sem imagem");
    }
  }

  const saveEquipamento = async (values, response) => {
    await api.post("equipamento/cadastro", {
      "nomeEquipamento": values.equipamento,
      "descricao": values.descricao,
      "imageUrl": values.imageUrl ? response[0] : "sem imagem",
      "imageHasDelete": values.imageUrl ? response[0] : "sem imagem",
      "tipoDeficiencia": values.tipoDeficiencia,
      "doador": handleGetDoador()
    }).then(response => console.log(response))
      .catch(error => console.log(error));
  }

  const handleGetDoador = () => {
    const doador = {
      id: decodedToken.id,
      nome: decodedToken.nome,
      email: decodedToken.email,
      cep: decodedToken.cep,
      endereco: decodedToken.endereco,
      estado: decodedToken.estado,
      telefone: decodedToken.telefone,
      role: decodedToken.role,
    }

    return doador
  }

  const validation = (values) => {
    const msgError = [];

    if (!values.equipamento) {
      msgError.push("Preencha o campo Equipamentos");
    }

    if (!values.descricao) {
      msgError.push("Preencha a descricao")
    }

    if (!values.tipoDeficiencia || values.tipoDeficiencia == '') {
      msgError.push("Selecione algum tipo de deficiência")
    }
    return msgError;
  }

  return (
    <div className='formContainer'>
      <form
        onSubmit={event => handleSubmitForm(event)}
        encType='multipart/form-data'>
        <div className='formDiv'>
          <label htmlFor="equipamento"> Equipamento</label>
          <input id='equipamento' name='equipamento' type="text" placeholder='Equipamento' />
        </div>
        <div className='formDiv'>
          <label htmlFor="descricao"> Descricao</label>
          <input id="descricao" name='descricao' type="text" placeholder='Descrição' />
        </div>
        <div className='formDiv'>
          <label htmlFor="imageUrl"> Imagem</label>
          <input id='imageUrl' name='imageUrl' accept='image/*' type="file" placeholder='Imagem' />
        </div>
        <div className='formDiv'>
          <label htmlFor="tipoDeficiencia">Tipo de deficiência</label>
          <select
            onChange={() => console.log(document.getElementById('tipoDeficiencia').value)}
            name="tipoDeficiencia" id="tipoDeficiencia">

            <option value="">Tipo de deficiência</option>
            <option value="visual">Visual</option>
            <option value="auditivo">Auditivo</option>
            <option value="motor">Motor</option>
            <option value="cognitivo">Cognitivo</option>
            <option value="neurologico">Neurológico</option>
          </select>
        </div>
        <div className='formDiv'>
          <Button type='submit'>Cadastrar</Button>
        </div>
      </form>
    </div>
  )
}
