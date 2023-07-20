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
  editFunction: any;
  savedTravels: Array<Travel>;
}) => {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
      />

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteFunction={() => deleteFunction(id)}
      />
    </div>
  );
};
