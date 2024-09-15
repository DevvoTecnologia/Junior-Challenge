"use client";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { Navbar } from "../components/navbar";
const Provider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const cookiesHook = useCookies();
  const token = cookiesHook.get("token");
  const { push } = useRouter();

  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, [token]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      {pathname !== "/" && <Navbar />}
      {children}
    </>
  );
};

export default Provider;
