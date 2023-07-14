import "@navikt/ds-css";
import React, { useState } from "react";
import "./App.css";
import DateChooser from "./components/DateChooser";
import JourneyTable from "./components/JourneyTable";
import { Travel } from "./models/Travel";
import { VisualTimeline } from "./components/VisualTimeline";

function App() {
  const [tableData, setTableData] = useState<Array<Travel>>([]);

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
