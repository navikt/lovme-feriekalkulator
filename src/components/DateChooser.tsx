import {
  RadioGroup,
  DatePicker,
  Radio,
  useRangeDatepicker,
  Select,
  Button,
  Heading,
} from "@navikt/ds-react";
import { subYears, startOfYear, addYears, endOfYear } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./DateChooser.css";
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
  const [differenceInDays, setDifferenceInDays] = useState<number>(0);
  const [land, setLand] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [EØS, setEØS] = useState<boolean>();
  const [formål, setFormål] = useState("Ferie");
  const [disabledDates, setDisabledDates] = useState<
    Array<{ from: Date; to: Date }>
  >([]);

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

  const daysBetweenDates = (from: Date, to: Date): Number => {
    var diff = Math.abs(from.getTime() - to.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    setDifferenceInDays(diffDays);

    return diffDays;
  };

  const { datepickerProps, toInputProps, fromInputProps, reset } =
    useRangeDatepicker({
      fromDate: initialStartDate,
      toDate: initialEndDate,
      disabled: disabledDates,
      onRangeChange: (selectedRange) => {
        console.log("here");
        if (
          selectedRange?.from !== undefined &&
          selectedRange?.to !== undefined
        ) {
          daysBetweenDates(selectedRange.from, selectedRange.to);
          setToDate(selectedRange.to);
          setFromDate(selectedRange.from);
        }
      },
    });

  useEffect(() => {
    setInitialStartDate(fiveYearsAgo);
    setInitialEndDate(twoYearsForward);
  }, []);

  // land, fraDato, tilDato, varighet, EØS, formål
  function handleSubmit(event: any) {
    event.preventDefault();
    let nyReise: Reise = {
      land: land,
      fraDato: fromDate ?? new Date(0), //TODO: Fjerne ved input sjekk
      tilDato: toDate ?? new Date(0), //TODO: Fjerne ved input sjekk
      varighet: differenceInDays,
      EØS: EØS ?? false,
      formål: formål,
    };
    const copy = [...data];
    copy.push(nyReise);
    setTableData(copy);

    addDisabledDates(fromDate ?? new Date(0), toDate ?? new Date(0));

    resetInputFields();
  }

  const addDisabledDates = (fromDate: Date, toDate: Date) => {
    const copy = [...disabledDates];
    copy.push({ from: fromDate, to: toDate });
    setDisabledDates(copy);
  };

  const resetInputFields = () => {
    setLand("");
    reset();
    setFromDate(undefined);
    setToDate(undefined);
    setDifferenceInDays(0);
    setEØS(undefined);
    setFormål("Ferie");
  };

  const handleEøsChange = (value: any) => {
    setEØS(value);
  };

  const handleFormålChange = (event: any) => {
    const target = event.target;
    setFormål(target.value);
  };

  return (
    <div className="card">
      <Heading level="1" size="xlarge">
        Feriekalkulator
      </Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <LandVelger valgtLand={land} setLand={setLand} />
        </div>
        <DatePicker {...datepickerProps} dropdownCaption>
          <div className="datepicker">
            <DatePicker.Input id="fraDato" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="tilDato" {...toInputProps} label="Til" />
          </div>
        </DatePicker>
        {differenceInDays >= 1 && (
          <div id="diffrenceDays">
            Du har vært {differenceInDays.toString()} dager i utlandet
          </div>
        )}

        <RadioGroup
          value={EØS}
          onChange={handleEøsChange}
          legend="Innenfor EØS?"
          id="EØS"
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>

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

        <Button variant="primary" type="submit">
          Legg til
        </Button>
      </form>
    </div>
  );
};

export default DateChooser;
