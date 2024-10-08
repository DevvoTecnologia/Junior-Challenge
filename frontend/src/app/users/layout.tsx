import type { Metadata } from "next";

import Header from "@/components/users/Header";

export const metadata: Metadata = {
  title: {
    default: "Users",
    template: "Users - %s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
