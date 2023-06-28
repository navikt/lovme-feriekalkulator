import { Select } from "@navikt/ds-react";

const Land = () => {
  return (
    <Select label="Hvilket land har du oppholdt deg i?">
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  );
};

export default Land;