import { Modal } from "@navikt/ds-react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { EditTravel } from "./EditTravel";
import { Travel } from "../../models/Travel";
import { DocPencilIcon} from "@navikt/aksel-icons";

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
      className="vw-1/3 vh-2/3 overflow-visible"
      open={open}
      aria-label="Rediger"
      onClose={() => setOpen((x) => !x)}
      closeButton={false}
      aria-labelledby="modal-heading"
    >
      <div id="icon-container" className="top-8 justify-center relative flex">
        <DocPencilIcon
          title="a11y-title"
          className="bg-orange-200 rounded-full w-16 h-16 p-1 top-0 "
        />
      </div>
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
