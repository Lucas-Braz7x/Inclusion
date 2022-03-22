import React, { useEffect } from 'react';
import { Button } from '../UI/Button';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '..';
import { api, registrarToken } from '../../Service';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import * as P from 'prop-types';
//import { api } from '../../Service/index';


export const FormularioEquipamento = ({ onClose, methodForm, id }) => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();

  useEffect(() => {
    console.log(decodedToken)
    if (!decodedToken || isExpired) {
      mostrarMensagem("error", "Faça login novamente", "Usuário deslogado");
      history('/login');
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

    if (methodForm == 'post') {
      const msg = validation(values);

      if (msg.length > 0) {
        msg.map((message) => mostrarMensagem("error", message, "Falha ao cadastrar equipamento"));
        return;
      }
    }

    const formData = new FormData();
    formData.append("file", values.imageUrl)

    if (values.imageUrl) {
      const data = await fetch("https://inclusion-recode.herokuapp.com/image", {
        method: 'POST',
        body: formData

      })
      const response = await data.json()
      methodForm === "post" ? saveEquipamento(values, response) : updateEquipamento(values, response, id);
    } else {
      methodForm === "post" ? saveEquipamento(values, "") : updateEquipamento(values, "", id);
    }
  }

  const saveEquipamento = async (values, response) => {
    await api.post("equipamento/cadastro", {
      "nomeEquipamento": values.equipamento,
      "descricao": values.descricao,
      "imageUrl": values.imageUrl ? response[0] : "sem imagem",
      "imageHasDelete": values.imageUrl ? response[1] : "sem imagem",
      "tipoDeficiencia": values.tipoDeficiencia,
      "doador": handleGetDoador()
    }).then(() => mostrarMensagem("success", "", "Equipamento cadastrado com sucesso!"))
      .catch(error => mostrarMensagem("error", error, "Error ao cadastrar equipamento"));

    onClose();
  }

  const updateEquipamento = async (values, response, id) => {
    console.log(values == true)
    console.log(id)
    if (values) {
      await api.patch(`/equipamento/${id}`, {
        "nomeEquipamento": values.equipamento ? values.equipamento : '',
        "descricao": values.descricao ? values.descricao : '',
        "imageUrl": response[0],
        "imageHasDelete": response[1],
        "tipoDeficiencia": values.tipoDeficiencia ? values.tipoDeficiencia : '',
      }).then(() => mostrarMensagem("success", "", "Equipamento cadastrado com sucesso!"))
        .catch(error => mostrarMensagem("error", error, "Error ao cadastrar equipamento"));
    }

    onClose();
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
        <div className="cadastroEquipamento">
          {methodForm === "post" ? "Cadastro " : "Editar "}
          equipamento
        </div>
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
          <Button type='submit'>{methodForm == 'post' ? "Cadastrar" : "Atualizar"}</Button>
        </div>
      </form>
    </div>
  )
}

FormularioEquipamento.propTypes = {
  onClose: P.func,
  methodForm: P.string,
  id: P.number
}
