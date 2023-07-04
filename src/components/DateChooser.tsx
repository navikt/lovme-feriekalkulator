import { RadioGroup, DatePicker, Radio, useRangeDatepicker, Select, Button, Heading} from "@navikt/ds-react";
import { subYears, startOfYear, addYears, endOfYear } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./DateChooser.css"
import { Reise } from "../models/Reise";
import Land from "./Land";

const DateChooser = ({ data, setTableData } : { data: Array<Reise>, setTableData: Dispatch<SetStateAction<Array<Reise>>>}) => {
  
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
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

   // land, fraDato, tilDato, varighet, EØS, formål
   function handleSubmit(event: any) {

    event.preventDefault();

    const target = event.target;

    let nyReise: Reise = {
      land: target.land.value,
      fraDato: target.fraDato.value,
      tilDato: target.tilDato.value,
      varighet: differenceInDays,
      EØS: target.EØS.value,
      formål: target.formål.value
    }
      const copy = [...data];
      copy.push(nyReise);
      setTableData(copy);
      console.log(setTableData);
    }

  return (
    <div className="card">
      <Heading level="1" size="xlarge">
      Feriekalkulator
    </Heading>
    <form onSubmit={handleSubmit}>
      <div>
        <Land/>
      </div>
      <DatePicker {...datepickerProps} dropdownCaption >
        <div className="datepicker">
          <DatePicker.Input id="fraDato" {...fromInputProps} label="Fra"/>
          <DatePicker.Input id="tilDato" {...toInputProps} label="Til"/>
        </div>
      </DatePicker>
      <div>Du har vært {differenceInDays.toString()} dager i utlandet</div>

      <RadioGroup legend="Innenfor EØS?" id="EØS">
        <Radio value="Ja">Ja</Radio>
        <Radio value="Nei">Nei</Radio>
      </RadioGroup>

      <Select className="dropdown" id="formål" label="Formål med reisen?">
        <option value="Velg formål">Velg formål</option>
        <option value="Ferie">Ferie</option>
        <option value="Jobb">Jobb</option>
        <option value="Annet">Annet</option>
      </Select>

      <Button variant="primary" type="submit" >Legg til</Button>
      </form>

    </div>
  );
}



export default DateChooser;