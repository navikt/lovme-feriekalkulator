import { InternalHeader } from "@navikt/ds-react";

const Navbar = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Feriekalkulator</InternalHeader.Title>
      <InternalHeader.User name="Ola Normann" className="ml-auto" />
    </InternalHeader>
  );
};

export default Navbar;
