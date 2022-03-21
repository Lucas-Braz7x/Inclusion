import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { EquipamentoCard } from '../../Components';
import { api } from '../../Service';
import { Modal } from '../../Components/UI/Modal';

export const Equipamentos = () => {
  const [data, setData] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterEquipamento, setFilterEquipamento] = useState('');

  useEffect(() => {
    getContent();
    setFilterData(data);
  }, [])

  useEffect(() => {

    if (filterEquipamento) {
      const filterDataArray = data.filter((equipamento) => equipamento.tipoDeficiencia === filterEquipamento)
      setFilterData(filterDataArray)
    } else {
      setFilterData(data);
    }

  }, [filterEquipamento])

  useEffect(() => {
    console.log(modalOpened)
  }, [modalOpened])


  const getContent = useCallback(async () => {
    await api.get("/equipamento").then(async (response) => { setFilterData(response.data), setData(response.data) })
  });

  const handleOpenModal = () => setModalOpened(true);

  return (
    <>
      <main>
        <section id="portfolio" className="portfolio">
          <div className="container">

            <div className="section-title">
              <button onClick={() => setModalOpened(!modalOpened)}>Mudar</button>
              <h2>Equipamentos</h2>
              <p>Aqui estão nossos equipamentos para doações</p>
            </div>

            <ul id="portfolio-flters" className="d-flex justify-content-center">
              <li
                onClick={() => setFilterEquipamento('')}
                data-filter="*"
                className={filterEquipamento === '' ? "filter-active" : ''}>
                Todos
              </li>
              <li
                onClick={() => setFilterEquipamento('visual')}
                data-filter=".filter-visual">
                Visual
              </li>
              <li
                onClick={() => setFilterEquipamento('auditivo')}
                data-filter=".filter-auditivo">
                Auditivo
              </li>
              <li
                onClick={() => setFilterEquipamento('motor')}
                data-filter=".filter-motor">
                Motor
              </li>
              <li onClick={() => setFilterEquipamento('cognitivo')}
                data-filter=".filter-cognitivo">Cognitivo</li>

              <li onClick={() => setFilterEquipamento('neurologico')}
                data-filter=".filter-neurologico">Neurológico</li>
            </ul>

            <div className="row portfolio-container">
              {filterData.map((equipamento, indice) => (
                <EquipamentoCard
                  key={indice}
                  handleOpenModal={handleOpenModal}
                  equipamento={equipamento}
                  filtro={`filter-${filterEquipamento}`} />))}

            </div>

          </div>
        </section>
      </main>
      <Modal
        open={modalOpened}
        onClose={() => setModalOpened(!modalOpened)}
      ><>
          <h1>Lucas</h1><h2>Braz</h2>
        </></Modal>
    </>
  )
}


