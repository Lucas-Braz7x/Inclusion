import React from 'react';
import './styles.scss';
import * as P from 'prop-types';

export const TeamCard = ({ collaborator, image }) => {

  collaborator.foto = image;

  return (
    <div className="col-lg-6 mt-4">
      <div className="member d-flex align-items-start">
        <div className="picture"><img src={collaborator.foto} className="img-fluid" alt="" /></div>
        <div className="member-info">
          <h4>{collaborator.nome}</h4>
          <span>{collaborator.profissao}</span>
          <p>{collaborator.descricao}</p>
          <div className="social">
            <a className="links" href={collaborator.github}><i className="ri-github-fill"></i></a>

            <a className="links" href={collaborator.linkdin}> <i className="ri-linkedin-box-fill"></i> </a>
          </div>
        </div>
      </div>
    </div>
  )
}



TeamCard.propTypes = {
  collaborator: P.object,
  image: P.string
}
