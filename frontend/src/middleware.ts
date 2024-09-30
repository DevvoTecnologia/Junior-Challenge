import { NextResponse } from "next/server";

import { auth } from "@/auth";

const protectedRoutes = [/^\/rings(\/.*)?$/, "/users/settings"];
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

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
