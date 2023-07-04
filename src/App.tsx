import React, { useState } from 'react';
import './App.css';
import DateChooser from './components/DateChooser';
import "@navikt/ds-css";
import JourneyTable from './components/JourneyTable';
import { Reise } from './models/Reise';

function App() {
  const [tableData, setTableData] = useState<Array<Reise>>([]);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <div className="dateChooser">
        <DateChooser data={tableData} setTableData={setTableData}/>
      </div>

      <div>
      <JourneyTable data={tableData}/>
      </div>

      
    </div>
  );
}

export default App;
