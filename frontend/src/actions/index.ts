"use server";

import { signOut } from "@/auth";

export async function handleLogoutServer() {
  await signOut({
    redirectTo: "/",
  });
}
