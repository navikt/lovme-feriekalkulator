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

    const { datepickerProps, toInputProps, fromInputProps, reset } =
      useRangeDatepicker({
        fromDate: initialStartDate,
        toDate: initialEndDate,
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
        getTravels();
      },
    }));

    const getTravels = () => {
      const dataString = sessionStorage.getItem("savedTravels");
      const savedTravels: Array<Travel> = dataString
        ? JSON.parse(dataString)
        : [];
      setSavedTravels(
        savedTravels.map((travel) => ({
          ...travel,
          endDate: new Date(travel.endDate),
          startDate: new Date(travel.startDate),
        }))
      );
    };

    useEffect(() => {
      calculateInitialStartDate();
      calculateInitialEndDate();
      getTravels();
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
