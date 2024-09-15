import { ringFont } from "@/app/layout";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

export const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`${roboto.variable} ${roboto.variable} ${ringFont.variable} w-screen min-h-screen flex flex-col items-center justify-start`}
    >
      {children}
    </main>
  );
};
