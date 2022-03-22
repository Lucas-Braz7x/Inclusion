import React, { useEffect, useState } from 'react';
import { api } from '../../Service/index';
import './styles.scss';

export const Ongs = () => {
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    getData();
  })

  const getData = async () => {
    const data = await api.get("/ong").then(response => response.data);
    setDataArray(data);
  }
  return (
    <main>

      {dataArray.length > 0 &&
        <div className='container'>
          <div className="ongContainer">
            {dataArray.map((ong, indice) => (
              <div className='ongContent' key={indice}>
                <div >
                  <h1>{ong.nomeOng}</h1>

                </div>
                <div>
                  <p>Email: {ong.email}</p>
                  <p>Contato: {ong.telefone}</p>
                </div>
                <div>
                  <p>Endereço: {ong.endereco} - {ong.estado} - {ong.cep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      <h1>ONGS</h1>
    </main>
  )
}
