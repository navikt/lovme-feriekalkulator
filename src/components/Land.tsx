import { Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";
import { landliste } from "../resources/utenfor";

const Land = ({
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
    <Select
      onChange={handleChange}
      className="dropdown"
      value={valgtLand}
      id="land"
      label="Hvilket land har du oppholdt deg i?"
    >
      <option value="">Velg land</option>
      {landliste.map((land) => {
        return <option value={land.name}>{land.name}</option>;
      })}
    </Select>
  );
};

export default Land;
