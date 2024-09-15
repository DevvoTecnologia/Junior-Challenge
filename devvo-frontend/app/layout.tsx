import Provider from "@/src/Providers";
import "../src/styles/globals.css";
import "../src/styles/button.css";
import "../src/styles/upload-file-component.css";
import { MainTemplate } from "@/src/template/main-template";
import { CookiesProvider } from "next-client-cookies/server";
import localFont from "next/font/local";
export const ringFont = localFont({
  src: "./fonts/ring.ttf",
  variable: "--font-ring",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased `}>
        <CookiesProvider>
          <MainTemplate>
            <Provider> {children}</Provider>
          </MainTemplate>
        </CookiesProvider>
      </body>
    </html>
  );
}
