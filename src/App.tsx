import "@navikt/ds-css";
import React, { useState } from "react";
import "./App.css";
import DateChooser from "./components/DateChooser";
import JourneyTable from "./components/JourneyTable";
import { Reise } from "./models/Reise";
import { VisualTimeline } from "./components/VisualTimeline";

function App() {
  const [tableData, setTableData] = useState<Array<Reise>>([]);

  return (
    <div className="App">
      <header className="App-header" />

      <div className="dateChooser">
        <DateChooser data={tableData} setTableData={setTableData} />
      </div>

      <div className="table">
        <JourneyTable data={tableData} setTableData={setTableData} />
      </div>

      <div className="timeline">
        <VisualTimeline data={tableData}></VisualTimeline>
      </div>
    </div>
  );
}

export default App;
