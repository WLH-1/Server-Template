import { defaultLang } from "@/utils";
import _Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";

function Document({ lang }: DocumentProps & { lang: string }) {
  return (
    <Html lang={lang || defaultLang}>
      <Head />
      <body>
        <Script strategy="beforeInteractive">{`
          function resizeHandler() {
            window.scale = document.documentElement.clientWidth <= 750
                ? Math.min(1, document.documentElement.clientWidth / 750)
                : 1;
            document.documentElement.style.fontSize = 16 * scale + "px";
          }
          resizeHandler();
          addEventListener("resize", resizeHandler);
        `}</Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await _Document.getInitialProps(ctx);
  return { ...initialProps, lang: ctx.query.lang };
};

export default Document;
