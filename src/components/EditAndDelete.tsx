import {
  MenuElipsisHorizontalCircleIcon,
  PencilFillIcon,
  TrashFillIcon,
} from "@navikt/aksel-icons";
import { Dropdown } from "@navikt/ds-react";
import "@navikt/ds-tokens";
import "./EditAndDelete.css";

export const EditAndDelete = ({
  id,
  deleteFunction,
  editFunction,
}: {
  id: number;
  deleteFunction: any;
  editFunction: any;
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className="btn">
        <MenuElipsisHorizontalCircleIcon fontSize="1.6rem" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => {
              editFunction();
            }}
          >
            Rediger <PencilFillIcon></PencilFillIcon>
          </Dropdown.Menu.GroupedList.Item>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => {
              if (window.confirm("Sikker på at du vil slette")) {
                deleteFunction(id);
              } else {
                alert("Ikke slett");
              }
            }}
          >
            Slett <TrashFillIcon></TrashFillIcon>
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
};
