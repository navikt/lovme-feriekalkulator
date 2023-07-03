import { RadioGroup, DatePicker, Radio, useRangeDatepicker, Select, Button, Heading, Dropdown,  } from "@navikt/ds-react";
import { subYears, startOfYear, addYears, endOfYear } from 'date-fns';
import { useContext, useEffect, useState } from "react";
import "./DateChooser.css"
import Land from "./Land";
import { Reise } from "../models/Reise";

const DateChooser = () => {

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  // TODO: Display disse til bruker
  const [differenceInDays, setDifferenceInDays] = useState<number>(0);
  

  const fiveYearsAgo = () => {
    const today = new Date();
    const fiveYearsAgo = subYears(today, 5);
  
    const firstOfJanuary = startOfYear(fiveYearsAgo);

    return firstOfJanuary;
  }

  const twoYearsForward = () => {
    const today = new Date();
    const twoForward = addYears(today, 2);

    const lastOfDecember = endOfYear(twoForward);
    return lastOfDecember;
  }

  const daysBetweenDates = (from: Date, to:Date) : Number => {

    var diff = Math.abs(from.getTime() - to.getTime());
    var diffDays = Math.ceil(diff/ (1000*3600*24));
    console.log("Difference in days", diffDays);
    setDifferenceInDays(diffDays);
    return diffDays;
  } 


  const { datepickerProps, toInputProps, fromInputProps } =
    useRangeDatepicker({
      fromDate: fromDate,
      toDate: toDate, 
      onRangeChange: (selectedRange) => {
   
        if (selectedRange?.from !== undefined && selectedRange?.to !== undefined) {
          daysBetweenDates(selectedRange.from, selectedRange.to);
          console.log(differenceInDays);
          console.log(fromDate, toDate)
        }
      }, 
    });
    
   useEffect(() => {
    setFromDate(fiveYearsAgo)
    setToDate(twoYearsForward)
   }, [])  

   const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //adde input til liste
    console.log("hei")
    const nyReise: Reise = {
      land: "Japan",
      fraDato: new Date(),
      tilDato: new Date(),
      varighet: 40,
      EØS: false,
      formål: "Jobb"
    }
    
    }

  return (
    <div className="card">
      <Heading level="1" size="xlarge">
      Feriekalkulator
    </Heading>
    <form onSubmit={handleSubmit}>
      <div>
        <Land></Land>
      </div>
      <DatePicker {...datepickerProps} dropdownCaption >
        <div className="datepicker">
          <DatePicker.Input {...fromInputProps} label="Fra"/>
          <DatePicker.Input {...toInputProps} label="Til"/>
        </div>
      </DatePicker>
      <div>Du har vært {differenceInDays.toString()} dager i utlandet</div>

      <RadioGroup legend="Innenfor EØS?">
        <Radio value="Ja">Ja</Radio>
        <Radio value="Nei">Nei</Radio>
      </RadioGroup>

      <Select className="dropdown" label="Formål med reisen?">
        <option value="Velg formål">Velg formål</option>
        <option value="ferie">Ferie</option>
        <option value="jobb">Jobb</option>
        <option value="annet">Annet</option>
      </Select>

      <Button variant="primary" type="submit" >Legg til</Button>
      </form>

    </div>
  );
}



export default DateChooser;