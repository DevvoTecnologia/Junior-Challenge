"use server";

import { cookies } from "next/headers";

import { signIn, signOut } from "@/auth";

export async function handleLogoutServer() {
  await signOut({
    redirectTo: "/",
  });
}

export async function handleLoginOAuthServer() {
  const accessToken = cookies().get("accessToken")?.value;
  const username = cookies().get("username")?.value;
  const email = cookies().get("email")?.value;
  const userId = cookies().get("userId")?.value;
  const fromServer = cookies().get("fromServer")?.value;

  if (fromServer && JSON.parse(fromServer) === true) {
    await signIn("Github", {
      accessToken,
      username,
      email,
      userId: userId ? parseInt(userId, 10) : undefined,
      redirect: false,
    });
  }

  cookies().delete("accessToken");
  cookies().delete("username");
  cookies().delete("email");
  cookies().delete("userId");
  cookies().delete("fromServer");
}
