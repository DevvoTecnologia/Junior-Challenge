import { NextResponse } from "next/server";

import { auth } from "@/auth";

// Define the routes that require authentication
const protectedRoutes = [/^\/rings(\/.*)?$/, "/users/settings"];

// Define the routes that do not require authentication and are only accessible to unauthenticated users
const unauthenticatedRoutes = ["/login", "/register"];

export default auth((request) => {
  const session = request.auth;
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    typeof route === "string" ? route === path : route.test(path),
  );
  const isUnauthenticatedRoutes = unauthenticatedRoutes.includes(path);

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (session && isUnauthenticatedRoutes) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Continue to the next middleware
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
