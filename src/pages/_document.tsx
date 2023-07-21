import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { Html, Head, Main, NextScript } from "next/document";

setDefaultOptions({ locale: nb });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 ml-5">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
