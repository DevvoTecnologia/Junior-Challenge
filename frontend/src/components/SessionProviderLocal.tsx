import { SessionProvider } from "next-auth/react";

export default function SessionProviderLocal({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
