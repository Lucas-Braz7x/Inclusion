import React from 'react';
import './Styles/global.scss';
import { Header, Footer } from './Components'
import { Home } from './Pages/Home'
import { Container } from './Components/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Equipamentos } from './Pages/Equipamentos';
import { Contatos } from './Pages/Contatos';
import { Time } from './Pages/Time';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Contatos />} path="/contatos" />
          <Route element={<Equipamentos />} path="/equipamentos" />
          <Route element={<Time />} path="/time" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
