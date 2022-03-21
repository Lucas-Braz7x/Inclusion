import React, { useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '..';
import { api, registrarToken } from '../../Service';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import './style.scss';

//import { api } from '../../Service/index';


export const FormularioEquipamento = () => {
  const [imageResponse, setImageResponse] = useState(null);
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
      const resposta = fetch("http://localhost:8080/image", {
        method: 'POST',
        body: formData

      }).then(response => response.json())
        .then(data => (data, setImageResponse(data)))
        .catch(error => console.log(error.error));
      console.log("Resposta: " + resposta)
    }

    await api.post("equipamento/cadastro", {
      "nomeEquipamento": values.equipamento,
      "descricao": values.descricao,
      "imageUrl": values.imageUrl ? imageResponse[0] : "sem imagem",
      "imageHasDelete": values.imageUrl ? imageResponse[1] : "sem imagem",
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
        <div className=" dados">
          <label htmlFor="equipamento" className="control-label "> Equipamento</label>
          <input id='equipamento' className="form-control" name='equipamento' type="text" placeholder='Equipamento' />
        </div>
        <div className=" dados">
          <label htmlFor="descricao" className="control-label "> Descricao</label>
          <input id="descricao" className="form-control" name='descricao' type="text" placeholder='Descrição' />
        </div>
        <div className=" dados">
          <label htmlFor="imageUrl" className="control-label "> Imagem</label>
          <input id='imageUrl' className="form-control" name='imageUrl' accept='image/*' type="file" placeholder='Imagem' />
        </div>
        <div className=" dados">
          <label htmlFor="tipoDeficiencia" className="control-label ">Tipo de deficiência</label>
          <select className="form-control"
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
