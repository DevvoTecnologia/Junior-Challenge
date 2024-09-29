"use client";

import { signOut } from "next-auth/react";

interface BtnLogoutProps {
  className?: string;
}

export default function BtnLogout({ className }: BtnLogoutProps) {
  return (
    <button
      className={className}
      onClick={() => {
        signOut({
          redirectTo: "/login",
        });
      }}
    >
      Logout
    </button>
  );
}
