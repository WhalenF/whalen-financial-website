import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Skip auth check for the login page itself so unauthenticated users can reach it.
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // If no session, redirect to /admin/login with a callbackUrl so we return after sign-in.
  if (!req.auth) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
