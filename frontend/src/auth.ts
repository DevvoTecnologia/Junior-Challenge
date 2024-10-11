import "next-auth/jwt";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import axiosInstance from "./service/axiosInstance";
import type { LoginSuccess } from "./types/User";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      userId: number;
      username: string;
      email: string;
      isOAuth: boolean;
    };
  }

  interface User {
    accessToken: string;
    userId: number;
    username: string;
    email?: string | null;
    isOAuth: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId: number;
    username: string;
    email: string;
    isOAuth: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      id: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const response = await axiosInstance.post<LoginSuccess>(
          "/auth/login",
          credentials,
        );

        return {
          accessToken: response.data.accessToken,
          username: response.data.username,
          userId: response.data.userId,
          email: response.data.email,
          isOAuth: false,
        };
      },
    }),
    Credentials({
      id: "Github",
      authorize(credentials) {
        const { accessToken, username, userId, email } = credentials;

        return {
          accessToken: accessToken as string,
          username: username as string,
          userId: userId ? parseInt(userId as string, 10) : 0,
          email: email as string,
          isOAuth: true,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.userId = user.userId;
        token.email = user.email as string;
        token.isOAuth = user.isOAuth;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      session.user.userId = token.userId;
      session.user.email = token.email;
      session.user.isOAuth = token.isOAuth;

      return session;
    },

    redirect({ url }) {
      url = process.env.AUTH_TRUST_HOST || "http://localhost:3001"; // nosonar

      return Promise.resolve(url);
    },
  },
});
