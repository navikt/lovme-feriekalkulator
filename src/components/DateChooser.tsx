import "./DateChooser.css";
import {
  DatePicker,
  useRangeDatepicker,
  Select,
  Button,
  Heading,
} from "@navikt/ds-react";
import {
  subYears,
  startOfYear,
  addYears,
  endOfYear,
  differenceInCalendarDays,
  formatDuration,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Travel } from "../models/Travel";
import CountryChooser from "./CountryChooser";

const DateChooser = ({
  savedTravels,
  setSavedTravels,
}: {
  savedTravels: Array<Travel>;
  setSavedTravels: Dispatch<SetStateAction<Array<Travel>>>;
}) => {
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [EEA, setEEA] = useState<boolean>(false);
  const [purpose, setPurpose] = useState("Ferie");

  const fiveYearsAgo = () => {
    const todaysDate = new Date();
    const dateFiveYearsAgo = subYears(todaysDate, 5);
    const firstOfJanuarysDate = startOfYear(dateFiveYearsAgo);

    return firstOfJanuarysDate;
  };

  const twoYearsForward = () => {
    const todaysDate = new Date();
    const twoYearsForwardDate = addYears(todaysDate, 2);
    const lastOfDecembersDate = endOfYear(twoYearsForwardDate);

    return lastOfDecembersDate;
  };

  const { datepickerProps, toInputProps, fromInputProps, reset } =
    useRangeDatepicker({
      fromDate: initialStartDate,
      toDate: initialEndDate,
      disabled: savedTravels.map((travel) => ({
        from: travel.startDate,
        to: travel.endDate,
      })),
      onRangeChange: (selectedRange) => {
        if (
          selectedRange?.from !== undefined &&
          selectedRange?.to !== undefined
        ) {
          setEndDate(selectedRange.to);
          setStartDate(selectedRange.from);
        }
      },
    });

  useEffect(() => {
    setInitialStartDate(fiveYearsAgo());
    setInitialEndDate(twoYearsForward());
    const dataString = sessionStorage.getItem("savedTravels");
    const savedTravels: Array<Travel> = dataString ? JSON.parse(dataString) : [];
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
    reset();
    setStartDate(undefined);
    setEndDate(undefined);
    setEEA(false);
    setPurpose("Ferie");
  };

  const handlePurposeChange = (event: any) => {
    setPurpose(event.target.value);
  };

  return (
    <div className="card">
      <Heading level="1" size="xlarge">
        Feriekalkulator
      </Heading>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <CountryChooser chosenCountry={country} setLand={setCountry} setEØS={setEEA} />
        </div>
        <DatePicker {...datepickerProps} dropdownCaption>
          <div className="datepicker">
            <DatePicker.Input id="startDate" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="endDate" {...toInputProps} label="Til" />
          </div>
        </DatePicker>
        {startDate && endDate && (
          <div id="diffrenceDays">
            Du har vært{" "}
            {formatDuration({
              days: differenceInCalendarDays(endDate, startDate),
            })}{" "}
            i utlandet
          </div>
        )}

        <Select
          className="dropdown"
          id="formål"
          value={purpose}
          label="Formål med reisen?"
          onChange={handlePurposeChange}
        >
          <option value="Ferie">Ferie</option>
          <option value="Jobb">Jobb</option>
          <option value="Annet">Annet</option>
        </Select>

        <Button className="leggtil" variant="primary" type="submit">
          Legg til
        </Button>
      </form>
    </div>
  );
};

export default DateChooser;
