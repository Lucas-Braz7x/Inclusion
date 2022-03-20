import React from 'react';
import './styles.scss';
import { EquipamentoCard } from '../../Components/EquipamentoCard';
import { FormularioEquipamento } from '../../Components/FormularioEquipamento';
export const Equipamentos = () => {

  return (
    <main>
      <FormularioEquipamento />
      <section id="portfolio" className="portfolio">
        <div className="container">

          <div className="section-title">

            <h2>Equipamentos</h2>
            <p>Aqui estão nossos equipamentos para doações</p>
          </div>

          <ul id="portfolio-flters" className="d-flex justify-content-center">
            <li data-filter="*" className="filter-active">Todos</li>
            <li data-filter=".filter-visual">Visual</li>
            <li data-filter=".filter-auditivo">Auditivo</li>
            <li data-filter=".filter-motor">Motor</li>
            <li data-filter=".filter-cognitivo">Cognitivo</li>
            <li data-filter=".filter-neurologico">Neurológico</li>
            <li data-filter=".filter-new">Recentes</li>
          </ul>

          <div className="row portfolio-container">
            <EquipamentoCard filtro="filter-motor" />
          </div>

        </div>
      </section>
    </main>
  )
}


