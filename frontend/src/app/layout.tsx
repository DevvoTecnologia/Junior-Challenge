import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { geistMono, geistSans } from "@/fonts";

export const metadata: Metadata = {
  title: {
    default: "Junior-Challenge - Gabriel Logan",
    template: "%s | Junior-Challenge - Gabriel Logan",
  },
  description: "Desafio Fullstack: Os Anéis de Poder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
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
