import React, { useState } from "react";
import CountryChooser from "./CountryChooser";
import { CustomDatePicker } from "./CustomDatePicker";
import { Travel } from "../models/Travel";

export const EditTravel = ({savedTravels}: {savedTravels: Array<Travel>} ) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [country, setCountry] = useState("");
  const [EEA, setEEA] = useState<boolean>(false);

  return (
    <div>
      <CountryChooser
        chosenCountry={country}
        setCountry={setCountry}
        setEEA={setEEA}
      />

      <CustomDatePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        savedTravels={savedTravels}
      />
    </div>
  );
};
