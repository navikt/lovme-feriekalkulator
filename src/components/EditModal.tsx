import { Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction } from "react";
import { EditTravel } from "./EditTravel";
import { Travel } from "../models/Travel";

export const EditModal = ({
  open,
  setOpen,
  savedTravels,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  savedTravels: Array<Travel>;
}) => {
  return (
    <Modal
      open={open}
      aria-label="Rediger"
      onClose={() => setOpen((x) => !x)}
      aria-labelledby="modal-heading"
    >
      <EditTravel savedTravels={savedTravels}></EditTravel>
    </Modal>
  );
};
