type SetErrorState = React.Dispatch<React.SetStateAction<boolean>>;

export const errorHandler = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  country: string,
  setStartDateError: SetErrorState,
  setEndDateError: SetErrorState,
  setCountryError: SetErrorState
): boolean => {
  const checkAndSetError = (
    condition: Date | undefined | string,
    setErrorState: SetErrorState
  ) => {
    const hasError = !Boolean(condition);
    setErrorState(hasError);
    return hasError;
  };

  let hasStartDateError = checkAndSetError(startDate, setStartDateError);
  let hasEndDateError = checkAndSetError(endDate, setEndDateError);
  let hasCountryError = checkAndSetError(country, setCountryError);

  return hasStartDateError || hasCountryError || hasEndDateError;
};
