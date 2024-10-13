"use server";

import { signIn, signOut } from "@/auth";
import { decrypt } from "@/lib/cryptoServer";

export async function handleLogoutServer() {
  await signOut({
    redirectTo: "/",
  });
}

export async function handleLoginOAuthServer(payload: string) {
  try {
    const parsedPayload = JSON.parse(payload);

    const algorithm = "aes-256-ctr";
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
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("Failed to login", error.message);
    }
    // eslint-disable-next-line no-console
    console.error("Failed to login", error);
    return false;
  }
}
