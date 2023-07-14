import { Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { Country } from "../models/Country";
import AllCountries from "../resources/no/world.json";
import EEAcountries from "../resources/eøs.json";

const CountryChooser = ({
  chosenCountry,
  setCountry,
  setEEA,
}: {
  chosenCountry: string;
  setCountry: Dispatch<SetStateAction<string>>;
  setEEA: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleChange = (event: any) => {
    event.preventDefault();
    const country = event.target.value;
    setCountry(country);
    if (country === "Innenfor EØS") {
      setEEA(true);
    } else {
      setEEA(
        Object.keys(EEAcountries)
          .map((l) => l.toLowerCase())
          .includes(country.toLowerCase())
      );
    }
  };

  return (
    <div>
      <div>
        <Select
          onChange={handleChange}
          className="dropdown"
          value={chosenCountry}
          id="country"
          label="Hvilket land har du oppholdt deg i?"
        >
          <option value="">Velg land</option>
          <option value="Innenfor EØS">Innenfor EØS</option>
          <option value="Utenfor EØS">Utenfor EØS</option>
          {AllCountries.map((land: Country) => {
            return (
              <option key={land.alpha3} value={land.name}>
                {land.name}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default CountryChooser;
