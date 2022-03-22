import React, { useEffect, useState } from 'react';
import './styles.scss';
import * as P from 'prop-types';
import img from '../../assets/sem-imagem.jpg';
import { FiLink } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Modal } from '../UI/Modal';
import { registrarToken } from '../../Service';
import { api } from '../../Service';
import { useJwt } from "react-jwt";
import { mostrarMensagem } from '..';
import { FormularioEquipamento } from '../FormularioEquipamento';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

export const EquipamentoCard = ({ filtro, equipamento, handleUpdateData }) => {
  const [modal, setModal] = useState(false);
  const [idEquipamento, setIdEquipamento] = useState(null);
  const [modalForm, setModalForm] = useState(false);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const idDoador = equipamento.doador.id;
  const isLogin = decodedToken ? decodedToken.id == idDoador : false;
  const history = useNavigate();

  useEffect(() => {
    if (decodedToken) {
      registrarToken(localStorage.getItem("USUARIO_LOGADO"));
    }

    if (isExpired) {
      mostrarMensagem('error', "Faça login novamente", "Usuário deslogado");
      localStorage.removeItem("USUARIO_LOGADO");
    }
  }, [])

  const deleteEquipamento = async (id, equipamento) => {
    console.log(equipamento.imageHasDelete);
    if (confirm("Tem certeza que deseja excluir este equipamento?")) {
      if (equipamento.imageHasDelete) {
        await api.delete(`/image/${equipamento.imageHasDelete}`)
          .then(() => console.log("imagem excluida com sucesso"))
          .catch(error => console.log(error));
      }
      await api.delete(`/equipamento/${id}`)
        .then(() => mostrarMensagem('success', "", "Equipamento excluído com sucesso"))
        .catch(error => (console.log(error), mostrarMensagem('error', error, "Falha ao excluir equipamento")));

      await handleUpdateData();
      setModal(!modal);
    }
  }

  const openModalEquipamento = (equipamento) => {
    setModalForm(true);
    setIdEquipamento(equipamento.id);
  }

  const closeModals = async () => {
    await handleUpdateData();
    history('/equipamentos')
    setModal(false);
    setModalForm(false);
  }


  return (
    <>
      <div className={`col-lg-4 col-md-6 portfolio-item ${filtro}`}>
        <div className="portfolio-img">
          <img
            src={equipamento.imageUrl == 'sem imagem' || equipamento.imageUrl == null ?
              img : equipamento.imageUrl}
            className="img-fluid" alt="" />
        </div>
        <div className="portfolio-info">
          <h4>{equipamento.nomeEquipamento}</h4>
          <p>{equipamento.descricao}</p>
          <button id='buttonCard' data-gallery="portfolioGallery"
            className="portfolio-lightbox preview-link" title="Cadeira de Rodas turbo">
            <MdAdd onClick={() => setModal(true)} sx={{ color: "#fff" }} />
          </button>
          <a href="#" className="details-link" title="Garanta já">
            <FiLink sx={{ color: "#fff " }} />
          </a>
        </div>
      </div>
      <Modal
        id={equipamento.doador.id}
        open={modal}
        onClose={closeModals}
      ><>
          <div className='modalContainer'>
            <div className='modalContent'>
              <div className='modalImage'>
                <img src={!equipamento.imageUrl ? img : equipamento.imageUrl}
                  alt={equipamento.imageUrl} />
              </div>
              <div>

                <div className='modalEquipamento'>
                  <h1>{equipamento.nomeEquipamento}</h1>
                  <p>Descrição: {equipamento.descricao}</p>
                  <p>Tipo de deficiência: {equipamento.tipoDeficiencia}</p>
                </div>

                <div className='modalDoador'>
                  <p>Nome: {equipamento.doador.nomeDoador} | {equipamento.doador.email}</p>
                  <p>Contato: {equipamento.doador.telefone}</p>
                  <p>
                    Endereço: {equipamento.doador.endereco}-{equipamento.doador.estado}</p>
                </div>

                <div className='modalIcons'>
                  {isLogin && (
                    <>
                      <FiTrash2 onClick={() => deleteEquipamento(equipamento.id, equipamento)} />
                      <BiEditAlt onClick={() => openModalEquipamento(equipamento)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </></Modal>
      <Modal
        open={modalForm}
        onClose={closeModals}
      >
        <FormularioEquipamento id={idEquipamento} methodForm='update' onClose={() => setModalForm(!modalForm)} />
      </Modal>
    </>
  )
}


EquipamentoCard.propTypes = {
  filtro: P.string,
  equipamento: P.object.isRequired,
  handleUpdateData: P.func
}
