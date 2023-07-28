import {
  MenuElipsisHorizontalCircleIcon,
  PencilFillIcon,
  TrashFillIcon,
} from "@navikt/aksel-icons";
import { Dropdown } from "@navikt/ds-react";
import "@navikt/ds-tokens";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";
import { Travel } from "@/models/Travel";
import { EditModal } from "./EditModal";

export const EditAndDelete = ({
  id,
  deleteFunction,
  editFunction,
  savedTravels,
}: {
  id: number;
  deleteFunction: any;
  editFunction: Function;
  savedTravels: Array<Travel>;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [travelToEdit, setTravelToEdit] = useState<Travel>({
    id: 0,
    country: "None",
    startDate: new Date(),
    endDate: new Date(),
    EEA: false,
    purpose: "Ferie",
    duration: 0,
  });
  const [index, setIndex] = useState<number>(-1);

  function findIndex(){
    var travel = savedTravels.find((travel) => travel.id === id);
    if(travel !== undefined){
    setIndex(savedTravels.indexOf(travel));
    }
    setIndex(-1);
  }

  function findAndRemoveTravel() {
    var travel = savedTravels.find((travel) => travel.id === id);

    if (travel !== undefined) {
      const index = savedTravels.indexOf(travel);
      savedTravels.splice(index, 1);
      setTravelToEdit(travel);
    } else {
      travel = {
        id: 0,
        country: "None",
        startDate: new Date(),
        endDate: new Date(),
        EEA: false,
        purpose: "Ferie",
        duration: 0,
      };

      setTravelToEdit(travel);
    }
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="btn">
          <MenuElipsisHorizontalCircleIcon fontSize="1.6rem" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item
              onClick={() => {
                findIndex();
                findAndRemoveTravel();
                setOpenEditModal(true);
              }}
            >
              Rediger <PencilFillIcon></PencilFillIcon>
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              Slett <TrashFillIcon></TrashFillIcon>
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>

      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        savedTravels={savedTravels}
        travelToEdit={travelToEdit}
        indexToPutTravel={index}
        editFunction={editFunction}
      />

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteFunction={() => deleteFunction(id)}
        modalText="Sikker på at du vil slette reisen?"
        yesButton="Slett"
        noButton="Avbryt"
      />
    </div>
  );
};
