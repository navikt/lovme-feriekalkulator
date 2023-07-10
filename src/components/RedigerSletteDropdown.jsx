import { MenuElipsisHorizontalCircleIcon, PencilFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import "@navikt/ds-tokens";

export const RedigerSlettDropdown = () => {
  return (
    <Dropdown>
      <Button as={Dropdown.Toggle} fontSize="1.8rem" variant="tertiary" size="xsmall" ><MenuElipsisHorizontalCircleIcon fontSize="1.5rem" /></Button>
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
