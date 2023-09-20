import React, { Dispatch, SetStateAction, useState } from "react";
import { CustomDatePicker } from "../CustomDatePicker";
import { Travel } from "../../models/Travel";
import { Purpose } from "../Purpose";
import { Button, Heading } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";
import { CountryChooser } from "../CountryChooser";

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
    <div
      id="EditTravel-container"
      className="w-[36rem] bg-white flex p-10 items-center flex-col gap-5 self-stretch"
    >
      <Heading level="1" size="xlarge">
        Endre reise
      </Heading>
      <div className="w-full flex flex-col gap-5">
        <CountryChooser
          chosenCountry={country}
          setCountry={setCountry}
          setEEA={setEEA}
          countryError={country ? false : true}
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
          startDateError={startDate ? false : true}
          endDateError={endDate ? false : true}
        />

        <Purpose purpose={purpose} setPurpose={setPurpose} />
        <div className="gap-5 flex flex-row justify-between">
          <Button
            className="basis-2/5"
            onClick={() => {
              const newTravel: Travel = {
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
              editFunction(newTravel, savedTravels, indexToPutTravel);
              setOpen(false);
            }}
          >
            Lagre endringer
          </Button>
          <Button
            className="basis-1/3"
            variant="danger"
            onClick={() => {
              editFunction(travelToEdit, savedTravels, indexToPutTravel);
              setOpen(false);
            }}
          >
            Avbryt
          </Button>
        </div>
      </div>
    </div>
  );
};
