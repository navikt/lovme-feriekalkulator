import React from 'react';
import './App.css';
import DateChooser from './components/DateChooser';
import "@navikt/ds-css";
import Land from './components/Land';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <div className="dateChooser">
        <DateChooser></DateChooser>
      </div>
    </div>
  );
}

export default App;
