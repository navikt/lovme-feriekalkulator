import React, { Dispatch, SetStateAction } from 'react'
import { Select } from "@navikt/ds-react";

export const Purpose = ({purpose, setPurpose} : {purpose: string, setPurpose: Dispatch<SetStateAction<string>>})=> {
  
  const handlePurposeChange = (event: any) => {
    setPurpose(event.target.value);
  };

  return (
    <Select
          className="dropdown"
          id="purpose"
          value={purpose}
          label="Formål med reisen?"
          onChange={handlePurposeChange}
        >
          <option value="Ferie">Ferie</option>
          <option value="Jobb">Jobb</option>
          <option value="Annet">Annet</option>
        </Select>
  )
}

