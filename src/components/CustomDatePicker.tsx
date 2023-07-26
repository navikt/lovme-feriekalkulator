import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import { addYears, endOfYear, startOfYear, subYears } from "date-fns";
import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Travel } from "../models/Travel";

interface DateRange {
  from: Date;
  to: Date;
}

interface CustomDatePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  savedTravels: Array<Travel>;
  selectedDates: DateRange | undefined;
}

export const CustomDatePicker = forwardRef(function Test(
  {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    savedTravels,
    selectedDates,
  }: CustomDatePickerProps,
  ref
) {
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());

  const calculateInitialStartDate = () => {
    const todaysDate = new Date();
    const dateFiveYearsAgo = subYears(todaysDate, 5);
    const firstOfJanuarysDate = startOfYear(dateFiveYearsAgo);

    setInitialStartDate(firstOfJanuarysDate);
  };

  const calculateInitialEndDate = () => {
    const todaysDate = new Date();
    const twoYearsForwardDate = addYears(todaysDate, 2);
    const lastOfDecembersDate = endOfYear(twoYearsForwardDate);

    setInitialEndDate(lastOfDecembersDate);
  };

  const { datepickerProps, toInputProps, fromInputProps, reset } =
    useRangeDatepicker({
      fromDate: initialStartDate,
      toDate: initialEndDate,
      defaultSelected: selectedDates,
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

  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    },
  }));

  useEffect(() => {
    calculateInitialStartDate();
    calculateInitialEndDate();
  }, []);

  return (
    <div>
      <DatePicker {...datepickerProps} dropdownCaption>
        <div className="flex items-start gap-5 flex-col">
          <DatePicker.Input id="startDate" {...fromInputProps} label="Fra" />
          <DatePicker.Input id="endDate" {...toInputProps} label="Til" />
        </div>
      </DatePicker>
      {startDate && endDate && <div id="differenceInDays"></div>}
    </div>
  );
});
