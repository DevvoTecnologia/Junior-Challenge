"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface iProps {
  children: React.ReactNode;
}

export default function AuthCtx({ children }: iProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("token", token);

    if (!token) {
      router.push("/auth");
    }
  }, []);

  return <div>{children}</div>;
}
