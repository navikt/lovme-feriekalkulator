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
  data,
  setTableData,
}: {
  data: Array<Travel>;
  setTableData: Dispatch<SetStateAction<Array<Travel>>>;
}) => {
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [EEA, setEEA] = useState<boolean>(false);
  const [purpose, setPurpose] = useState("Ferie");

  const fiveYearsAgo = () => {
    const today = new Date();
    const fiveYearsAgo = subYears(today, 5);
    const firstOfJanuary = startOfYear(fiveYearsAgo);

    return firstOfJanuary;
  };

  const twoYearsForward = () => {
    const today = new Date();
    const twoForward = addYears(today, 2);
    const lastOfDecember = endOfYear(twoForward);

    return lastOfDecember;
  };

  const { datepickerProps, toInputProps, fromInputProps, reset } =
    useRangeDatepicker({
      fromDate: initialStartDate,
      toDate: initialEndDate,
      disabled: data.map((travel) => ({
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
    const dataString = sessionStorage.getItem("tableData");
    const listeAvData: Array<Travel> = dataString ? JSON.parse(dataString) : [];
    setTableData(
      listeAvData.map((data) => ({
        ...data,
        tilDato: new Date(data.endDate),
        fraDato: new Date(data.startDate),
      }))
    );
  }, [setTableData]);

  function handleSubmit(event: any) {
    event.preventDefault();

    let nyReise: Travel = {
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
    const copy = [...data];
    copy.push(nyReise);
    setTableData(copy);
    sessionStorage.setItem("tableData", JSON.stringify(copy));

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

  const handleFormålChange = (event: any) => {
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
            <DatePicker.Input id="fraDato" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="tilDato" {...toInputProps} label="Til" />
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
          onChange={handleFormålChange}
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
