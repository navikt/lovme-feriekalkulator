import { Dropdown, Select } from "@navikt/ds-react";
import { Dispatch, SetStateAction } from "react";

const Land = ({
  land,
  setLand,
}: {
  land: string;
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
      value={land}
      id="land"
      label="Hvilket land har du oppholdt deg i?"
    >
      <option value="">Velg land</option>
      <option value="Norge">Norge</option>
      <option value="Sverige">Sverige</option>
      <option value="Danmark">Danmark</option>
    </Select>
  );
};

export default Land;
