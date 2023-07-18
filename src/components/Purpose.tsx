import React from 'react'
import { Select } from "@navikt/ds-react";

export const Purpose = ({purpose, handlePurposeChange} : {purpose: string, handlePurposeChange: any})=> {
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

