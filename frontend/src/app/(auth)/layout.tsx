import type { Metadata } from "next";

import AuthProvider from "@/components/AuthContext";

export const metadata: Metadata = {
  title: "Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
