import React, { useState } from 'react';
import './styles.scss';
import * as P from 'prop-types';
import img from '../../assets/sem-imagem.jpg';
import { FiLink } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { Modal } from '../UI/Modal';



export const EquipamentoCard = ({ filtro, equipamento }) => {
  const [modal, setModal] = useState(false);
  console.log(equipamento)

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
                {equipamento.imageUrl.length > 15 &&
                  <img src={equipamento.imageUrl} alt={equipamento.imageUrl} />
                }
              </div>
              <div>
                <h1>{equipamento.nomeEquipamento}</h1>
                <p>{equipamento.descricao}</p>
                <p>{equipamento.tipoDeficiencia}</p>
                <p>{equipamento.doador.nomeDoador}</p>
                <p>{equipamento.doador.telefone}</p>
                <p>{equipamento.doador.endereco}</p>
                <p>{equipamento.doador.cep}</p>
                <p>{equipamento.doador.estado}</p>
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
