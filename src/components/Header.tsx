import { InternalHeader, Spacer } from "@navikt/ds-react";

export const Header = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">TellMe</InternalHeader.Title>
      <Spacer />
      <InternalHeader.User name="Ola eller Kari Nordmann" />
    </InternalHeader>
  );
};
