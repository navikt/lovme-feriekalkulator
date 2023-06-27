import { DatePicker, useRangeDatepicker,  } from "@navikt/ds-react";

const Dato = () => {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: new Date("Jan 1 2018"),
      toDate: new Date("Jan 1 2025"), 
      onRangeChange: console.log,
    });

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
        </div>
      )}
    </div>
  );
};



export default Dato;