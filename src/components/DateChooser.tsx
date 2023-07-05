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
import Land from "./Land";

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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [EØS, setEØS] = useState(Boolean);
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

  const daysBetweenDates = (from: Date, to: Date): Number => {
    var diff = Math.abs(from.getTime() - to.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log("Difference in days", diffDays);
    setDifferenceInDays(diffDays);
    return diffDays;
  };

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: initialStartDate,
    toDate: initialEndDate,
    onRangeChange: (selectedRange) => {
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
      fraDato: fromDate,
      tilDato: toDate,
      varighet: differenceInDays,
      EØS: EØS,
      formål: formål,
    };
    const copy = [...data];
    copy.push(nyReise);
    setTableData(copy);

    resetInputFields();
  }

  const resetInputFields = () => {
    setLand("");
    setFromDate(new Date());
    setToDate(new Date());
    setDifferenceInDays(0);
    setEØS(Boolean);
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
          <Land land={land} setLand={setLand} />
        </div>
        <DatePicker {...datepickerProps} dropdownCaption>
          <div className="datepicker">
            <DatePicker.Input id="fraDato" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="tilDato" {...toInputProps} label="Til" />
          </div>
        </DatePicker>
        <div>Du har vært {differenceInDays.toString()} dager i utlandet</div>

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
