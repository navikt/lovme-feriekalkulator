import { MenuElipsisHorizontalCircleIcon, PencilFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import "@navikt/ds-tokens";
import "./RedigerSletteDropdown.css"

export const RedigerSlettDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle className="btn"><MenuElipsisHorizontalCircleIcon className="icon" fontSize="1.6rem" /></Dropdown.Toggle>
      {/* <Button as={Dropdown.Toggle} className="btn"><MenuElipsisHorizontalCircleIcon fontSize="1.5rem" /></Button> */}
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
            Rediger <PencilFillIcon></PencilFillIcon>
          </Dropdown.Menu.GroupedList.Item>
          <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
            Slett <TrashFillIcon></TrashFillIcon>
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
};
