import { Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { Land } from "../models/Land";
import world from "../resources/no/world.json";
import EØSLand from "../resources/eøs.json";

const LandVelger = ({
  valgtLand,
  setLand,
  setEØS,
}: {
  valgtLand: string;
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
        Object.keys(EØSLand)
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
          value={valgtLand}
          id="land"
          label="Hvilket land har du oppholdt deg i?"
        >
          <option value="">Velg land</option>
          <option value="Innenfor EØS">Innenfor EØS</option>
          <option value="Utenfor EØS">Utenfor EØS</option>
          {world.map((land: Land) => {
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

export default LandVelger;
