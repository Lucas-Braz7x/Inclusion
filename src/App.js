import React from 'react';
import './Styles/global.scss';
import { Header, Footer } from './Components'
import { Home } from './Pages/Home'
import { Container } from './Components/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Equipamentos } from './Pages/Equipamentos';
import { Contatos } from './Pages/Contatos';
import { Time } from './Pages/Time';
import { Login } from './Pages/Login';
import { Provider } from 'react-redux';
import { Store } from './Store/store';

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
            <Route element={<Login />} path="/login" />
            <Route element={<Time />} path="/time" />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
