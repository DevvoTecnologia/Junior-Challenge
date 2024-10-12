"use server";

import { cookies } from "next/headers";

import { signIn, signOut } from "@/auth";

export async function handleLogoutServer() {
  await signOut({
    redirectTo: "/",
  });
}

export async function handleLoginOAuthServer() {
  const serverResponseData = cookies().get("serverResponseData")?.value;

  if (serverResponseData) {
    const parsedData = JSON.parse(serverResponseData);
    const accessToken = parsedData.accessToken;
    const username = parsedData.username;
    const email = parsedData.email;
    const userId = parsedData.userId;
    const fromServer = parsedData.fromServer;

    if (fromServer) {
      await signIn("Github", {
        accessToken,
        username,
        email,
        userId: userId ? parseInt(userId, 10) : undefined,
        redirect: false,
      });
    }
  }

  cookies().delete("serverResponseData");
}
