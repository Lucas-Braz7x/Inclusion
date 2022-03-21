import React from 'react';
import './styles.scss';
import * as P from 'prop-types';
import img from '../../assets/sem-imagem.jpg';
import { FiLink } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';



export const EquipamentoCard = ({ filtro, equipamento, handleOpenModal }) => {
  return (
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
        <a href="#" data-gallery="portfolioGallery"
          className="portfolio-lightbox preview-link" title="Cadeira de Rodas turbo">
          <MdAdd onClick={handleOpenModal} sx={{ color: "#fff" }} />
        </a>
        <a href="#" className="details-link" title="Garanta já">
          <FiLink sx={{ color: "#fff " }} />
        </a>
      </div>
    </div>
  )
}


EquipamentoCard.propTypes = {
  filtro: P.string,
  equipamento: P.object.isRequired,
  handleOpenModal: P.func
}
