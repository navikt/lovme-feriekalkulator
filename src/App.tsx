import React from 'react';
import './App.css';
import DateChooser from './components/DateChooser';
import "@navikt/ds-css";
import JourneyTable from './components/JourneyTable';
import JourneyTableJava from './components/JourneyTableJava';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <div className="dateChooser">
        <DateChooser></DateChooser>
      </div>

      <div>
        <JourneyTable></JourneyTable>
      </div>

      <div>
        <JourneyTableJava></JourneyTableJava>
      </div>
    </div>
  );
}

export default App;
