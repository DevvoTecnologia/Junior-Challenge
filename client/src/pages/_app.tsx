import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={inter.className + " min-h-screen max-w-screen-sm mx-auto px-4"}
    >
      <Component {...pageProps} />
    </div>
  );
}
