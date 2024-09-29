import { cookies } from "next/headers";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { tokenKey, userIdKey, usernameKey } from "@/global/storageKeys";
import axiosInstance from "@/service/fetcher/axiosInstance";
import type { LoginSuccess } from "@/types/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await axiosInstance.post<LoginSuccess>(
            "/auth/login",
            credentials,
          );

          if (response.status !== 200) {
            return null;
          }

          if (
            !response.data.accessToken ||
            !response.data.userId ||
            !response.data.username
          ) {
            return null;
          }

          cookies().set(tokenKey, response.data.accessToken);
          cookies().set(userIdKey, response.data.userId.toString());
          cookies().set(usernameKey, response.data.username);

          return {
            id: response.data.userId.toString(),
            username: response.data.username,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
