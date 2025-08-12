import React from 'react';
import './App.css';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Header } from './components/Header';
function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Sepolia]
    }} >
      <div>
        <Header />
      </div>
    </DAppProvider>
  );
}

export default App;
