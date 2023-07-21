import { Button, Heading } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Travel } from "../models/Travel";
import { CustomDatePicker } from "./CustomDatePicker";
import { Purpose } from "./Purpose";
import { ComboBox } from "./ComboBox";
import { ParasolBeachIcon } from "@navikt/aksel-icons";

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

  const handleDeleteAll = () => {
    setSavedTravels([]);
    sessionStorage.clear();
  };

  return (
    <div id="datechooser-container" className="">
      <div id="icon-container" className="top-8 justify-center relative flex">
        <ParasolBeachIcon
          title="a11y-title"
          className="bg-orange-200 rounded-full w-16 h-16 p-1 top-0 "
        />
      </div>
      <div
        id="form-container"
        className="bg-[var(--a-white)] flex p-16 items-center flex-col gap-5 self-stretch"
      >
        <Heading level="1" size="xlarge">
          Feriekalkulator
        </Heading>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <ComboBox
              chosenCountry={country}
              setCountry={setCountry}
              setEEA={setEEA}
            ></ComboBox>
          </div>
          <CustomDatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            ref={datePickerRef}
            savedTravels={savedTravels}
          />

          <Purpose purpose={purpose} setPurpose={setPurpose} />

          <div className="gap-5 flex flex-row justify-between">
            <Button className="basis-1/3" variant="primary" type="submit">
              Legg til
            </Button>
            <Button
              className="basis-1/3"
              variant="danger"
              onClick={handleDeleteAll}
              type="button"
            >
              Slett tabell
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateChooser;
