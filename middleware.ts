import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;
 const authCookie = request.cookies.get("auth");

 const excludedPaths = ["/admin/login", "/admin/logout"];

 if (pathname.startsWith("/admin") && !excludedPaths.includes(pathname)) {
  if (!authCookie) {
   console.log("Redirecting to login");
   return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
   const token = authCookie.value;
   const decoded = await jwtVerify(token, new TextEncoder().encode(secretKey));
   console.log("Token verified:", decoded);
  } catch (error) {
   console.error("JWT verification error:", error);
   return NextResponse.redirect(new URL("/admin/login", request.url));
  }
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/admin/:path*"]
};
