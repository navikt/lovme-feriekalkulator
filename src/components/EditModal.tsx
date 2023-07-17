import { Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction } from "react";
import { EditTravel } from "./EditTravel";

export const EditModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      open={open}
      aria-label="Rediger"
      onClose={() => setOpen((x) => !x)}
      aria-labelledby="modal-heading"
    >
      <EditTravel></EditTravel>
    </Modal>
  );
};
