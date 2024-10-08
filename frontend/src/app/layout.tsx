import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { geistMono, geistSans } from "@/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_TRUST_HOST ?? "https://gl-junior-challenge.vercel.app",
  ),

  title: {
    default: "Junior-Challenge - Gabriel Logan",
    template: "%s | Junior-Challenge - Gabriel Logan",
  },

  description: "Desafio Fullstack: Os Anéis de Poder",

  authors: { name: "Gabriel Logan", url: "https://github.com/gabriel-logan" },

  classification: "social",
  publisher: "Gabriel Logan",
  creator: "Gabriel Logan",
  generator: "Next.js",

  openGraph: {
    title: "Junior-Challenge - Gabriel Logan - Fullstack Developer Challenge",
    description:
      "Desafio Fullstack: Os Anéis de Poder. Este desafio é uma oportunidade para demonstrar habilidades em desenvolvimento fullstack, utilizando tecnologias modernas como Next.js e TypeScript, com foco em criar uma aplicação web robusta e escalável.",
    url:
      process.env.AUTH_TRUST_HOST ?? "https://gl-junior-challenge.vercel.app",
    siteName: "Junior-Challenge - Gabriel Logan",
    type: "website",
  },

  keywords: [
    "games",
    "entertainment",
    "adventure",
    "social",
    "fullstack",
    "nextjs",
    "typescript",
    "lord of the rings",
  ],

  appleWebApp: {
    title: "Junior-Challenge",
    statusBarStyle: "black-translucent",
  },

  manifest: "/manifest.webmanifest",

  category: "social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <meta name="mobile-web-app-capable" content="yes" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryClientProviderWrapper>
            <ToastContainer autoClose={1500} />
            {children}
          </QueryClientProviderWrapper>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
