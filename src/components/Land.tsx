import { Select } from "@navikt/ds-react";

const Land = () => {
  return (
    <Select className="dropdown" id="land" label="Hvilket land har du oppholdt deg i?">
      <option value="">Velg land</option>
      <option value="Norge">Norge</option>
      <option value="Sverige">Sverige</option>
      <option value="Danmark">Danmark</option>
    </Select>
  );
};

export default Land;