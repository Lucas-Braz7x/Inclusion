import React, { useState } from 'react';
import './styles.scss';
import * as P from 'prop-types';
import img from '../../assets/sem-imagem.jpg';
import { FiLink } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md';
import { Modal } from '../UI/Modal';
//import { registrarToken } from '../../Service';
import { useJwt } from "react-jwt";
//import { mostrarMensagem } from '..';
//import { useNavigate } from 'react-router-dom';

export const EquipamentoCard = ({ filtro, equipamento }) => {
  const [modal, setModal] = useState(false);

  const { decodedToken } = useJwt(localStorage.getItem("USUARIO_LOGADO"));


  return (
    <>
      <div className={`col-lg-4 col-md-6 portfolio-item ${filtro}`}>
        <div className="portfolio-img">
          <img
            src={equipamento.imageUrl.length < 20 ?
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
        open={modal}
        onClose={() => setModal(!modal)}
      ><>
          <div className='modalContainer'>
            <div className='modalContent'>
              <div className='modalImage'>
                <img src={equipamento.imageUrl == "sem imagem" ? img : equipamento.imageUrl}
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
                  {decodedToken.id == equipamento.doador.id && (
                    <>
                      <FiTrash2 />
                      <BiEditAlt />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </></Modal>
    </>
  )
}


EquipamentoCard.propTypes = {
  filtro: P.string,
  equipamento: P.object.isRequired,
  handleOpenModal: P.func
}
