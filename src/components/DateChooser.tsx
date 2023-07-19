import { Button, Heading } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Travel } from "../models/Travel";
import CountryChooser from "./CountryChooser";
import { CustomDatePicker } from "./CustomDatePicker";
import { Purpose } from "./Purpose";

const DateChooser = ({
  savedTravels,
  setSavedTravels,
}: {
  savedTravels: Array<Travel>;
  setSavedTravels: Dispatch<SetStateAction<Array<Travel>>>;
}) => {
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [EEA, setEEA] = useState<boolean>(false);
  const [purpose, setPurpose] = useState("Ferie");
  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    const dataString = sessionStorage.getItem("savedTravels");
    const savedTravels: Array<Travel> = dataString
      ? JSON.parse(dataString)
      : [];
    setSavedTravels(
      savedTravels.map((travel) => ({
        ...travel,
        endDate: new Date(travel.endDate),
        startDate: new Date(travel.startDate),
      }))
    );
  }, [setSavedTravels]);

  function handleSubmit(event: any) {
    event.preventDefault();

    let newTravel: Travel = {
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
    const copy = [...savedTravels];
    copy.push(newTravel);
    setSavedTravels(copy);
    sessionStorage.setItem("savedTravels", JSON.stringify(copy));

    resetInputFields();
  }

  const resetInputFields = () => {
    setCountry("");
    setStartDate(undefined);
    setEndDate(undefined);
    setEEA(false);
    setPurpose("Ferie");
    if (datePickerRef.current && datePickerRef.current.reset) {
      datePickerRef.current.reset();
      console.log("DateChooser kjørte reset");
    }
  };

  const handlePurposeChange = (event: any) => {
    setPurpose(event.target.value);
  };

  const handleDeleteAll = () => {
    setSavedTravels([]);
    sessionStorage.clear();
  };

  return (
    <div className="bg-[var(--a-white)] flex p-20 items-start flex-col gap-5 self-stretch">
      <Heading level="1" size="xlarge">
        Feriekalkulator
      </Heading>
      <form className="flex flex-col items-start gap-5" onSubmit={handleSubmit}>
        <div>
          <CountryChooser
            chosenCountry={country}
            setCountry={setCountry}
            setEEA={setEEA}
          />
        </div>
        <CustomDatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          ref={datePickerRef}
          savedTravels={savedTravels}
        />

        <Purpose purpose={purpose}
                 handlePurposeChange={handlePurposeChange} 
                 />

        <Button className="leggtil" variant="primary" type="submit">
          Legg til
        </Button>
      </form>

      <Button className="" variant="danger" onClick={handleDeleteAll}>
        Slett tabell
      </Button>
    </div>
  );
};

export default DateChooser;
