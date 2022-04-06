import React from 'react';
import './Styles/global.scss';
import { Header, Footer, Login } from './Components'
import { Home } from './Pages/Home'
import { Container } from './Components/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Equipamentos } from './Pages/Equipamentos';
import { Contatos } from './Pages/Contatos';
import { Time } from './Pages/Time';
import { Provider } from 'react-redux';
import { Store } from './Store/store';
import VLibras from "@djpfs/react-vlibras";
import { FormularioONG } from './Pages/FormularioONG';
import { FormularioDoador } from './Components/FormularioDoador';
import { Senha } from './Components/Senha';
import { Ongs } from './Pages/Ongs';
import { Config } from './Pages/Config';



function App() {
  return (
    <Container>
      <BrowserRouter>
        <Provider store={Store}>
          <Header />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Contatos />} path="/contatos" />
            <Route element={<Config />} path="/config" />
            <Route element={<Equipamentos methodForm='post' />} path="/equipamentos" />
            <Route element={<FormularioONG methodForm='post' />} path="/cadastro/ong" />
            <Route element={<FormularioDoador />} path="/cadastro/doador" />
            <Route element={<Ongs />} path="/ong" />
            <Route element={<Time />} path="/time" />
            <Route element={<Login />} path="/login" />
            <Route element={<Senha />} path="/alterarsenha" />
          </Routes>
          <Footer />
          <VLibras />
        </Provider>
      </BrowserRouter>

    </Container>
  );
}

export default App;
