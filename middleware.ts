import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 1. Get the user's role from the token
    const role = req.nextauth.token?.role;

    // 2. If trying to access Admin area
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // If not an Admin, kick them out
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      // This ensures the middleware only runs if the user is logged in
      authorized: ({ token }) => !!token,
    },
  }
);

// 3. Define which paths to protect
export const config = {
  matcher: ["/admin/:path*"],
};
