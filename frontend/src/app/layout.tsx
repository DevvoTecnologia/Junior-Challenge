import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { geistMono, geistSans } from "@/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
