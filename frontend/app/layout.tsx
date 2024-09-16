import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/contexts/ReactQueryCtx";
import { Toaster } from "@/components/ui/sonner";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = localFont({
  src: "./fonts/Poppins-Regular.woff",
  variable: "--font-poppins",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevvoRings",
  description: "Descrição foda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ReactQueryProvider>
        <body className={`${poppins.variable} antialiased `}>{children}</body>
        <Toaster richColors />
      </ReactQueryProvider>
    </html>
  );
}
