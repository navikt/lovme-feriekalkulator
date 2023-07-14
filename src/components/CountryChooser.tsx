import { Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { Country } from "../models/Country";
import AllCountries from "../resources/no/world.json";
import EEAcountries from "../resources/eøs.json";

const CountryChooser = ({
  chosenCountry,
  setLand,
  setEØS,
}: {
  chosenCountry: string;
  setLand: Dispatch<SetStateAction<string>>;
  setEØS: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleChange = (event: any) => {
    event.preventDefault();
    const land = event.target.value;
    setLand(land);
    if (land === "Innenfor EØS") {
      setEØS(true);
    } else {
      setEØS(
        Object.keys(EEAcountries)
          .map((l) => l.toLowerCase())
          .includes(land.toLowerCase())
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
          id="land"
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
