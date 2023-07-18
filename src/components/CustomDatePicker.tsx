import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import {
  addYears,
  differenceInCalendarDays,
  endOfYear,
  formatDuration,
  startOfYear,
  subYears,
} from "date-fns";
import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Travel } from "../models/Travel";

interface CustomDatePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
}

export const CustomDatePicker = forwardRef(
  (
    { startDate, endDate, setStartDate, setEndDate }: CustomDatePickerProps,
    ref
  ) => {
    const [initialStartDate, setInitialStartDate] = useState(new Date());
    const [initialEndDate, setInitialEndDate] = useState(new Date());
    const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);

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

    const CalculateDisabledDays = () => {
      const svar = savedTravels.map((travel) => ({
        from: travel.startDate,
        to: travel.endDate,
      }))
      console.log(svar);
      return svar;
    }

    const { datepickerProps, toInputProps, fromInputProps, reset } =
      useRangeDatepicker({
        fromDate: initialStartDate,
        toDate: initialEndDate,
        disabled: CalculateDisabledDays(),
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
        console.log("CoustomDatePicker har kjørt reset()")
      },
    }));

    useEffect(() => {
      calculateInitialStartDate();
      calculateInitialEndDate();
      const dataString = sessionStorage.getItem("savedTravels");
      setSavedTravels(dataString ? JSON.parse(dataString) : []);
    }, []);

    return (
      <div>
        <DatePicker {...datepickerProps} dropdownCaption>
          <div className="datepicker">
            <DatePicker.Input id="startDate" {...fromInputProps} label="Fra" />
            <DatePicker.Input id="endDate" {...toInputProps} label="Til" />
          </div>
        </DatePicker>
        {startDate && endDate && (
          <div id="differenceInDays">
            Du har vært{" "}
            {formatDuration({
              days: differenceInCalendarDays(endDate, startDate),
            })}{" "}
            i utlandet
          </div>
        )}
      </div>
    );
  }
);
