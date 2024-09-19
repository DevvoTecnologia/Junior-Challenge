"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface iProps {
  children: React.ReactNode;
}

export default function AuthCtx({ children }: iProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("token", token);

    if (!token) {
      toast.error("Sessão expirada. Faça login novamente", {
        duration: 5000,
        closeButton: true,
      });
      router.push("/auth");
    }
  }, []);

  return <div>{children}</div>;
}
