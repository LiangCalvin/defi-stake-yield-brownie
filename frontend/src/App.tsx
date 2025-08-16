import React from 'react';
import './App.css';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Header } from './components/Header';
import Container from '@mui/material/Container';
import { Main } from './components/Main';

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Sepolia]
    }} >
      <Header />
      <Container maxWidth='md'>
        Hi
      </Container>
      <Main />
    </DAppProvider>
  );
}

export default App;
