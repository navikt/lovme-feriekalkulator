import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "@/components/Header";

export default function Document() {
  return (
    <Html lang="no">
      <Head />
      <Header />
      <body className="bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
