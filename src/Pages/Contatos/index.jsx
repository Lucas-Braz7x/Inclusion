import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMapMarker } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';

export const Contatos = () => {
  return(
    <section id="contact" className="contact">
    <div className="container">

      <div className="section-title">
        <h2>Quer falar com a gente?</h2>
        <p>Nós gostaríamos de receber uma mensagem sua. Deixe o seu feedback!</p>
      </div>

      <div className="row">

        <div className="col-lg-5 d-flex align-items-stretch">
          <div className="info">
            <div className="address">
              <i className="bi bi-geo-alt"><FaMapMarker/></i>
              <h4>Localização:</h4>
              <p>A108 Adam Street, São Paulo, SP 535022</p>
            </div>

            <div className="email">
              <i className="bi bi-envelope"><MdEmail/></i>
              <h4>E-mail:</h4>
              <p>inclusion@atendimento.com</p>
            </div>

            <div className="phone">
              <i className="bi bi-phone"><AiFillPhone/></i>
              <h4>Telefone:</h4>
              <p>+55 11 34567890</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
              className="iiframe"></iframe>
          </div>

        </div>

        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form className="php-email-form">
            <div className="row">
              <div className="form-group col-md-6">
                <label>Seu Nome</label>
                <input type="text" name="name" className="form-control" id="name" required/>
              </div>
              <div className="form-group col-md-6">
                <label>Seu E-mail</label>
                <input type="email" className="form-control" name="email" id="email" required/>
              </div>
            </div>
            <div className="form-group">
              <label>Título</label>
              <input type="text" className="form-control" name="subject" id="subject" required/>
            </div>
            <div className="form-group">
              <label>Mensagem</label>
              <textarea className="form-control" name="message" rows="10" required></textarea>
            </div>
            <div className="my-3">
              <div className="loading">Carregando</div>
              <div className="error-message"></div>
              <div className="sent-message">Sua mensagem foi enviada com sucesso. Obrigado!</div>
            </div>
            <div className="text-center"><button type="submit">Enviar</button></div>
          </form>
        </div>

      </div>

    </div>
  </section>
  );
}
