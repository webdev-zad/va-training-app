import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users from login page to their dashboard
    if (pathname === "/auth/login" && token) {
      const redirectUrl = token.role === "admin" ? "/admin/dashboard" : "/va/simulator";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Protect admin routes
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Protect VA routes
    if (pathname.startsWith("/va") && token?.role !== "va") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login page and API routes
        if (pathname === "/auth/login" || pathname.startsWith("/api/")) {
          return true;
        }

        // Require authentication for protected routes
        if (pathname.startsWith("/admin") || pathname.startsWith("/va")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/va/:path*", "/auth/login"],
};
