import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "123";

export async function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;
 const authCookie = request.cookies.get("auth");

 if (pathname.startsWith("/admin/home")) {
  if (!authCookie) {
   console.log("Redirecting to login");
   return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
   const token = authCookie.value;
   const decoded = await jwtVerify(
    token,
    new TextEncoder().encode(secretKey)
   );
   console.log("Token verified:", decoded);
  } catch (error) {
   console.error("JWT verification error:", error);
   console.log("Invalid token. Redirecting to login");
   return NextResponse.redirect(new URL("/admin/login", request.url));
  }
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/admin/:path*"]
};
