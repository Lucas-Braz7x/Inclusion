import React from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import h1png from '../../assets/h1.png';
//import "bootstrap-icons/font/bootstrap-icons.css";
import ONG from "../../assets/iconetitle.png";

export const Home = () => {
  return (
    <main id="home">
      <div id='hero' className='d-flex alignt-items-center'>
        <div className='container'>
          <div className='row'>
            <div id='texto' className='col-lg-7  d-flex flex-column justify-content-center pt-4'>
              <h1>Doe Equipamentos e Acessórios para PCDs</h1>
              <h2>Somos uma corrente do bem, com o objetivo de promover acessibilidade nos produtos e equipamentos de
                PCDs. </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="https://www.youtube.com/watch?v=krhinq9zsss" className='glightbox btn-watch-video links'><i
                  className="bi bi-play-circle"></i>Assistir Vídeo</a>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 hero-img">
              <img src={h1png} className="img-fluid animated" alt="Imagem de um grupo de pessoas com deficiência/imagem de inclusão" />
            </div>
          </div>
        </div>
      </div>
      <div id="cliens" className='cliens section-bg'>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
              <img src={ONG} className="img-fluid" alt="" />
            </div>

          </div>

        </div>
      </div>
      <div id="about" className='about'>

        <div className="container">
          <div className="section-title">
            <h2>Sobre nós</h2>
          </div>

          <div className="row content">
            <div className="col-lg-6">
              <p>
                Nós somos uma organização que funciona em parcerias com ONGs para facilitar a doação de equipamentos para
                pessoas portadoras de deficiência.
              </p>
              <ul>
                <li><i className="bi bi-check-all"></i> A Inclusion trabalha para atender os que necessitam</li>
                <li><i className="bi bi-check-all"></i> Acreditamos na Inclusão através dos meios de Internet</li>
                <li><i className="bi bi-check-all"></i> Unidos somos mais fortes</li>
              </ul>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <p>
                Se aventure nesta missão, doe um equipamento que você não utiliza mais para quem realmente precisa.
              </p>
              <a href="#" className="btn-learn-more links">Saiba Mais</a>
            </div>
          </div>

        </div>

      </div>
    </main>


  )
}
