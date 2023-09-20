import React from "react";

type SetErrorState = React.Dispatch<React.SetStateAction<boolean>>;

export const errorHandler = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  setStartDateError: SetErrorState,
  setEndDateError: SetErrorState
): boolean => {
  const checkAndSetError = (
    condition: Date | undefined,
    setErrorState: SetErrorState
  ) => {
    const hasError = !Boolean(condition);
    setErrorState(hasError);
    return hasError;
  };

  let hasStartDateError = checkAndSetError(startDate, setStartDateError);
  let hasEndDateError = checkAndSetError(endDate, setEndDateError);

  return hasStartDateError || hasEndDateError;
};
