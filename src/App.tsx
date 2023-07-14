import "@navikt/ds-css";
import React, { useState } from "react";
import "./App.css";
import DateChooser from "./components/DateChooser";
import JourneyTable from "./components/JourneyTable";
import { Travel } from "./models/Travel";
import { VisualTimeline } from "./components/VisualTimeline";

function App() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);

  return (
    <div className="App">
      <header className="App-header" />

      <div className="dateChooser">
        <DateChooser savedTravels={savedTravels} setSavedTravels={setSavedTravels} />
      </div>

      <div className="table">
        <JourneyTable savedTravels={savedTravels} setSavedTravels={setSavedTravels} />
      </div>

      <div className="timeline">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}

export default App;
