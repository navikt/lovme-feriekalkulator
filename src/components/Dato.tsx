import { DatePicker } from "@navikt/ds-react";

const Dato = () => {
  return (
    <DatePicker.Standalone
      onSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
    />
  );
};



export default Dato;