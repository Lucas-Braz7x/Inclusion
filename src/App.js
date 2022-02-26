import React from 'react';
import './Styles/global.css';
import { Header, Footer } from './Components'
import { Home } from './Pages/Home'
import { Container } from './Components/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Equipamentos } from './Pages/Equipamentos';
import { Contatos } from './Pages/Contatos';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Equipamentos />} path="/equipamentos" />
          <Route element={<Contatos />} path="/contatos" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
