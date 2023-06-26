import React from 'react';
import './App.css';
import Dato from './components/Dato';
import "@navikt/ds-css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="kalkulator">
        <Dato></Dato>
      </div>
    </div>
  );
}

export default App;
