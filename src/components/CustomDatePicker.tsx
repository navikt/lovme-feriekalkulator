import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import {
  addYears,
  differenceInCalendarDays,
  endOfYear,
  formatDuration,
  startOfYear,
  subYears,
} from "date-fns";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Travel } from "../models/Travel";

export const CustomDatePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);

  useEffect(() => {
    calculateInitialStartDate();
    calculateInitialEndDate();
    const dataString = sessionStorage.getItem("savedTravels");
    setSavedTravels(dataString ? JSON.parse(dataString) : []);
  }, []);

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
};
