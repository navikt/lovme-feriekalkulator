import { DatePicker, useRangeDatepicker,  } from "@navikt/ds-react";
import { format, subYears, startOfYear, addYears, endOfYear } from 'date-fns';
import { useEffect, useState } from "react";

const DateChooser = () => {

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [diffDays, setDiffDays] = useState(0);
 // Trenger kansje ikke denne
  const [newDate, setNewDate] = useState(new Date());

  const fiveYearsAgo = () => {
    const today = new Date();
    const fiveYearsAgo = subYears(today, 5);
  
    const firstOfJanuary = startOfYear(fiveYearsAgo);

    console.log("FraDato :", firstOfJanuary);

    return firstOfJanuary;
  }

  const twoYearsForward = () => {
    const today = new Date();
    const twoForward = addYears(today, 2);

    const lastOfDecember = endOfYear(twoForward);
    const formattedLastOfDecember = format(lastOfDecember, 'yyyy-MM-dd');
    console.log(formattedLastOfDecember);

    return lastOfDecember;
  }

  const dateDifference = () => {
    var diff = Math.abs(fromDate.getTime() - toDate.getTime());
    var diffDays = Math.ceil(diff/ (1000*3600*24));
    console.log("Difference in days", diffDays);
    return diffDays;
  } 


  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: fromDate,
      toDate: toDate, 
      onRangeChange: () => {
        setDiffDays(dateDifference)
      }, 
      
    });
    
   useEffect(() => {
    setFromDate(fiveYearsAgo)
    setToDate(twoYearsForward)
   }, [])  
 

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps} dropdownCaption >
        <div className="flex flex-wrap justify-center gap-4">
          <DatePicker.Input {...fromInputProps} label="Fra"/>
          <DatePicker.Input {...toInputProps} label="Til"/>
        </div>
      </DatePicker>
      {selectedRange && (
        <div className="pt-4">
          <div>{selectedRange?.from && selectedRange.from.toDateString()}</div>
          <div>{selectedRange?.to && selectedRange.to.toDateString()}</div>
          <div></div>
        </div>
      )}
    </div>
  );
}



export default DateChooser;