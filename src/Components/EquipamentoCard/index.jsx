import React from 'react';
import './styles.scss';
import * as P from 'prop-types';
import img from '../../assets/equipamentos/cadeirarodas.jpeg';

/*eslint-disabled*/
export const EquipamentoCard = ({ filtro }) => {
  return (
    <div className={`col-lg-4 col-md-6 portfolio-item ${filtro}`}>
      <div className="portfolio-img"><img src={img} className="img-fluid" alt="" /></div>
      <div className="portfolio-info">
        <h4>Cadeira de Rodas</h4>
        <p>Auxilia na locomoção</p>
        <a href="~/assets/portfolio/cadeirarodas.jpeg" data-gallery="portfolioGallery"
          className="portfolio-lightbox preview-link" title="Cadeira de Rodas"></a>
        <a href="#" className="details-link" title="Garanta já"></a>
      </div>
    </div>
  )
}


EquipamentoCard.propTypes = {
  filtro: P.string
}
