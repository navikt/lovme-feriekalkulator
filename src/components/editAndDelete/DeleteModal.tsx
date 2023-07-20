import { Button, Heading, Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction } from "react";

export const DeleteModal = ({
  open,
  setOpen,
  deleteFunction,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  deleteFunction: any;
}) => {
  return (
    <Modal
      className="vw-1/3 vh-1/3 flex px-10 py-10 gap-5 overflow-visible"
      open={open}
      aria-label="Slette"
      onClose={() => setOpen((x) => !x)}
      closeButton={false}
      aria-labelledby="modal-heading"
    >
      <div className="flex flex-col items-start gap-5">
        <Heading level="1" size="medium">
          Sikker på at du vill slette reisen?
        </Heading>

        <div className="flex flex-row items-start gap-5">
          <Button 
            variant="danger"
            onClick={() => {
              deleteFunction();
              setOpen(false);
            }}
          >
            Slett
          </Button>

          <Button variant="tertiary" onClick={() => setOpen(false)}>Avbryt</Button>
        </div>
      </div>
    </Modal>
  );
};
