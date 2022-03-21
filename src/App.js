import React from 'react';
import './Styles/global.scss';
import { Header, Footer } from './Components'
import { Home } from './Pages/Home'
import { Container } from './Components/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Equipamentos } from './Pages/Equipamentos';
import { Contatos } from './Pages/Contatos';
import { Time } from './Pages/Time';
import { Provider } from 'react-redux';
import { Store } from './Store/store';
import { Cadastro } from './Pages/Cadastro';
import VLibras from "@djpfs/react-vlibras";


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Provider store={Store}>
          <Header />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Contatos />} path="/contatos" />
            <Route element={<Equipamentos />} path="/equipamentos" />
            <Route element={<Cadastro />} path="/cadastro" />
            <Route element={<Time />} path="/time" />
          </Routes>
          <Footer />
          <VLibras />
        </Provider>
      </BrowserRouter>

    </Container>
  );
}

export default App;
