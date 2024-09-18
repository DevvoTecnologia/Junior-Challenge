import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="overflow-x-auto">
      <Head />

      <body className="antialiased overflow-x-hidden text-neutral-300 bg-neutral-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
