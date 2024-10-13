"use server";

import { signIn, signOut } from "@/auth";
import { decrypt } from "@/lib/crypto";

export async function handleLogoutServer() {
  await signOut({
    redirectTo: "/",
  });
}

export async function handleLoginOAuthServer(payload: string) {
  try {
    const parsedPayload = JSON.parse(payload);

    const algorithm = process.env
      .QUERYPARAMS_OAUTH_ALGORITHM as Algorithm["name"];
    const secretKey = process.env.QUERYPARAMS_OAUTH_PRIVATE_KEY as string;

    // decript payload
    if (parsedPayload) {
      const decryptedPayload = decrypt(parsedPayload, algorithm, secretKey);

      const parsedDecryptedPayload = JSON.parse(decryptedPayload);

      const accessToken = parsedDecryptedPayload.accessToken;
      const username = parsedDecryptedPayload.username;
      const email = parsedDecryptedPayload.email;
      const userId = parsedDecryptedPayload.userId;
      const fromServer = parsedDecryptedPayload.fromServer;

      if (fromServer) {
        await signIn("Github", {
          accessToken,
          username,
          email,
          userId,
          redirect: false,
        });

        return true;
      }

      return false;
    }

    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to login", error);
    return false;
  }
}
