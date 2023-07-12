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
import { Reise } from "../models/Reise";
import LandVelger from "./LandVelger";

const DateChooser = ({
  data,
  setTableData,
}: {
  data: Array<Reise>;
  setTableData: Dispatch<SetStateAction<Array<Reise>>>;
}) => {
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [land, setLand] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [EØS, setEØS] = useState<boolean>(false);
  const [formål, setFormål] = useState("Ferie");

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
        from: travel.fraDato,
        to: travel.tilDato,
      })),
      onRangeChange: (selectedRange) => {
        if (
          selectedRange?.from !== undefined &&
          selectedRange?.to !== undefined
        ) {
          setToDate(selectedRange.to);
          setFromDate(selectedRange.from);
        }
      },
    });

  useEffect(() => {
    setInitialStartDate(fiveYearsAgo());
    setInitialEndDate(twoYearsForward());
    const dataString = sessionStorage.getItem("tableData");
    const listeAvData: Array<Reise> = dataString ? JSON.parse(dataString) : [];
    setTableData(
      listeAvData.map((data) => ({
        ...data,
        tilDato: new Date(data.tilDato),
        fraDato: new Date(data.fraDato),
      }))
    );
  }, [setTableData]);

  function handleSubmit(event: any) {
    event.preventDefault();

    let nyReise: Reise = {
      id: Date.now(),
      land: land,
      fraDato: fromDate ?? new Date(0), //TODO: Fjerne ved input sjekk
      tilDato: toDate ?? new Date(0), //TODO: Fjerne ved input sjekk
      EØS: EØS ?? false,
      formål: formål,
    };
    const copy = [...data];
    copy.push(nyReise);
    setTableData(copy);
    sessionStorage.setItem("tableData", JSON.stringify(copy));

    resetInputFields();
  }

  const resetInputFields = () => {
    setLand("");
    reset();
    setFromDate(undefined);
    setToDate(undefined);
    setEØS(false);
    setFormål("Ferie");
  };

  const handleFormålChange = (event: any) => {
    setFormål(event.target.value);
  };

  return (
    <div className="card">
      <Heading level="1" size="xlarge">
        Feriekalkulator
      </Heading>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <LandVelger valgtLand={land} setLand={setLand} setEØS={setEØS} />
        </div>
        <DatePicker {...datepickerProps} dropdownCaption>
          <div className="datepicker">
            <DatePicker.Input id="fraDato" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="tilDato" {...toInputProps} label="Til" />
          </div>
        </DatePicker>
        {fromDate && toDate && (
          <div id="diffrenceDays">
            Du har vært{" "}
            {formatDuration({
              days: differenceInCalendarDays(toDate, fromDate),
            })}{" "}
            i utlandet
          </div>
        )}

        <Select
          className="dropdown"
          id="formål"
          value={formål}
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
