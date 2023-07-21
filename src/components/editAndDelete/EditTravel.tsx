import React, { Dispatch, SetStateAction, useState } from "react";
import CountryChooser from "../CountryChooser";
import { CustomDatePicker } from "../CustomDatePicker";
import { Travel } from "../../models/Travel";
import { Purpose } from "../Purpose";
import { Button, Heading } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";

export const EditTravel = ({
  savedTravels,
  travelToEdit,
  setOpen,
  indexToPutTravel,
  editFunction,
}: {
  savedTravels: Array<Travel>;
  travelToEdit: Travel;
  setOpen: Dispatch<SetStateAction<boolean>>;
  indexToPutTravel: number;
  editFunction: Function;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    travelToEdit.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    travelToEdit.endDate
  );
  const [country, setCountry] = useState(travelToEdit.country);
  const [EEA, setEEA] = useState<boolean>(travelToEdit.EEA);
  const [purpose, setPurpose] = useState(travelToEdit.purpose);

  return (
    <div className=" flex flex-col items-start gap-5">
      <Heading level="1" size="xlarge">
        Endre reise
      </Heading>

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
        selectedDates={{
          from: startDate ?? new Date(),
          to: endDate ?? new Date(),
        }}
      />

      <Purpose purpose={purpose} setPurpose={setPurpose} />
      <Button
        onClick={() => {
          var newTravel: Travel = {
            id: Date.now(),
            country: country,
            startDate: startDate ?? new Date(0), //TODO: Fjerne ved input sjekk
            endDate: endDate ?? new Date(0), //TODO: Fjerne ved input sjekk
            EEA: EEA ?? false,
            purpose: purpose,
            duration: differenceInCalendarDays(
              endDate ?? new Date(0),
              startDate ?? new Date(0)
            ),
          };
          editFunction( newTravel ,savedTravels ,indexToPutTravel)
          setOpen(false);
        }}
      >
        Lagre endringer
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          setOpen(false);
        }}
      >
        Avbryt
      </Button>
    </div>
  );
};
