import { Search, Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { Land } from "../models/Land";

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

  const world = require("../resources/no/world.json");

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
            return <option value={land.name}>{land.name}</option>;
          })}
        </Select>
      </div>
    </div>
  );
};

export default LandVelger;
