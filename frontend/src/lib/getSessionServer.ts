import "server-only";

import { auth } from "@/auth";

export default async function getSessionServer() {
  const session = await auth();

  return {
    session,
    token: session?.user.accessToken,
    userId: session?.user.userId,
    username: session?.user.username,
  };
}
