import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const Decorator = await fetchDecoratorReact({
      env: "prod",
      params: {
        language: "nb",
        simple: true,
        chatbot: false,
      },
    });

    return { ...initialProps, Decorator };
  }

  render() {
    const { Decorator } = this.props as any;

    return (
      <Html lang="no">
        <Head>
          <Decorator.Styles />
        </Head>
        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
