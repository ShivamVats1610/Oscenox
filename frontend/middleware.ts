import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token → redirect to home
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decoded: any = jwtDecode(token);

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (decoded?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
