import { Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { EditTravel } from "./EditTravel";
import { Travel } from "../../models/Travel";

export const EditModal = ({
  open,
  setOpen,
  savedTravels,
  travelToEdit,
  indexToPutTravel,
  editFunction,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  savedTravels: Array<Travel>;
  travelToEdit: Travel;
  indexToPutTravel: number;
  editFunction: Function;
}) => {
  
  useEffect(() => {
    Modal.setAppElement("#__next");
  },[])

  return (
    <Modal
      className="vw-1/3 vh-2/3 flex px-20 py-12 gap-5 overflow-visible"
      open={open}
      aria-label="Rediger"
      onClose={() => setOpen((x) => !x)}
      closeButton={false}
      aria-labelledby="modal-heading"
    >
      <EditTravel
        savedTravels={savedTravels}
        travelToEdit={travelToEdit}
        setOpen={setOpen}
        indexToPutTravel={indexToPutTravel}
        editFunction={editFunction}
      ></EditTravel>
    </Modal>
  );
};
