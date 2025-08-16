import React from 'react';
import './App.css';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Header } from './components/Header';
import Container from '@mui/material/Container';
import { Main } from './components/Main';

const config = {
  supportedChains: [ChainId.Sepolia],
  readOnlyChainId: ChainId.Sepolia,
  readOnlyUrls: {
    [ChainId.Sepolia]: 'https://sepolia.infura.io/v3/761d2363bdb147f4babc971dd1a4c921'
  }
};
function App() {
  return (
    <DAppProvider config={config} >
      <Header />
      <Container maxWidth='md'>
        Hi
      </Container>
      <Main />
    </DAppProvider>
  );
}

export default App;
