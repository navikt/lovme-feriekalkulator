import { Button, Heading, Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction, useEffect } from "react";

export const DeleteModal = ({
  open,
  setOpen,
  deleteFunction,
  modalText,
  description,
  yesButton,
  noButton,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  deleteFunction: any;
  modalText?: string;
  description?: string;
  yesButton?: string;
  noButton?: string;
}) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <Modal
      className="vw-1/3 vh-1/3 flex px-10 py-10 gap-5 overflow-visible"
      open={open}
      aria-label="Slette"
      onClose={() => setOpen((x) => !x)}
      closeButton={false}
      aria-labelledby="modal-heading"
    >
      <div>
      <div className="flex flex-col items-start">
        <Heading level="1" size="medium">
          {modalText ?? "Er du sikker?"}
        </Heading>
      </div>
      <div className=" pb-4">
        {description?.length != 0 ? <p>{description}</p> : null}
      </div>
        <div className="flex flex-row items-start gap-5 place-content-center">
          <Button
            variant="danger"
            onClick={() => {
              deleteFunction();
              setOpen(false);
            }}
          >
            {yesButton ?? "Ja"}
          </Button>

          <Button variant="secondary-neutral" onClick={() => setOpen(false)}>
            {noButton ?? "Nei"}
          </Button>
        </div>
      </div>

    </Modal>
  );
};
