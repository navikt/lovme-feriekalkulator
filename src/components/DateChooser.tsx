import { DatePicker, useRangeDatepicker,  } from "@navikt/ds-react";
import { format, subYears, startOfYear, addYears, endOfYear, getDayOfYear, getISODay, Interval, subDays, intervalToDuration } from 'date-fns';
import { useEffect, useState } from "react";

const DateChooser = () => {

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [diffDays, setDiffDays] = useState<Number>(0);
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

  // TODO: Håndtere skuddår?
  const daysBetweenDates = (from: Date, to:Date) : Number => {

    var diff = Math.abs(from.getTime() - to.getTime());
    var diffDays = Math.ceil(diff/ (1000*3600*24));
    console.log("Difference in days", diffDays);
    return diffDays;
  } 


  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: fromDate,
      toDate: toDate, 
      onRangeChange: (selectedRange) => {
        /*
        if (selectedRange?.from !== undefined) {
          setFromDate(selectedRange?.from);
        }
        if (selectedRange?.to !== undefined) {
          setToDate(selectedRange?.to);
        }
        */
        if (selectedRange?.from !== undefined && selectedRange?.to !== undefined) {
          setDiffDays(daysBetweenDates(selectedRange.from, selectedRange.to));
        }
      }, 
    });

    /* FJERNES SENERE
    function dateDiff(startingDate: Date, endingDate: Date) {
      
      if ((!endingDate || !startingDate) || startingDate > endingDate) {
        return -1;
      }
      
      let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
      let endDate = new Date(new Date(endingDate).toISOString().substr(0, 10));
      const startYear = startDate.getFullYear();
      const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
      const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
      let yearDiff = endDate.getFullYear() - startYear;
      let monthDiff = endDate.getMonth() - startDate.getMonth();
      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }
      let dayDiff = endDate.getDate() - startDate.getDate();
      if (dayDiff < 0) {
        if (monthDiff > 0) {
          monthDiff--;
        } else {
          yearDiff--;
          monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
      }
    
      return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D';
    }
    */
    
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