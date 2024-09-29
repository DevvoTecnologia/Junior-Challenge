"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface BtnLogoutProps {
  className?: string;
}

export default function BtnLogout({ className }: BtnLogoutProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();

    router.replace("/login");
  }

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}
