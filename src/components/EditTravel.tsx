import React, { useState } from "react";
import CountryChooser from "./CountryChooser";
import { CustomDatePicker } from "./CustomDatePicker";
import { Travel } from "../models/Travel";
import { Purpose } from "./Purpose";

export const EditTravel = ({
  savedTravels,
}: {
  savedTravels: Array<Travel>;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [country, setCountry] = useState("");
  const [EEA, setEEA] = useState<boolean>(false);
  const [purpose, setPurpose] = useState("Ferie");

  console.log(EEA);
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

      <Purpose purpose={purpose} setPurpose={setPurpose} />
    </div>
  );
};
