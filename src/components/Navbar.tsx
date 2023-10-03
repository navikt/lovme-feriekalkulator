import { InternalHeader } from "@navikt/ds-react";

const Navbar = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">TellMe</InternalHeader.Title>
      <InternalHeader.User name="Kari eller Ola Nordmann" className="ml-auto" />
    </InternalHeader>
  );
};

export default Navbar;
