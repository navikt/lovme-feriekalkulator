import { UNSAFE_Combobox } from "@navikt/ds-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import AllCountries from "../resources/no/world.json";
import EEAcountries from "../resources/eøs.json";

export const ComboBox = ({
  chosenCountry,
  setCountry,
  setEEA,
}: {
  chosenCountry: string;
  setCountry: Dispatch<SetStateAction<string>>;
  setEEA: Dispatch<SetStateAction<boolean>>;
}) => {
  const countryOptions = useMemo(() => {
    return [
      "Innenfor EØS",
      "Utenfor EØS",
      ...AllCountries.map((land) => land.name),
    ];
  }, []);

  const [value, setValue] = useState("");

  const filteredOptions = useMemo(
    () =>
      countryOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      ),
    [countryOptions, value]
  );

  const handleToggleSelected = (option: string) => {
    setCountry(option);
    if (option === "Innenfor EØS") {
      setEEA(true);
    } else {
      setEEA(
        Object.keys(EEAcountries)
          .map((l) => l.toLowerCase())
          .includes(option.toLowerCase())
      );
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      <UNSAFE_Combobox
        label="Hvilket land har du oppholdt deg i?"
        filteredOptions={filteredOptions}
        onToggleSelected={(option) => {
          if (countryOptions.includes(option)) {
            handleToggleSelected(option);
          } else if (filteredOptions.length) {
            handleToggleSelected(filteredOptions[0]);
          }
        }}
        onChange={(event) => setValue(event.target.value)}
        options={countryOptions}
        selectedOptions={[chosenCountry]}
        onClear={() => setValue("")}
        value={value}
        shouldAutocomplete
      />
    </div>
  );
};
