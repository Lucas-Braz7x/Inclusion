import React from 'react';
import { Button } from '../UI/Button';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '..';


export const FormularioEquipamento = () => {


  const handleSubmitForm = (event) => {
    event.preventDefault();
    const values = {
      equipamento: event.target.equipamento.value,
      descricao: event.target.descricao.value,
      imageUrl: event.target.imageUrl.value,

    }

    const msg = validation(values);

    if (msg.length > 0) {
      msg.map((message) => mostrarMensagem("error", message, "Falha ao cadastrar equipamento"));
      return;
    }
    console.log(event)
    console.log(event.target[0].value)
  }

  const validation = (values) => {
    const msgError = [];

    if (!values.equipamento) {
      msgError.push("Preencha o campo Equipamentos");
    }

    if (!values.descricao) {
      msgError.push("Preencha a descricao")
    }
    return msgError;
  }

  return (
    <main>
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
            <Button type='submit'>Cadastrar</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
