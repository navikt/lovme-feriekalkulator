import React from 'react';
import './App.css';
import Dato from './components/Dato';
import "@navikt/ds-css";
import Land from './components/Land';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="kalkulator">
        <Land></Land>
      </div>
      
      <div className="kalkulator">
        <Dato></Dato>
      </div>
    </div>
  );
}

export default App;
