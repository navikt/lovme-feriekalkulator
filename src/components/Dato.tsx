import React, { ReactElement } from "react";
import { DatePicker } from "@navikt/ds-react";

const Dato = (): ReactElement => {

  return (
    <DatePicker.Standalone
      onSelect={console.log}
      dropdownCaption
      fromDate={new Date("Jan 1 2018")}
      toDate={new Date("Jan 1 2025")}
    />
  );
};



export default Dato;