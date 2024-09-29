"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { tokenKey, userIdKey, usernameKey } from "@/global/storageKeys";

interface BtnLogoutProps {
  className?: string;
}

export default function BtnLogout({ className }: BtnLogoutProps) {
  const router = useRouter();

  function handleLogout() {
    deleteCookie(tokenKey);
    deleteCookie(userIdKey);
    deleteCookie(usernameKey);

    router.replace("/login");
  }

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}
