import { Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { Land } from "../models/Land";
import world from "../resources/no/world.json"

const LandVelger = ({
  valgtLand,
  setLand,
}: {
  valgtLand: string;
  setLand: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: any) => {
    event.preventDefault();
    setLand(event.target.value);
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
          {world.map((land: Land) => {
            return <option key={land.alpha3} value={land.name}>{land.name}</option>;
          })}
        </Select>
      </div>
    </div>
  );
};

export default LandVelger;
