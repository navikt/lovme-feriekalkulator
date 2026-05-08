import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "@/components/Header";

export default function Document() {
  return (
    <Html lang="no">
      <Head />
      <Header />
      <body className="bg-ax-neutral-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
